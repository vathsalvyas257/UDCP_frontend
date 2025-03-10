
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import { motion } from "framer-motion";

export default function ThreadDetails() {
  const { id } = useParams();
  const { data: thread, isLoading, error } = useQuery({
    queryKey: ["thread", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL||"/api"}/threads/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <motion.div
        className="text-center text-lg font-semibold mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    );

  if (error)
    return (
      <motion.div
        className="text-center text-red-500 font-semibold mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Error loading thread.
      </motion.div>
    );

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-[10vh]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Thread Title */}
      <motion.h2
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {thread.title}
      </motion.h2>

      {/* Thread Description */}
      <motion.p
        className="text-gray-600"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        {thread.description}
      </motion.p>

      <motion.span
        className="text-sm text-gray-500"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        By {thread?.creator?.name}
      </motion.span>

      {/* Replies Section */}
      <ReplyList threadId={id} />

      {/* Animated Reply Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <ReplyForm threadId={id} />
      </motion.div>
    </motion.div>
  );
}
