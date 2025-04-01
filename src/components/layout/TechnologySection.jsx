"use client";
import React, { useRef, useEffect } from "react";
import * as Icons from "react-icons/si";
import { FaAws } from "react-icons/fa";

const TechnologySection = () => {
  const scrollContainerRef = useRef(null);
  const technologies = [
    { name: "React", icon: "SiReact", color: "#61DAFB" },
    { name: "Node.js", icon: "SiNodedotjs", color: "#339933" },
    { name: "Python", icon: "SiPython", color: "#3776AB" },
    { name: "AWS", icon: "SiAwsamplify", color: "#FF9900" },
    { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
    { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
    { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
    { name: "C++", icon: "SiCplusplus", color: "#00599C" },
    { name: "Kotlin", icon: "SiKotlin", color: "#7F52FF" },
    { name: "Swift", icon: "SiSwift", color: "#F05138" },
    { name: "TypeScript", icon: "SiTypescript", color: "#3178C6" },
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "Docker", icon: "SiDocker", color: "#2496ED" },
    { name: "Git", icon: "SiGit", color: "#F05032" },
    { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
    { name: "Flutter", icon: "SiFlutter", color: "#02569B" },
    { name: "Android", icon: "SiAndroid", color: "#3DDC84" },
    { name: "iOS", icon: "SiIos", color: "#000000" },
    { name: "GraphQL", icon: "SiGraphql", color: "#E10098" },
    { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    let animationFrameId;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      container.scrollLeft = scrollAmount;

      // Reset to create infinite loop
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="py-12 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Our Technology Stack
        </h2>

        <div className="relative group">
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-6 scrollbar-hide"
          >
            <div className="flex gap-10 w-max mx-auto px-8">
              {[...technologies, ...technologies].map((tech, index) => {
                const IconComponent = Icons[tech.icon];
                return (
                  <div
                    key={`${tech.name}-${index}`}
                    className="flex flex-col items-center shrink-0 transition-all duration-300 hover:scale-110"
                  >
                    {IconComponent && (
                      <IconComponent
                        size={48}
                        style={{ color: tech.color }}
                        className="mb-3"
                      />
                    )}
                    <span className="text-lg font-semibold text-white">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gradient fade effects */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
