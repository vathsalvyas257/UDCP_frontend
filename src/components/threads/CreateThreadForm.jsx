import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Academics"); // Default category
  const [creator, setCreator] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:7777/threads",
        { title, category, creator },
        { withCredentials: true }
      );

      setTitle("");
      setCategory("Academics");
      setCreator("");
      navigate("/threads"); // Redirect to thread list after success
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create thread.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-[10vh]">
      <h2 className="text-xl font-bold mb-4">Create a New Thread</h2>
      
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <input
          type="text"
          placeholder="Thread Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        >
          <option value="Academics">Academics</option>
          <option value="Events">Events</option>
          <option value="Clubs">Clubs</option>
          <option value="Placements">Placements</option>
        </select>

        {/* Creator Name Input */}
        <input
          type="text"
          placeholder="Your Name"
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Thread"}
        </button>
      </form>
    </div>
  );
}
