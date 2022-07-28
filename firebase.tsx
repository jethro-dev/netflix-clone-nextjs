// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM-5pKknVjJGioEgMESI7E4f3pp5PrMhQ",
  authDomain: "jnetflix-app.firebaseapp.com",
  projectId: "jnetflix-app",
  storageBucket: "jnetflix-app.appspot.com",
  messagingSenderId: "31810894617",
  appId: "1:31810894617:web:b59cb42953c435cbc16388",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
