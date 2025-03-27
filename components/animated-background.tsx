"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function AnimatedBackground() {
  const [blobs, setBlobs] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const blobCount = Math.floor(Math.random() * 5) + 8; // 8-12 blobs
    const newBlobs = [];

    const colors = [
      "from-purple-500 to-purple-300",
      "from-blue-500 to-cyan-300",
      "from-pink-500 to-pink-300",
      "from-green-500 to-green-300",
      "from-yellow-500 to-yellow-300",
      "from-red-500 to-orange-300",
    ];

    const sizes = ["w-[300px] h-[300px]", "w-[400px] h-[400px]", "w-[500px] h-[500px]", "w-[600px] h-[600px]"];
    const animations = ["animate-blob-slow", "animate-blob-medium", "animate-blob-fast"];

    for (let i = 0; i < blobCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const animation = animations[Math.floor(Math.random() * animations.length)];

      // Random initial position
      const left = `${Math.random() * 100}vw`;
      const top = `${Math.random() * 100}vh`;

      newBlobs.push(
        <div
          key={i}
          className={cn("absolute rounded-full bg-gradient-to-br opacity-70", size, color, animation)}
          style={{
            left,
            top,
            transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
          }}
        />,
      );
    }

    setBlobs(newBlobs);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 bg-slate-950">
      {blobs}
      <div className="fixed inset-0 backdrop-blur-[100px]" />
    </div>
  );
}
