"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FiUser,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import tapan from "../../../public/images/tapan.jpg";
import biswa from "../../../public/images/biswa.jpg";
import khirod from "../../../public/images/khirod.jpg";
import chandan from "../../../public/images/chandan.jpg";

const TeamSection = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const touchStartX = useRef(0);

  const teamData = [
    {
      name: "Chandan Samantaray",
      role: "Founder & CEO",
      expertise: "Product Strategy & Leadership",
      icon: chandan,
    },
    {
      name: "Rohit Singh",
      role: "CTO",
      expertise: "Technical Architecture",
      icon: "",
    },
    {
      name: "Biswa Sahoo",
      role: "Project Manager",
      expertise: "Delivery Excellence",
      icon: biswa,
    },
    {
      name: "Tapan Biswal",
      role: "Team Lead",
      expertise: "Manage Fullstack Team",
      icon: tapan,
    },
    {
      name: "Khirod Bhanja",
      role: "Digital Marketing Head",
      expertise: "Digital Content Expert",
      icon: khirod,
    },
  ];

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Mobile navigation
  const goToSlide = useCallback(
    (index) => {
      const newIndex = (index + teamData.length) % teamData.length;
      setCurrentIndex(newIndex);
    },
    [teamData.length]
  );

  // Desktop scroll handlers
  const scrollToItem = useCallback((direction) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const itemWidth = 300 + 16; // width + margin
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Desktop drag handlers
  const handleMouseDown = useCallback((e) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    document.body.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      containerRef.current.scrollLeft = scrollLeft.current - walk;
    },
    [isDragging]
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (diff > 50) {
        goToSlide(currentIndex + 1); // Swipe left
      } else if (diff < -50) {
        goToSlide(currentIndex - 1); // Swipe right
      }
    },
    [currentIndex, goToSlide]
  );

  const MemberCard = ({ member, isMobileView = false }) => (
    <div
      className={`h-full bg-gray-800 rounded-xl ${
        isMobileView ? "p-8" : "p-6"
      } flex flex-col items-center text-center border border-gray-700 ${
        !isMobileView && "hover:border-blue-500 transition-all duration-300"
      }`}
    >
      {/* Image Container */}
      <div
        className={`
        ${isMobileView ? "w-40 h-40" : "w-40 h-40"} 
        rounded-full overflow-hidden
        bg-blue-500/10 flex items-center justify-center
        mb-${isMobileView ? "6" : "4"}
      `}
      >
        <div className="relative w-full h-full">
          <Image
            src={member.icon}
            alt={member.name}
            fill // This makes the image fill the container
            className="object-cover" // This ensures proper cropping
            style={{ objectPosition: "top center" }} // Adjust this to focus on faces
          />
        </div>
      </div>
      <h3
        className={`font-semibold text-white ${
          isMobileView ? "text-2xl" : "text-xl"
        }`}
      >
        {member.name}
      </h3>
      <p
        className={`text-blue-400 ${
          isMobileView ? "text-lg mt-2" : "text-sm mt-1"
        }`}
      >
        {member.role}
      </p>
      <p
        className={`text-gray-300 ${
          isMobileView ? "text-base mt-4" : "text-sm mt-3"
        }`}
      >
        {member.expertise}
      </p>
      <div
        className={`mt-${isMobileView ? "6" : "4"} pt-${
          isMobileView ? "6" : "4"
        } border-t border-gray-700 w-full`}
      >
        <div className="flex justify-center space-x-4">
          <button
            className="text-blue-400 hover:text-blue-300"
            aria-label="Schedule"
          >
            <FiCalendar size={isMobileView ? 20 : 16} />
          </button>
          <button
            className="text-blue-400 hover:text-blue-300"
            aria-label="Profile"
          >
            <FiUser size={isMobileView ? 20 : 16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="team"
      className="py-16 bg-gray-900 w-full overflow-hidden relative"
    >
      <div className="container mx-auto px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-white">
          Our Expert Team
        </h2>

        {/* Mobile View (Full-width cards) */}
        {isMobile && (
          <div className="w-full relative h-[500px]">
            <button
              onClick={() => goToSlide(currentIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-2 text-white"
              aria-label="Previous team member"
            >
              <FiChevronLeft size={20} />
            </button>

            <div
              className="w-full h-full overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {teamData.map((member, index) => (
                  <div key={index} className="flex-shrink-0 w-full h-full px-4">
                    <MemberCard member={member} isMobileView />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => goToSlide(currentIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-2 text-white"
              aria-label="Next team member"
            >
              <FiChevronRight size={20} />
            </button>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {teamData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentIndex === index ? "bg-blue-500" : "bg-gray-600"
                  }`}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Desktop View (Original multi-card layout) */}
        {!isMobile && (
          <div className="w-full relative">
            <button
              onClick={() => scrollToItem("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-3 text-white transition-all shadow-lg"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={24} />
            </button>

            <div
              ref={containerRef}
              className="w-full overflow-x-auto py-4 scrollbar-hide touch-auto"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
            >
              <div className="flex w-max">
                {teamData.map((member, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[280px] mx-2 sm:w-[300px]"
                  >
                    <MemberCard member={member} />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToItem("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-3 text-white transition-all shadow-lg"
              aria-label="Scroll right"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
