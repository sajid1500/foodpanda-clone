"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const shimmer: Variants = {
  initial: { backgroundPosition: "-100% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const shimmerStyle = {
  backgroundImage:
    "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
  backgroundSize: "200% 100%",
};

export default function RestaurantListSkeleton() {
  return (
    <div>
      <motion.div
        className="my-2 h-8 w-64 rounded-lg"
        style={shimmerStyle}
        variants={shimmer}
        initial="initial"
        animate="animate"
      />
      <ul className="flex flex-col gap-4">
        {[...Array(6)].map((_, index) => (
          <li
            key={index}
            className="border-neutral-border overflow-clip rounded-2xl border"
          >
            {/* Image skeleton */}
            <motion.div
              className="h-[300px] w-full"
              style={shimmerStyle}
              variants={shimmer}
              initial="initial"
              animate="animate"
            />

            <div className="mb-2 px-2">
              <div className="mt-2 flex justify-between">
                {/* Restaurant name skeleton */}
                <motion.div
                  className="h-6 w-32 rounded"
                  style={shimmerStyle}
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                />
                {/* Rating skeleton */}
                <div className="flex items-center gap-1">
                  <motion.div
                    className="h-5 w-8 rounded"
                    style={shimmerStyle}
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.div
                    className="h-5 w-5 rounded"
                    style={shimmerStyle}
                    variants={shimmer}
                    initial="initial"
                    animate="animate"
                  />
                </div>
              </div>

              {/* Delivery info skeleton */}
              <div className="mt-2 flex justify-between">
                <motion.div
                  className="h-4 w-16 rounded"
                  style={shimmerStyle}
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                />
                <motion.div
                  className="h-4 w-20 rounded"
                  style={shimmerStyle}
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
