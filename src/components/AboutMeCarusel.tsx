"use client";

import React from "react";

import Image from "next/image";

import { aboutMeItems } from "@/data/about-me";

export default function AboutMeCarusel() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Horizontal scrollable row */}
      <div
        className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitScrollbar: { display: "none" },
        }}
      >
        {aboutMeItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-black rounded-lg overflow-hidden aspect-square min-w-[400px] w-[400px] group flex-shrink-0"
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.text}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30" />

              {/* Text overlay in top left */}
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
                  {item.text}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
