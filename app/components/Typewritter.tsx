"use client";
import React from "react";
import TypewriterEffect from "typewriter-effect";

interface TypewriterProps {
  strings?: string[];
  typingDelay?: number;
  deletingSpeed?: number;
  pause?: number;
  cursor?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  strings = [
    "Affordable Car Hire",
    "Quality Cars for Sale",
    "Reliable Services",
  ],
  typingDelay = 75,
  deletingSpeed = 50,
  pause = 1500,
  cursor = "|",
}) => {
  return (
    <TypewriterEffect
      options={
        {
          strings,
          autoStart: true,
          loop: true,
          delay: typingDelay,
          deleteSpeed: deletingSpeed,
          pauseFor: pause,
          cursor,
        } as any
      } // <-- tell TS to ignore type check
    />
  );
};

export default Typewriter;
