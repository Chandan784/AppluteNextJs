"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  selectIsAuthenticated,
  checkUserInLocalStorage,
} from "@/app/store/slices/userSlice";
import Link from "next/link";
import LanguageModal from "./languageModal"; // Adjust path as needed

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkUserInLocalStorage());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  const toggleLanguageModal = () => {
    setIsLanguageModalOpen(!isLanguageModalOpen);
  };

  const languages = [
    "Hindi (हिन्दी)",
    "Bengali (বাংলা)",
    "Telugu (తెలుగు)",
    "Marathi (मराठी)",
    "Tamil (தமிழ்)",
    "Urdu (اردو)",
    "Gujarati (ગુજરાતી)",
    "Malayalam (മലയാളം)",
    "Kannada (ಕನ್ನಡ)",
    "Odia (ଓଡ଼ିଆ)",
    "Punjabi (ਪੰਜਾਬੀ)",
    "Assamese (অসমীয়া)",
    "Maithili (मैथिली)",
    "Santali (ᱥᱟᱱᱛᱟᱲᱤ)",
    "Konkani (कोंकणी)",
    "Nepali (नेपाली)",
    "Kashmiri (कश्मीरी / کشمیری)",
    "Sindhi (سنڌي / सिंधी)",
    "Dogri (डोगरी)",
    "Manipuri (মৈইপꯗ / মণিপুরী)",
    "Sanskrit (संस्कृत)",
    "Tulu (ತುಳು)",
    "Bodo (बड़ो)",
    "Koya (कोया)",
    "Warli (वारली)",
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-lg lg:text-xl font-bold">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            Applute
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        {/* <div className="relative hidden md:flex flex-grow max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for courses..."
            className="w-full bg-gray-800 text-white rounded-full pl-12 pr-4 py-2 outline-none transition-all duration-300 ease-in-out"
          />
          <button
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={handleSearch}
          >
            <span className="material-icons">search</span>
          </button>
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setSearchTerm("")}
            >
              <span className="material-icons">close</span>
            </button>
          )}
        </div> */}

        {/* Search Bar (Mobile) */}
        {/* <div className="relative flex-grow md:hidden flex justify-center mx-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-gray-800 text-white rounded-full pl-8 pr-4 py-2 outline-none text-xs max-w-xs w-full"
          />
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={handleSearch}
          >
            <span className="material-icons text-xs">search</span>
          </button>
          {searchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setSearchTerm("")}
            >
              <span className="material-icons text-sm">close</span>
            </button>
          )}
        </div> */}

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Home
          </Link>
          <Link
            href="/subscription"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Subscription
          </Link>
          <Link
            href="/contactus"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Contact Us
          </Link>
          <button
            onClick={toggleLanguageModal}
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Language
          </button>
          <Link
            href="/settings"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Settings
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                href="/auth/login"
                className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleProfileClick}
              className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
            >
              Profile
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          <span className="material-icons">menu</span>
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="w-1/2 max-w-sm bg-gray-800 text-white p-6 transform transition-transform duration-300 ease-in-out">
            <button
              className="text-2xl absolute top-4 right-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="material-icons">close</span>
            </button>
            <div className="mt-8 space-y-4">
              <Link
                href="/"
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                Home
              </Link>
              <Link
                href="/subscription"
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                Subscription
              </Link>
              <Link
                href="/contactus"
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                Contact Us
              </Link>
              <button
                onClick={toggleLanguageModal}
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors w-full text-left"
              >
                Language
              </button>
              <Link
                href="/settings"
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                Settings
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/auth/login"
                    className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                  >
                    Signup
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleProfileClick}
                  className="block w-full text-left hover:bg-gray-700 px-4 py-2 rounded transition-colors"
                >
                  Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={toggleLanguageModal}
        languages={languages}
      />
    </header>
  );
};

export default Header;
