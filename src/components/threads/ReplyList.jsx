import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";

export default function ReplyList({ threadId }) {
  const { data: replies, isLoading } = useQuery({
    queryKey: ["replies", threadId],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/replies/${threadId}/`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Replies</h3>

      <AnimatePresence>
        {replies.map((reply, index) => (
          <motion.div
            key={reply._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start space-x-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <FaUserCircle className="w-10 h-10 text-gray-400" />
              </div>

              {/* Reply Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800">{reply?.user?.name || "Anonymous"}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* No Replies Message */}
      {replies.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-6"
        >
          No replies yet. Be the first to reply!
        </motion.div>
      )}
    </div>
  );
}