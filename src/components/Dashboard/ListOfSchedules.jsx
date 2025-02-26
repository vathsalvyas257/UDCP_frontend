import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import ScheduleUpload from "./ScheduleUpload";

const ListOfSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false); // Toggle between views

//   const token = Cookies.get("token"); // Check if token exists
    const isStudent = false;
  useEffect(() => {
    setTimeout(() => {
      setSchedules([
        {
          name: "Schedule 1",
          description: "Short description about schedule 1.",
          pdfUrl: "https://example.com/schedule1.pdf",
        },
        {
          name: "Schedule 2",
          description: "Short description about schedule 2.",
          pdfUrl: "https://example.com/schedule2.pdf",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box p={3} className="mt-16">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3" gutterBottom>
          Updates
        </Typography>

        {/* Toggle between Upload and List View */}
        {!isStudent && (
          <Button 
            variant="contained" 
            color={showUpload ? "primary" : "secondary"} 
            onClick={() => setShowUpload(!showUpload)} // Toggle view
          >
            {showUpload ? "Back to List" : "Upload Schedule"}
          </Button>
        )}
      </Box>

      {/* Toggle Between Upload Component & List */}
      {showUpload ? (
        <ScheduleUpload />
      ) : loading ? (
        <CircularProgress />
      ) : schedules.length === 0 ? (
        <Typography>No schedules available.</Typography>
      ) : (
        schedules.map((schedule, index) => (
          <Paper
            key={index}
            sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <Box>
              <Typography variant="h5">{schedule.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {schedule.description}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={() => window.open(schedule.pdfUrl, "_blank")}>
              View PDF
            </Button>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default ListOfSchedules;