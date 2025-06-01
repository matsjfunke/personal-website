"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import { motion, useScroll, useTransform } from "motion/react";

interface TimelineEntry {
  date: string;
  title: string;
  abstract: React.ReactNode;
  slug: string;
}

export const ThoughtsTimeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 28%", "end 71%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans" ref={containerRef}>
      {/* Timeline Content */}
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const date = new Date(item.date);
          const year = date.getFullYear();
          const monthDay = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          });

          return (
            <Link
              href={`/thoughts/${item.slug}`}
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10 group cursor-pointer"
            >
              {/* Date Column */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                {/* Timeline Dot */}
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black border border-gray-800 flex items-center justify-center group-hover:border-blue-600 transition-colors duration-200">
                  <div className="h-4 w-4 rounded-full bg-blue-600 group-hover:bg-blue-400 transition-colors duration-200" />
                </div>

                {/* Date Display - Desktop */}
                <div className="hidden md:block md:pl-20">
                  <div className="text-2xl md:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                    {year}
                  </div>
                  <div className="text-lg md:text-2xl font-semibold text-gray-400 group-hover:text-blue-300 transition-colors duration-200">
                    {monthDay}
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                {/* Date Display - Mobile */}
                <div className="md:hidden block mb-6">
                  <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-200">
                    {year}
                  </div>
                  <div className="text-sm font-semibold text-gray-400 mb-3 group-hover:text-blue-300 transition-colors duration-200">
                    {monthDay}
                  </div>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-5 group-hover:text-blue-400 transition-colors duration-200">
                    {item.title}
                  </h3>
                </div>

                {/* Abstract */}
                <div className="text-lg md:text-xl text-gray-300 group-hover:text-blue-300 transition-colors duration-200">
                  {item.abstract}
                </div>
              </div>
            </Link>
          );
        })}

        {/* Animated Timeline Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-gray-700 to-transparent"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-600 via-blue-400 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
