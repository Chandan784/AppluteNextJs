import React from "react";

const CategorySection = ({ categories }) => {
  const scrollStyle = {
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none" /* Firefox */,
  };

  return (
    <div className="relative">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div style={scrollStyle} className="no-scrollbar flex space-x-4 py-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0 w-64"
            >
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
