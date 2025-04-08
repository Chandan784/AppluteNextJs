"use client";
import React, { useState, useEffect, useRef } from "react";
import "./globals.css";
import Head from "next/head";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiMenu,
  FiX,
  FiCode,
  FiGlobe,
  FiTrendingUp,
  FiBox,
  FiBookOpen,
  FiUsers,
  FiTool,
  FiInfo,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";
import ClientsSection from "@/components/layout/ClientSection";
import TeamSection from "@/components/layout/TeamSection";
import TechnologySection from "@/components/layout/TechnologySection";
import PortfolioSection from "@/components/layout/Portfolio";

function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="font-sans bg-black text-white">
      <Head>
        <title>Applute - Software Company</title>
        <meta
          name="description"
          content="Innovative solutions for app development, web development, digital marketing, and more."
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-gray-900 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-6">
          <div className="text-2xl font-bold text-white">Applute</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
          <ul
            className={`md:flex space-x-8 ${
              menuOpen ? "block" : "hidden"
            } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-0`}
          >
            {[
              "Home",
              "Services",
              "Portfolio",
              "Clients",
              "Team",
              "Technology",
              "About",
              "Contact",
            ].map((item) => (
              <li key={item} className="mb-4 md:mb-0">
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-blue-500 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="flex items-center justify-center h-screen bg-gray-900 relative overflow-hidden"
      >
        <div className="text-center z-10" data-aos="fade-up">
          <h1 className="text-6xl font-bold mb-6">Welcome to Applute</h1>
          <p className="text-xl mb-8">
            Innovative Solutions for Your Digital Needs
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-500 transition duration-300">
            Get Started
          </button>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCode size={48} />,
                title: "App Development",
                description:
                  "We build cutting-edge mobile applications for iOS and Android.",
              },
              {
                icon: <FiGlobe size={48} />,
                title: "Web Development",
                description: "Modern, responsive, and scalable web solutions.",
              },
              {
                icon: <FiTrendingUp size={48} />,
                title: "Digital Marketing",
                description:
                  "Boost your online presence with our marketing strategies.",
              },
              {
                icon: <FiBox size={48} />,
                title: "Product Development",
                description: "From idea to product, we handle it all.",
              },
              {
                icon: <FiBookOpen size={48} />,
                title: "Software Training",
                description:
                  "Learn the latest technologies with our expert trainers.",
              },
              {
                icon: <FiUsers size={48} />,
                title: "Internship",
                description:
                  "Gain real-world experience with our internship programs.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-8 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                data-aos="fade-up"
              >
                <div className="text-blue-500 mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection />

      <ClientsSection />
      {/* Team Section */}
      <TechnologySection />
      <TeamSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
            About Us
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto" data-aos="fade-up">
            Applute is a leading software company specializing in app
            development, web development, digital marketing, and more. We are
            committed to delivering innovative solutions that drive business
            growth.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-10 bg-gray-800 text-gray-300">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6" data-aos="fade-up">
            Contact Us
          </h3>
          <p className="mb-2" data-aos="fade-up">
            <FiMail className="inline mr-2" />
            Email:{" "}
            <a
              href="mailto:applutetech@gmail.com"
              className="hover:text-blue-500"
            >
              applutetech@gmail.com
            </a>
          </p>
          <p className="mb-6" data-aos="fade-up">
            <FiPhone className="inline mr-2" />
            Phone:{" "}
            <a href="tel:+916370302039" className="hover:text-blue-500">
              +91 6370302039
            </a>
          </p>
          <p className="mb-6" data-aos="fade-up">
            <FiMapPin className="inline mr-2" />
            Uttarahalli, Bangalore
          </p>
          <div className="flex justify-center space-x-6" data-aos="fade-up">
            <a
              href="https://facebook.com/applute"
              className="hover:text-blue-500 transition duration-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com/applute"
              className="hover:text-blue-500 transition duration-300"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/company/applute"
              className="hover:text-blue-500 transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Page;
