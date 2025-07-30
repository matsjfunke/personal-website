import React from "react";

import Link from "next/link";

import { Mail } from "lucide-react";

import GithubIcon from "./icons/GithubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import XIcon from "./icons/XIcon";

export default function Footer() {
  return (
    <footer className="bg-black py-8 px-4 border-t-3 border-gray-400">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex justify-center space-x-8 mb-4">
          <Link
            href="https://github.com/matsjfunke"
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-xl"
            target="_blank"
          >
            <GithubIcon />
            <span className="hidden sm:inline">Github</span>
          </Link>
          <Link
            href="https://linkedin.com/in/matsjfunke"
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-xl"
            target="_blank"
          >
            <LinkedInIcon />
            <span className="hidden sm:inline">LinkedIn</span>
          </Link>
          <Link
            href="https://x.com/matsjfunke13"
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-xl"
            target="_blank"
          >
            <XIcon />
            <span className="hidden sm:inline">Twitter</span>
          </Link>
          <Link
            href="mailto:mats.funke@gmail.com"
            className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors text-xl"
            target="_blank"
          >
            <Mail size={20} />
            <span className="hidden sm:inline">Email</span>
          </Link>
        </div>

        <p className="text-md text-center mb-2 mt-4 text-gray-400">
          © matsjfunke {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
