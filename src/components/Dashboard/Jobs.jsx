import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, TextField, Divider } from "@mui/material";
import { keyframes } from "@emotion/react";

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

// Job-related icon (replace with your own image URL or icon)
const jobIcon = "https://cdn-icons-png.flaticon.com/512/3135/3135810.png";

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
    <Box
      sx={{
        p: 4,
        mt: 6,
        minHeight: "100vh",
        backgroundColor: "#f0f8ff", // Light sky blue background for the entire page
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header with Job-Related Icon */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", animation: `${fadeIn} 1s ease-out`, mr: 2 }}>
          Job Updates
        </Typography>
        <Box
          component="img"
          src={jobIcon}
          alt="Job Icon"
          sx={{
            width: "40px",
            height: "40px",
            animation: `${float} 6s ease-in-out infinite`,
          }}
        />
      </Box>

      <Divider sx={{ mb: 2, borderColor: "#e0e0e0" }} />

      {/* Job Listings */}
      <Box sx={{ maxWidth: "800px", mx: "auto" }}>
        {jobs.map((job, index) => (
          <Card
            key={job.id}
            sx={{
              mb: 2,
              p: 2,
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              animation: `${fadeIn} 0.5s ease-out ${index * 0.2}s`,
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                transform: "scale(1.03)",
              },
              transition: "0.3s",
            }}
          >
            <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6" sx={{ color: "#1976d2" }}>
                  {job.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#757575" }}>
                  {job.company}
                </Typography>
              </Box>
              <Button
                variant="contained"
                href={job.link}
                target="_blank"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Job Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
          onClick={() => setShowForm(true)}
        >
          Create Job Update
        </Button>
      </Box>

      {/* Slide-In Job Form */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "400px",
          bgcolor: "#e6f7ff", // Light sky blue background for the form
          boxShadow: "0 0 24px rgba(0, 0, 0, 0.2)",
          transform: showForm ? "translateX(0)" : "translateX(100%)",
          animation: `${showForm ? slideIn : slideOut} 0.5s ease-in-out`,
          transition: "transform 0.5s ease-in-out",
          zIndex: 1000,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
          Add New Job
        </Typography>
        <TextField
          fullWidth
          label="Job Title"
          variant="outlined"
          sx={{ mb: 2, backgroundColor: "#fff" }} // White background for input fields
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          sx={{ mb: 2, backgroundColor: "#fff" }} // White background for input fields
          value={newJob.company}
          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
        />
        <TextField
          fullWidth
          label="Application Link"
          variant="outlined"
          sx={{ mb: 2, backgroundColor: "#fff" }} // White background for input fields
          value={newJob.link}
          onChange={(e) => setNewJob({ ...newJob, link: e.target.value })}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{ color: "#1976d2", borderColor: "#1976d2" }}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1976d2", color: "#fff" }}
            onClick={addJob}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Jobs;