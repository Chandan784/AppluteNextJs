"use client";
import React, { useState, useEffect } from "react";
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

// Client Card Component
const ClientCard = ({ client, index }) => (
  <div
    className="flex-shrink-0 w-72 md:w-full bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600 hover:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div className="flex items-start mb-4">
      <div className="bg-blue-500/10 p-3 rounded-lg mr-4">
        <FiBriefcase className="text-blue-400 text-xl" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white">{client.name}</h3>
        <p className="text-blue-400 text-sm flex items-center mt-1">
          <FiMapPin className="mr-1" />
          {client.location}
        </p>
      </div>
    </div>
    <p className="text-gray-300 text-sm mb-4">{client.description}</p>
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
);

function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      <section id="portfolio" className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
            Our Portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description:
                  "A scalable e-commerce solution for global brands.",
              },
              {
                title: "Healthcare App",
                description:
                  "A mobile app for patient management and telemedicine.",
              },
              {
                title: "Fintech Dashboard",
                description: "A real-time financial analytics dashboard.",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      {/* Clients Section */}
      <section id="clients" className="py-20 bg-gray-800 overflow-hidden">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold mb-12 text-center"
            data-aos="fade-up"
          >
            Our Esteemed Clients
          </h2>

          {/* Auto-scrolling container */}
          <div className="relative">
            {/* Desktop - Continuous scroll */}
            <div className="hidden md:block overflow-hidden">
              <div className="flex animate-[scroll_30s_linear_infinite] hover:animate-[scroll_30s_linear_infinite_paused]">
                {[...clientsData, ...clientsData].map((client, index) => (
                  <div
                    key={`${index}-${client.name}`}
                    className="px-4 min-w-[33.333%]"
                  >
                    <ClientCard
                      client={client}
                      index={index % clientsData.length}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile - Horizontal scroll with gradient edges */}
            <div className="md:hidden relative">
              <div className="flex overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-x-4 px-2">
                {clientsData.map((client, index) => (
                  <ClientCard key={index} client={client} index={index} />
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-800 to-transparent pointer-events-none"></div>
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-800 to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Chandan Samantaray",
                role: "Founder & CEO",
                description:
                  "Visionary leader with 10+ years of industry experience",
              },
              {
                name: "Rohit Singh",
                role: "CTO",
                description:
                  "Technology expert specializing in scalable architectures",
              },
              {
                name: "Biswa Ranjan Sahoo",
                role: "Project Manager",
                description: "Ensures timely delivery with exceptional quality",
              },
              {
                name: "Tapan Biswal",
                role: "Team Lead",
                description:
                  "Leads development teams with technical excellence",
              },
              {
                name: "Khirod Bhanja",
                role: "Digital Marketing Head",
                description:
                  "Drives growth through innovative marketing strategies",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 bg-gray-800 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12" data-aos="fade-up">
            Our Technology Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["React", "Node.js", "Python", "AWS"].map((tech, index) => (
              <div
                key={index}
                className="p-8 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                data-aos="fade-up"
              >
                <h3 className="text-2xl font-semibold mb-4">{tech}</h3>
                <p className="text-gray-300">
                  Cutting-edge technology for modern solutions.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
