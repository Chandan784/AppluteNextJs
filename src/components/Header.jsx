"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectIsAuthenticated } from "@/app/store/slices/userSlice";
import { checkUserInLocalStorage } from "@/app/store/slices/userSlice";
import Link from "next/link";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(checkUserInLocalStorage());
  }, [dispatch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false); // Close search bar when sidebar is opened
  };

  const handleSearch = () => {
    if (searchTerm) {
      router.push(`/search?query=${searchTerm}`);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <div className="text-lg lg:text-xl font-bold">
          <Link href="/" className="hover:text-gray-400 transition-colors">
            Applute
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div className="relative hidden md:flex flex-grow max-w-md mx-auto">
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
        </div>

        {/* Search Bar (Mobile) */}
        <div className="relative flex-grow md:hidden flex justify-center mx-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="bg-gray-800 text-white rounded-full pl-8 pr-4 py-2 outline-none text-xs max-w-xs w-full "
          />
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={handleSearch}
          >
            <span className="material-icons   text-xs">search for </span>
          </button>
          {searchTerm && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setSearchTerm("")}
            >
              <span className="material-icons text-sm">close</span>
            </button>
          )}
        </div>

        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            href="/"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Home
          </Link>
          <Link
            href="/my-courses"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            My Courses
          </Link>
          <Link
            href="/contact"
            className="hover:bg-gray-800 px-4 py-2 rounded transition-colors"
          >
            Contact Us
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
                href="/my-courses"
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                My Courses
              </Link>
              <Link
                href="/contact"
                className="block hover:bg-gray-700 px-4 py-2 rounded transition-colors"
              >
                Contact Us
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
    </header>
  );
};

export default Header;
