import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  loading: false,
  error: null,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //logged in
        setUser(user);
        setLoading(false);
      } else {
        //not logged in
        setUser(null);
        setLoading(true);
        router.push("/login");
      }

      setInitialLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(`Error: ${error.message}`))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(`Error: ${error.message}`))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};