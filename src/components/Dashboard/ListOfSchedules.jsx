import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import axios from "axios";

const ListOfSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API response (Remove this if using a real API)
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
        {
            name: "Schedule 2",
            description: "Short description about schedule 2.",
            pdfUrl: "https://example.com/schedule2.pdf",
          },{
            name: "Schedule 2",
            description: "Short description about schedule 2.",
            pdfUrl: "https://example.com/schedule2.pdf",
          },{
            name: "Schedule 2",
            description: "Short description about schedule 2.",
            pdfUrl: "https://example.com/schedule2.pdf",
          },{
            name: "Schedule 2",
            description: "Short description about schedule 2.",
            pdfUrl: "https://example.com/schedule2.pdf",
          },{
            name: "Schedule 2",
            description: "Short description about schedule 2.",
            pdfUrl: "https://example.com/schedule2.pdf",
          },{
            name: "Schedule 2",
            description: "Short description about schedule 2.",
            pdfUrl: "https://example.com/schedule2.pdf",
          },
      ]);
      setLoading(false);
    }, 1000);

    // Uncomment if using an actual API
    // axios.get("https://your-backend-api.com/schedules")
    //   .then((response) => {
    //     setSchedules(response.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching schedules:", error);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <Box p={3} className="mt-16">
      <Typography variant="h3" gutterBottom>
        Updates
      </Typography>

      {loading ? (
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