"use client";
import React, { useRef, useState, useEffect } from "react";
import { FiUser, FiCode, FiAward, FiCalendar } from "react-icons/fi";

const TeamSection = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationRef = useRef(null);
  const touchStartX = useRef(0);

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

  // Double the team data for seamless looping
  const duplicatedTeamData = [...teamData, ...teamData];

  // Auto-scroll animation with increased speed
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = 300 + 16; // width + margin
    const scrollWidth = teamData.length * itemWidth;
    const scrollSpeed = 2.5; // Increased scroll speed

    const animate = () => {
      if (!isPaused && !isDragging) {
        container.scrollLeft += scrollSpeed;

        // Reset to start when reaching the duplicated portion
        if (container.scrollLeft >= scrollWidth) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, isDragging, teamData.length]);

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Increased sensitivity
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX.current) * 1.5; // Increased sensitivity
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <section id="team" className="py-16 bg-gray-900 w-full overflow-hidden">
      <div className="container mx-auto px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-white">
          Our Expert Team
        </h2>

        <div className="w-full relative">
          <div
            ref={containerRef}
            className="w-full overflow-x-auto py-4 scrollbar-hide touch-auto"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              className="flex w-max"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={endDrag}
            >
              {duplicatedTeamData.map((member, index) => (
                <div
                  key={`${index}-${member.name}`}
                  className="flex-shrink-0 w-[280px] mx-2 sm:w-[300px]"
                >
                  <div className="h-full bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center border border-gray-700 hover:border-blue-500 transition-all duration-300">
                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                      {member.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-blue-400 text-sm mt-1">{member.role}</p>
                    <p className="text-gray-300 text-sm mt-3">
                      {member.expertise}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 w-full">
                      <div className="flex justify-center space-x-4">
                        <button className="text-blue-400 hover:text-blue-300 transition">
                          <FiCalendar />
                        </button>
                        <button className="text-blue-400 hover:text-blue-300 transition">
                          <FiUser />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
