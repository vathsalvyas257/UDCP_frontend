// src/components/ReplyForm.jsx
import { useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function ReplyForm({ threadId }) {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:7777/api/replies/${threadId}`, { content },{
        withCredentials:true
    });
    setContent("");
    queryClient.invalidateQueries(["thread", threadId]); // Refresh data
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[10vh]">
      <textarea placeholder="Write your reply..." value={content} onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded mb-2" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Reply
      </button>
    </form>
  );
}
