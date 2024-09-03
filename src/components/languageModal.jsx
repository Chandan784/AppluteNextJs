"use client";

import React from "react";

const LanguageModal = ({ isOpen, onClose, languages, onLanguageSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full h-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <span className="material-icons">close</span>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Select Language</h2>
        {/* Scrollable list */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: "calc(100% - 60px)" }}
        >
          {languages.length > 0 ? (
            languages.map((language, index) => (
              <h1 key={index} className="text-lg">
                <button
                  className="w-full text-left hover:underline text-blue-600"
                  onClick={() => onLanguageSelect(language)}
                >
                  {language}
                </button>
              </h1>
            ))
          ) : (
            <li className="text-lg">No languages available</li>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
