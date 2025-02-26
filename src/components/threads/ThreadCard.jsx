// src/components/ThreadCard.jsx
import { Link } from "react-router-dom";

export default function ThreadCard({ thread }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition duration-300 mt-[10vh]">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{thread.title}</h2>
      <p className="text-gray-600 mb-4">{thread.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">By {thread.author}</span>
        <Link to={`/thread/${thread._id}`} className="text-blue-500 font-semibold hover:underline">
          View Discussion
        </Link>
      </div>
    </div>
  );
}
