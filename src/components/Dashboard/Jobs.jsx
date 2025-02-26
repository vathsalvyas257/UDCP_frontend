import { useState } from "react";

const Jobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "TechCorp", link: "https://forms.gle/baTScPJMGp6AZoM6A" },
    { id: 2, title: "Backend Developer", company: "InnovateX", link: "https://forms.gle/baTScPJMGp6AZoM6A" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", company: "", link: "" });

  const addJob = () => {
    if (newJob.title && newJob.company && newJob.link) {
      setJobs([...jobs, { id: jobs.length + 1, ...newJob }]);
      setNewJob({ title: "", company: "", link: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Job Updates</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg shadow-md bg-white flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-gray-500">{job.company}</p>
            </div>
            <a href={job.link} target="_blank" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Apply</a>
          </div>
        ))}
      </div>
      <button 
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-green-600"
        onClick={() => setShowForm(true)}
      >
        Create Job Update
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New Job</h3>
            <input 
              type="text" 
              placeholder="Job Title" 
              className="w-full p-2 border rounded mb-2" 
              value={newJob.title} 
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Company Name" 
              className="w-full p-2 border rounded mb-2" 
              value={newJob.company} 
              onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Application Link" 
              className="w-full p-2 border rounded mb-2" 
              value={newJob.link} 
              onChange={(e) => setNewJob({ ...newJob, link: e.target.value })}
            />
            <div className="flex justify-between mt-4">
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={addJob}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;