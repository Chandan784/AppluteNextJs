import React from "react";

const CategorySection = ({ categories }) => {
  const scrollStyle = {
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none", // Firefox
  };

  return (
    <div className="relative">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div style={scrollStyle} className="no-scrollbar flex space-x-4 py-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-64 flex items-center"
            >
              {/* Category Icon */}
              <img
                src={category.icon}
                alt={`${category.name} icon`}
                className="w-10 h-10 mr-4"
              />
              {/* Category Title */}
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
