"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const ClientsSection = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
    if (index < 0) index = clientsData.length - 1;
    if (index >= clientsData.length) index = 0;
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
      id="clients"
      className="py-16 bg-gray-800 w-full overflow-hidden relative"
    >
      <div className="container mx-auto px-4 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12 text-center text-white">
          Our Esteemed Clients
        </h2>

        {/* Mobile View (Full-width cards) */}
        {isMobile && (
          <div className="w-full relative h-[250px]">
            <button
              onClick={() => goToSlide(currentIndex - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-gray-700/80 rounded-full p-2 text-white"
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="w-full h-full overflow-hidden">
              <div
                className="flex w-full h-full transition-transform duration-300"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {clientsData.map((client, index) => (
                  <div key={index} className="flex-shrink-0 w-full h-full px-4">
                    <div className="h-full bg-gray-700 rounded-xl p-6 border border-gray-600">
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

            <button
              onClick={() => goToSlide(currentIndex + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-700/80 rounded-full p-2 text-white"
            >
              <FiChevronRight size={20} />
            </button>

            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {clientsData.map((_, index) => (
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700/80 hover:bg-gray-600/90 rounded-full p-3 text-white transition-all shadow-lg"
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
                {clientsData.map((client, index) => (
                  <div key={index} className="flex-shrink-0 w-[300px] mx-2">
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

            <button
              onClick={() => scrollToItem("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700/80 hover:bg-gray-600/90 rounded-full p-3 text-white transition-all shadow-lg"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientsSection;
