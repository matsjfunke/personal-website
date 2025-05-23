"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
          fixed text-2xl tall:text-xl font-bold top-5 left-1/2 z-[9999] transform -translate-x-1/2
          rounded-lg border-2 border-white flex justify-between items-center px-4 py-2
          transition-all duration-200 w-auto max-w-screen
          ${
            isScrolled
              ? "bg-black bg-opacity-60 backdrop-blur-md"
              : "bg-black shadow-lg shadow-black"
          }
        `}
    >
      <div className="flex space-x-6">
        <Link
          href="/compendiums"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Compendiums
        </Link>
        <Link
          href="/projects"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Projects
        </Link>
        <Link
          href="/books"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Books
        </Link>
        <Link
          href="/thoughts"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Thoughts
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
