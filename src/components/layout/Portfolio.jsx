import React from "react";
import {
  FaShoppingCart,
  FaHospitalAlt,
  FaChartLine,
  FaUsersCog,
  FaWarehouse,
  FaHome,
  FaLeaf,
  FaCode,
  FaRobot,
  FaCalendarAlt,
  FaUniversity,
} from "react-icons/fa";

const PortfolioSection = () => {
  return (
    <>
      {/* Our Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-900 text-center">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold mb-12 text-white"
            data-aos="fade-up"
          >
            Our Portfolio
          </h2>

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Bioknox HR Management",
                  description: "Android app for HR and employee management.",
                  icon: (
                    <FaUsersCog
                      size={40}
                      className="text-blue-400 mx-auto mb-4"
                    />
                  ),
                },
                {
                  title: "Disha Inventory Management",
                  description:
                    "App for tracking and managing stock efficiently.",
                  icon: (
                    <FaWarehouse
                      size={40}
                      className="text-purple-400 mx-auto mb-4"
                    />
                  ),
                },
                {
                  title: "LandTreat.com",
                  description:
                    "Real estate company website for property listings.",
                  icon: (
                    <FaHome
                      size={40}
                      className="text-orange-400 mx-auto mb-4"
                    />
                  ),
                },
                {
                  title: "Shreeharivatika.in",
                  description: "Cottage and lifestyle product brand website.",
                  icon: (
                    <FaLeaf size={40} className="text-green-500 mx-auto mb-4" />
                  ),
                },
                {
                  title: "Tec-Centric.com",
                  description:
                    "Corporate site for a software development company.",
                  icon: (
                    <FaCode size={40} className="text-cyan-400 mx-auto mb-4" />
                  ),
                },
                {
                  title: "Amiloai.com",
                  description:
                    "Technology startup website focused on AI innovation.",
                  icon: (
                    <FaRobot size={40} className="text-pink-500 mx-auto mb-4" />
                  ),
                },
                {
                  title: "EventLamp.com",
                  description: "Event booking platform with modern UX.",
                  icon: (
                    <FaCalendarAlt
                      size={40}
                      className="text-yellow-300 mx-auto mb-4"
                    />
                  ),
                },
                {
                  title: "Adhikar App",
                  description: "Android app for accessing government schemes.",
                  icon: (
                    <FaUniversity
                      size={40}
                      className="text-indigo-400 mx-auto mb-4"
                    />
                  ),
                },
              ].map((client, index) => (
                <div
                  key={index}
                  className="p-8 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                  data-aos="fade-up"
                >
                  {client.icon}
                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    {client.title}
                  </h3>
                  <p className="text-gray-300">{client.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;
