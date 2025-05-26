"use client";

import Link from "next/link";

import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mt-10 mb-4">
            Some of my dearest reads
          </h1>
          <p className="text-white/80 text-lg max-w-2xl">
            These are some of the books which have shaped my thinking and what
            they taught me. I&apos;m always happy to recommend great reads or
            receive recommendations— feel free to reach out 🤓
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <BookCard key={book.title} book={book} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-white/70 text-sm">
            this page was inspired by the{" "}
            <Link
              href="https://www.tsolov.zip/about-me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors underline"
            >
              creative visionary
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
