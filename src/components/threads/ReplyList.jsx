// src/components/ReplyList.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ReplyList({ threadId }) {
  const { data: replies, isLoading } = useQuery({
    queryKey: ["replies", threadId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:7777/api/replies/${threadId}/`,{
        withCredentials:true
      });
      return res.data;
    }
  });

  if (isLoading) return <p>Loading replies...</p>;

  return (
    <div className="mt-6">
      {replies.map((reply) => (
        <div key={reply._id} className="border p-2 rounded mb-2">
          {reply.content}
        </div>
      ))}
    </div>
  );
}
