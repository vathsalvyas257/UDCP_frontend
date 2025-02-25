import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHome, FaInfoCircle, FaCertificate, FaFolder, FaBars } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4 flex flex-col justify-start items-start md:h-screen md:w-64">
        {/* Logo or Brand */}
        <div className="text-xl font-bold mb-4 hidden md:block">My Dashboard</div>

        {/* Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <FaBars className="text-2xl cursor-pointer" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-4 w-full">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/about" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <FaInfoCircle />
            <span>About</span>
          </Link>
          <Link to="/certifications" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <FaCertificate />
            <span>Certifications</span>
          </Link>
          <Link to="/collections" className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded">
            <FaFolder />
            <span>Collections</span>
          </Link>
        </div>

        {/* Profile Section */}
        <div className="mt-auto hidden md:block w-full">
          <div className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
            <FaUser />
            <span>Profile</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 md:ml-64">
        {/* Profile Section for Small Screens */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FaUser />
            <span>Profile</span>
          </div>
        </div>

        {/* Dummy Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-gray-700 mb-4">
            This is your personalized dashboard where you can manage your account, view your certifications, and explore collections. Here, you can access all the tools and resources you need to make the most of our platform.
          </p>
          <p className="text-gray-700 mb-4">
            From the navigation bar on the left, you can easily navigate to different sections like About, Certifications, and Collections. Each section is designed to provide you with the information and tools you need.
          </p>
          <p className="text-gray-700 mb-4">
            If you have any questions or need assistance, feel free to reach out to our support team. We are here to help you make the most of your experience.
          </p>
          <p className="text-gray-700 mb-4">
            Thank you for choosing our platform. We are committed to providing you with the best experience possible.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;