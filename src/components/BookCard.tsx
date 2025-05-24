import { useState } from "react";

import Image from "next/image";

import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  index: number;
}

export function BookCard({ book, index }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const rotateDirection =
    index % 2 === 0
      ? "group-hover:rotate-[5deg]"
      : "group-hover:rotate-[-5deg]";

  return (
    <div className="group cursor-pointer">
      <div
        className={`relative w-1/2 mx-auto aspect-[3/4] mb-4 rounded-lg transition-transform duration-300 ${rotateDirection} overflow-hidden group-hover:overflow-visible`}
      >
        {!imageError ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <Image
            src="/404/not-found.jpg"
            alt="Book cover not found"
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          />
        )}
      </div>

      <div className="flex-1 flex flex-col text-center">
        <p className="text-white/80 text-md leading-relaxed px-4 text-justify">
          {book.thoughts}
        </p>
      </div>
    </div>
  );
}
