import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import the logout action

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveringHome, setHoveringHome] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth); // Get user and auth status from Redux
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


const handleLogout = async () => {
  try {
    // Make the API call to logout
    // const response = await axios.post('http://localhost:7777/api/auth/logout', {}, { withCredentials: true });

    // If the response is successful
    // if (response.status === 200) {
      await dispatch(logout()); // Dispatch the logout action to clear the state
      setMenuOpen(false); // Close the mobile menu after logout
      navigate("/"); // Redirect to the homepage or login page
    // } else {
      console.error("Logout failed:", response.data.message);
      // Handle error if needed (e.g., show error message to user)
    // }
  } catch (error) {
    console.error("Error during logout:", error);
    // Handle error if needed (e.g., show error message to user)
  }
};


  return (
    <nav className="bg-white shadow-md p-2 flex justify-between items-center fixed w-full top-0 z-50 px-8 md:px-16">
      {/* Left - Logo & Title */}
      <div className="flex items-center space-x-6">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dcqd5eimb/image/upload/v1740547517/1630586594017_be838m.jpg"
            alt="Logo"
            className="h-11 w-11 rounded-full"
          />
        </Link>
        <Link to="/">
          <h1 className="text-lg font-bold text-gray-800">UniConnect Hub</h1>
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
              <button className="text-gray-700 font-semibold hover:text-[#B5651D] transition cursor-pointer">
                Home
              </button>
            </Link>
            {hoveringHome && (
              <div className="absolute left-0 mt-2 bg-white shadow-lg rounded py-2 w-40 transition-opacity opacity-100">
                {["about", "why", "what", "faculty", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
            className="text-gray-700 font-medium hover:text-[#B5651D] transition"
          >
            Our {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <img
              src={user?.profilePicture || "https://via.placeholder.com/40"} // Use user's profile picture or a placeholder
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <button
              onClick={handleLogout}
              className="text-white font-medium text-sm px-3 py-1 bg-[#B5651D] rounded hover:bg-[#D94E41] transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            className="text-white font-medium text-sm px-3 py-1 bg-[#B5651D] rounded hover:bg-[#D94E41] transition"
          >
            Login/Signup
          </Link>
        )}
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
              className="w-full text-left text-gray-700 font-semibold hover:text-[#B5651D] flex justify-between items-center"
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
                {["about", "why", "what", "faculty", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
              className="text-gray-700 font-semibold hover:text-[#B5651D] transition"
              onClick={() => setMenuOpen(false)}
            >
              Our {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-[#B5651D] text-white font-medium text-sm px-4 py-2 rounded hover:bg-[#D94E41] transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-[#B5651D] text-white font-medium text-sm px-4 py-2 rounded hover:bg-[#D94E41] transition"
              onClick={() => setMenuOpen(false)}
            >
              Login/Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;