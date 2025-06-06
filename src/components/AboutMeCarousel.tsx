"use client";

import React from "react";

import Image from "next/image";

import { aboutMeItems } from "@/data/about-me";

export default function AboutMeCarousel() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* Horizontal scrollable row */}
      <div
        className="flex gap-6 overflow-x-auto overflow-y-hidden px-4"
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
          } as React.CSSProperties
        }
      >
        {aboutMeItems.map((item, index) => (
          <div
            key={index}
            className="relative bg-black rounded-lg overflow-hidden aspect-square min-w-[350px] w-[350px] group flex-shrink-0"
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
              <div className="absolute top-3 left-3 z-10">
                <h3 className="text-white text-2xl font-bold italic">
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
