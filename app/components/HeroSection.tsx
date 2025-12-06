import React from "react";
import Typewritter from "./Typewritter"; // your Typewriter component
import { Button } from "@mui/material";

const HeroSection = () => {
  return (
    <div className="relative z-2 overflow-hidden">
      <div className=" z-1 h-[850px] w-screen bg-[url('/homescreen/heroSection.jpg')] bg-fixed bg-cover bg-bottom bg-no-repeat flex items-center">
        {/* Black overlay fading to right */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>
        {/* Content */}
        <div className="fixed z-1 items-center pl-10 md:p-20 text-white">
          <div className="h-auto mb-5">
            <span className="text-3xl md:text-6xl font-semibold font-mono">
              <Typewritter />
            </span>
          </div>
          <div className="">
            Looking for a car to Buy or Hire in Malawi?
            <br />
            We have a wide range of vehicles that favor your needs.
          </div>
          <div className="flex gap-4 ">
            <Button
              variant="contained"
              color="primary"
              href="/buy"
              style={{ marginTop: "20px" }}
            >
              Buy a Car
            </Button>
            <Button
              variant="contained"
              color="primary"
              href="/buy"
              style={{ marginTop: "20px" }}
            >
              Hire a Car
            </Button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HeroSection;
