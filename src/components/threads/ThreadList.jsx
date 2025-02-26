// src/components/ThreadList.jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ThreadCard from "./ThreadCard";
import CreateThreadForm from "./CreateThreadForm";

export default function ThreadList() {
  const { data: threads, isLoading, error } = useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:7777/threads",{
        withCredentials:true
      });
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center">Loading threads...</p>;
  if (error) return <p className="text-center text-red-500">Error loading threads.</p>;

  return (
    <div className="mt-[20vh]">
        <CreateThreadForm/>
      {threads.length > 0 ? (
        threads.map(thread => <ThreadCard key={thread._id} thread={thread} />)
      ) : (
        <p className="text-center text-gray-500">No threads found.</p>
      )}
    </div>
  );
}
