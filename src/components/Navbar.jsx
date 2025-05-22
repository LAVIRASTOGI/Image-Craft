import { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, credit, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setFeaturesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-10 md:px-14 lg:px-28 py-4 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img
                className="w-6 h-6"
                src={assets.logo_icon}
                alt="ImageCraft Logo"
              />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ImageCraft
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <div className="relative group" ref={featuresRef}>
              <button
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={() => setFeaturesOpen(!featuresOpen)}
              >
                Features
                <svg
                  className={`w-4 h-4 transition-transform ${
                    featuresOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-50 ${
                  featuresOpen ? "block" : "hidden"
                }`}
              >
                <div className="py-1">
                  <Link
                    to="/result?feature=generate"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    Text to Image
                  </Link>
                  <Link
                    to="/result?feature=removeBackground"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    Remove Background
                  </Link>
                  <Link
                    to="/result?feature=tonizeImage"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    Image Tonizer
                  </Link>
                </div>
              </div>
            </div>
            <Link
              to="/buy"
              className="text-gray-700 hover:text-blue-600 transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div>
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => navigate("/buy")}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full hover:shadow-md transition-all duration-300 border border-blue-100"
                >
                  <img className="w-5" src={assets.credit_star} alt="" />
                  <p className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {credit} Credits
                  </p>
                </button>

                <div className="relative group">
                  <div className="w-10 h-10 rounded-full  flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold border-2 border-blue-200 cursor-pointer">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                    <div className="card min-w-[200px]">
                      <div className="px-1 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-700">
                          Welcome back,
                        </p>
                        <p className="text-sm font-semibold text-blue-600">
                          {user.name}
                        </p>
                      </div>
                      <ul className="list-none m-0 pt-2">
                        <li
                          onClick={() => navigate("/result")}
                          className="py-2 px-3 cursor-pointer hover:bg-blue-50 rounded flex items-center gap-2 text-sm"
                        >
                          <svg
                            className="w-4 h-4 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                          My Images
                        </li>
                        <li
                          onClick={logout}
                          className="py-2 px-3 cursor-pointer hover:bg-red-50 rounded flex items-center gap-2 text-sm text-red-500"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                          Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-5">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-white px-7 py-2 sm:px-8 sm:py-2.5 text-sm rounded-full hover:shadow-lg transition-all"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
