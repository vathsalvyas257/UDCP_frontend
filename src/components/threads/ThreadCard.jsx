import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function ThreadCard({ thread }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Thread Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3">{thread.title}</h2>

      {/* Thread Description */}
      <p className="text-gray-600 mb-4">{thread.description}</p>

      {/* Author and Category */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FaUserCircle className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">By {thread?.creator?.name}</span>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            thread.category === "Academics"
              ? "bg-blue-100 text-blue-600"
              : thread.category === "Events"
              ? "bg-purple-100 text-purple-600"
              : thread.category === "Clubs"
              ? "bg-green-100 text-green-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {thread.category}
        </span>
      </div>

      {/* View Discussion Button */}
      <div className="flex justify-end">
        <Link
          to={`/dashboard/thread/${thread._id}`}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          View Discussion
        </Link>
      </div>
    </motion.div>
  );
}