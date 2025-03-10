import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ThreadCard from "./ThreadCard";
import CreateThreadForm from "./CreateThreadForm";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function ThreadList() {
  const {user} = useSelector((state)=> state.auth);
  const { data: threads, isLoading, error } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL||"/api"}/threads`, {
        withCredentials: true,
      });
      return res.data;
    },
  });

  if (isLoading)
    return (
      <motion.p
        className="text-center text-lg font-semibold mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading threads...
      </motion.p>
    );

  if (error)
    return (
      <motion.p
        className="text-center text-red-500 font-semibold mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Error loading threads.
      </motion.p>
    );

  return (

    <motion.div
      className="mt-[20vh] max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated Create Thread Form */}
      { (user?.role === "admin") && ( 
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <CreateThreadForm />
      </motion.div>
      )}

      {/* Animated Thread List */}
      <motion.div
        className="mt-4 space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {threads.length > 0 ? (
          threads.map((thread) => (
            <motion.div
              key={thread._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ThreadCard thread={thread} />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            No threads found.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}