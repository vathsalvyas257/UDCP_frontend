import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Grid,
  Skeleton,
} from "@mui/material";
import ScheduleUpload from "./ScheduleUpload";

const ListOfSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("http://localhost:7777/schedule")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
        setError("Failed to load schedules. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleViewPDF = (scheduleId) => {
    const pdfUrl = `http://localhost:7777/schedule/${scheduleId}`;
    window.open(pdfUrl, "_blank");
  };

  return (
    <Box p={3} className="mt-16 ml-4">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Typography variant="h4" gutterBottom>
          Updates
        </Typography>

        {isAuthenticated && (user.role === "admin" || user.role === "faculty") && (
          <Button
            variant="contained"
            color={showUpload ? "primary" : "error"}
            onClick={() => setShowUpload(!showUpload)}
          >
            {showUpload ? "Back to List" : "Upload Schedule"}
          </Button>
        )}
      </Box>

      {/* Content Section */}
      {showUpload ? (
        <ScheduleUpload />
      ) : loading ? (
        // Skeleton Loading
        <Grid container spacing={2} mt={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 2, height: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height={120} />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : schedules.length === 0 ? (
        <Typography>No schedules available.</Typography>
      ) : (
        <Grid container spacing={2} mt={2}>
          {schedules.map((schedule, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography variant="h6">{schedule.filename}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {schedule.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleViewPDF(schedule.id)}
                >
                  View PDF
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ListOfSchedules;