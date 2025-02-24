import React, { useState, useEffect } from "react";
import { href } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Importing Hamburger & Close icons

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md p-3 flex justify-between items-center fixed w-full top-0 z-50">
      {/* Left Side - Logo, Name */}
      <div className="flex items-center space-x-4">
        <img
          src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_640.jpg"
          alt="Sonic Solutions"
          className="h-9 w-9 rounded-full"
        />
        <h1 className="text-lg font-bold text-gray-800">Solutions</h1>

        {/* Home Dropdown (Hover on Desktop, Click on Mobile) */}
        <div
          className="relative"
          onMouseEnter={() => !isMobile && setDropdownOpen(true)}
          onMouseLeave={() => !isMobile && setDropdownOpen(false)}
        >
          <button
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300"
            onClick={() => isMobile && setDropdownOpen(!dropdownOpen)}
          >
            Home
          </button>
          <div
            className={`absolute bg-white shadow-md rounded mt-2 py-2 w-40 transition-all duration-300 
              ${dropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
            `}
          >
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("why")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200"
            >
              Why
            </button>
            <button
              onClick={() => scrollToSection("what")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200"
            >
              What
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition duration-200"
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Navigation hrefs */}
      <div className="hidden md:flex items-center space-x-4">
        <href
          to="/services"
          className="text-blue-600 font-medium hover:text-blue-800 transition duration-300"
        >
          Our Services
        </href>
        <href
          to="/rewards"
          className="text-blue-600 font-medium hover:text-blue-800 transition duration-300"
        >
          Our Rewards
        </href>
        <href
          to="/login"
          className="text-blue-600 font-medium text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300"
        >
          Login
        </href>
        <href
          to="/signup"
          className="bg-blue-600 text-white font-medium text-sm px-3 py-1 rounded hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </href>
      </div>

      {/* Mobile Menu - Hamburger Icon */}
      <div className="md:hidden">
        <button
          className="text-gray-700 text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg transform transition-transform duration-300 p-5 
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button
          className="text-gray-700 text-3xl absolute top-5 right-5"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        <div className="mt-10 flex flex-col space-y-4">
          <href
            to="/services"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Our Services
          </href>
          <href
            to="/rewards"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Our Rewards
          </href>
          <href
            to="/login"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </href>
          <href
            to="/signup"
            className="text-gray-700 font-semibold hover:text-blue-600 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </href>
        </div>
      </div>
    </nav>
  );
};

export default Header;
