// src/components/ThreadDetails.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";

export default function ThreadDetails() {
  const { id } = useParams();
  const { data: thread, isLoading, error } = useQuery({
    queryKey: ["thread", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:7777/threads/${id}`);
      return res.data;
    }
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading thread.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-[10vh]">
      <h2 className="text-2xl font-bold mb-2">{thread.title}</h2>
      <p className="text-gray-600">{thread.description}</p>
      <span className="text-sm text-gray-500">By {thread.author}</span>

      <ReplyList threadId={id} />
      <ReplyForm threadId={id} />
    </div>
  );
}
