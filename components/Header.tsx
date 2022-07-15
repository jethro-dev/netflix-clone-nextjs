import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SearchIcon, BellIcon } from "@heroicons/react/solid";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-primary"} `}>
      <div className="flex items-center gap-2 md:gap-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="Netflix logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <ul className="hidden gap-4 md:flex">
          <li className="header-link">Home</li>
          <li className="header-link">TV Shows</li>
          <li className="header-link">Movies</li>
          <li className="header-link">New & Popular</li>
          <li className="header-link">My List</li>
        </ul>
      </div>

      <div className="flex items-center gap-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="hidden h-6 w-6 sm:inline cursor-pointer" />
        <Link href={"/account"}>
          <img
            src="https://rb.gy/g1pwyx"
            alt="account"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
