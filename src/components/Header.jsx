import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveringHome, setHoveringHome] = useState(false);
  let homeTimeout;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setHomeMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md p-2 navbarsfor men  flex justify-between items-center fixed w-full top-0 z-50 px-8 md:px-16">
      {/* Left - Logo & Home */}
      <div className="flex items-center space-x-6">
        <Link to="/">
        <img
          src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_640.jpg"
          alt="Logo"
          className="h-11 w-11 rounded-full"
        />
</Link>
      <Link to="/">
        <h1 className="text-lg font-bold text-gray-800">Solutions</h1>
        </Link>
        {/* Desktop Home Dropdown */}
        {!isMobile && (
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(homeTimeout);
              setHoveringHome(true);
            }}
            onMouseLeave={() => {
              homeTimeout = setTimeout(() => setHoveringHome(false), 500); // Delay closing
            }}
          >
            <Link to="/">
            <button className="text-gray-700 font-semibold hover:text-blue-600 transition cursor-pointer">
              Home
            </button>
            </Link>
            {hoveringHome && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded py-2 w-40 transition-opacity opacity-100">
                {["about", "why", "what", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {["services", "rewards"].map((link) => (
          <Link
            key={link}
            to={`/${link}`}
            className="text-blue-600 font-medium hover:text-blue-800 transition"
          >
            Our {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
        <Link
          to="/auth"
          className="text-blue-600 font-medium text-sm px-3 py-1 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
        >
          Login/Signup
        </Link>
       
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
          {/* Home in Mobile Menu */}
          <div>
            <button
              className="w-full text-left text-gray-700 font-semibold hover:text-blue-600 flex justify-between items-center"
              onClick={() => setHomeMenuOpen(!homeMenuOpen)}
            >
              Home
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  homeMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {homeMenuOpen && (
              <div className="mt-2 ml-4 space-y-2">
                {["about", "why", "what", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
          {["services", "rewards"].map((link) => (
  <Link
    key={link}
    to={`/${link}`}
    className="text-gray-700 font-semibold hover:text-blue-600 transition"
    onClick={() => setMenuOpen(false)}
  >
    Our {link.charAt(0).toUpperCase() + link.slice(1)}
  </Link>
))}

<Link
  to="/auth"
  className="bg-blue-600 text-white font-medium text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
  onClick={() => setMenuOpen(false)}
>
  Login/Signup
</Link>


        </div>
      </div>
    </nav>
  );
};

export default Header;
