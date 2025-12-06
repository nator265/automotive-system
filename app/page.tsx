import React from "react";
import HeroSection from "./components/HeroSection";
import CarCategories from "./components/CarCategories";
import ReviewsAndStats from "./components/ReviewsAndStats";
import Contact from "./components/Contact";
import Nav from "./components/Nav"

const Homepage = () => {
  return (
    <div className="overflow-x-hidden w-[screen] md:w-full">
      <Nav />
      <HeroSection />
      <CarCategories />
      <div className="z-4 relative">
        <ReviewsAndStats />
        <Contact />
      </div>
    </div>
  );
};

export default Homepage;