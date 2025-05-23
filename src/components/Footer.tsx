import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-8 px-4 border-t-3 border-gray-400">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex justify-center space-x-8 mb-4">
          <Link
            href="https://github.com/matsjfunke"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-xl"
          >
            <Image
              src="/github.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="filter invert"
            />
            Github
          </Link>
          <Link
            href="https://linkedin.com/in/matsjfunke"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-xl"
          >
            <Image
              src="/linkedin.svg"
              alt="LinkedIn"
              width={20}
              height={20}
              className="filter invert"
            />
            LinkedIn
          </Link>
          <Link
            href="mailto:mats.funke@gmail.com"
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors text-xl"
          >
            <Mail size={20} />
            Email
          </Link>
        </div>

        <p className="text-md text-center mb-2 mt-4 text-gray-400">
          © matsjfunke {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
