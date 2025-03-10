import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academics");
  const [creator, setCreator] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient(); // React Query Client

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL||"/api"}/threads`,
        { title, category, creator },
        { withCredentials: true }
      );

      // Refresh thread list
      queryClient.invalidateQueries(["threads"]);

      // Reset form fields without navigating
      setTitle("");
      setCategory("Academics");
      setCreator("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create thread.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg mt-[10vh]"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a New Thread</h2>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mb-4"
        >
          {error}
        </motion.p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <input
            type="text"
            placeholder="Thread Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </motion.div>

        {/* Category Dropdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Academics">Academics</option>
            <option value="Events">Events</option>
            <option value="Clubs">Clubs</option>
            <option value="Placements">Placements</option>
          </select>
        </motion.div>

        {/* Creator Name Input */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:from-blue-700 hover:to-purple-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-2 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Creating...</span>
            </div>
          ) : (
            "Create Thread"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
