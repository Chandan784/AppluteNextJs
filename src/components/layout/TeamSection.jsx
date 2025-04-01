"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  FiUser,
  FiCode,
  FiAward,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const TeamSection = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const teamData = [
    {
      name: "Chandan Samantaray",
      role: "Founder & CEO",
      expertise: "Product Strategy & Leadership",
      icon: <FiUser className="text-blue-400" />,
    },
    {
      name: "Rohit Singh",
      role: "CTO",
      expertise: "Technical Architecture",
      icon: <FiCode className="text-blue-400" />,
    },
    {
      name: "Biswa Sahoo",
      role: "Project Manager",
      expertise: "Delivery Excellence",
      icon: <FiAward className="text-blue-400" />,
    },
    {
      name: "Tapan Biswal",
      role: "Team Lead",
      expertise: "Manage Fullstack Team",
      icon: <FiUser className="text-blue-400" />,
    },
    {
      name: "Khirod Bhanja",
      role: "Digital Marketing Head",
      expertise: "Digital Content Expert",
      icon: <FiCode className="text-blue-400" />,
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
  const goToSlide = (index) => {
    if (index < 0) index = teamData.length - 1;
    if (index >= teamData.length) index = 0;
    setCurrentIndex(index);
  };

  // Desktop scroll handlers
  const scrollToItem = (direction) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const itemWidth = 300 + 16; // width + margin
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Desktop drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
  };

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
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="w-full h-full overflow-hidden">
              <div
                className="flex w-full h-full transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {teamData.map((member, index) => (
                  <div key={index} className="flex-shrink-0 w-full h-full px-4">
                    <div className="h-full bg-gray-800 rounded-xl p-8 flex flex-col items-center text-center border border-gray-700">
                      <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                        {member.icon}
                      </div>
                      <h3 className="text-2xl font-semibold text-white">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 text-lg mt-2">
                        {member.role}
                      </p>
                      <p className="text-gray-300 text-base mt-4">
                        {member.expertise}
                      </p>
                      <div className="mt-6 pt-6 border-t border-gray-700 w-full">
                        <div className="flex justify-center space-x-6">
                          <button className="text-blue-400 hover:text-blue-300">
                            <FiCalendar size={20} />
                          </button>
                          <button className="text-blue-400 hover:text-blue-300">
                            <FiUser size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => goToSlide(currentIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 rounded-full p-2 text-white"
            >
              <FiChevronRight size={20} />
            </button>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {teamData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentIndex === index ? "bg-blue-500" : "bg-gray-600"
                  }`}
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
                    <div className="h-full bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center border border-gray-700 hover:border-blue-500 transition-all duration-300">
                      <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                        {member.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {member.name}
                      </h3>
                      <p className="text-blue-400 text-sm mt-1">
                        {member.role}
                      </p>
                      <p className="text-gray-300 text-sm mt-3">
                        {member.expertise}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-700 w-full">
                        <div className="flex justify-center space-x-4">
                          <button className="text-blue-400 hover:text-blue-300">
                            <FiCalendar />
                          </button>
                          <button className="text-blue-400 hover:text-blue-300">
                            <FiUser />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollToItem("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 hover:bg-gray-700/90 rounded-full p-3 text-white transition-all shadow-lg"
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
