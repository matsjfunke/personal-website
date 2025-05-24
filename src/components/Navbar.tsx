"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { BookOpenText, Brain, House, StickyNote } from "lucide-react";

import { SearchBar } from "@/components/SearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Set initial states
    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`
          fixed top-0 left-0 right-0 z-[9999] 
          transition-all duration-200 border-b border-neutral-800
          ${
            isMounted && isScrolled
              ? "bg-black/80 backdrop-blur-md"
              : "bg-black/50"
          }
        `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center sm:space-x-2"
            >
              <House className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              href="/compendiums"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center sm:space-x-2"
            >
              <StickyNote className="w-4 h-4" />
              <span className="hidden sm:inline">Compendiums</span>
            </Link>
            {/* <Link
              href="/projects"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center sm:space-x-2"
            >
              <Wrench className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </Link> */}
            <Link
              href="/books"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center sm:space-x-2"
            >
              <BookOpenText className="w-4 h-4" />
              <span className="hidden sm:inline">Books</span>
            </Link>
            <Link
              href="/thoughts"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center sm:space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">Thoughts</span>
            </Link>
          </div>

          <div className="flex items-center">
            <SearchBar
              placeholder={isSmallScreen ? "..." : "Search..."}
              value={searchValue}
              onChange={setSearchValue}
              className="w-32 sm:w-64"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
