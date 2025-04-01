"use client";
import React, { useRef, useState, useEffect } from "react";
import { FiMapPin, FiBriefcase, FiCalendar } from "react-icons/fi";

const ClientsSection = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const animationRef = useRef(null);

  // Client data
  const clientsData = [
    {
      name: "Compugraphs Softech",
      description:
        "Enterprise IT solutions and custom software development partner",
      location: "Bhubaneswar",
      since: "2020",
      category: "Technology",
    },
    {
      name: "Divisha LandTreat",
      description:
        "Innovative real estate and sustainable land development solutions",
      location: "Bhubaneswar",
      since: "2021",
      category: "Real Estate",
    },
    {
      name: "Amilo AI",
      description:
        "Cutting-edge artificial intelligence and machine learning solutions",
      location: "Bangalore",
      since: "2022",
      category: "AI/ML",
    },
    {
      name: "Skillanto",
      description:
        "Next-generation e-learning platform for professional skill development",
      location: "Bhubaneswar",
      since: "2021",
      category: "EdTech",
    },
    {
      name: "Genica",
      description:
        "Digital transformation and innovative technology consulting services",
      location: "Bhubaneswar",
      since: "2020",
      category: "Consulting",
    },
    {
      name: "Vernacular Medium",
      description: "Regional language education technology platform",
      location: "Bhubaneswar",
      since: "2023",
      category: "EdTech",
    },
  ];

  // Auto-scroll animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isPaused && !isDragging) {
        container.scrollLeft += 0.8;

        // Reset for infinite loop without expanding container
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, isDragging]);

  // Manual scroll handlers
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
    const walk = (x - startX.current) * 2;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    document.body.style.cursor = "";
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <section id="clients" className="py-16 bg-gray-800 w-full overflow-hidden">
      <div className="container mx-auto px-0 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-white">
          Our Esteemed Clients
        </h2>

        <div className="w-full relative">
          {/* Container with hidden overflow */}
          <div ref={containerRef} className="w-full overflow-x-hidden py-4">
            {/* Moving content - only this part scrolls */}
            <div
              ref={contentRef}
              className={`flex w-max cursor-grab active:cursor-grabbing ${
                !isDragging && !isPaused ? "animate-scroll" : ""
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={(e) => handleMouseDown(e.touches[0])}
              onTouchMove={(e) => handleMouseMove(e.touches[0])}
              onTouchEnd={endDrag}
            >
              {[...clientsData, ...clientsData].map((client, index) => (
                <div
                  key={`${index}-${client.name}`}
                  className="flex-shrink-0 w-[300px] mx-2"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => !isDragging && setIsPaused(false)}
                >
                  <div className="h-full bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-300">
                    <div className="flex items-start mb-4">
                      <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
                        <FiBriefcase className="text-blue-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {client.name}
                        </h3>
                        <p className="text-blue-400 text-sm flex items-center mt-1">
                          <FiMapPin className="mr-1" />
                          {client.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      {client.description}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span className="flex items-center">
                        <FiCalendar className="mr-1" />
                        Since {client.since}
                      </span>
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {client.category}
                      </span>
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

export default ClientsSection;
