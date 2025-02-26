import React from "react";
import { Box, Typography, Card, CardContent, Grid, Paper, Divider } from "@mui/material";
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

const scaleUp = keyframes`
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const announcements = [
  { title: "Hackathon 2025", date: "March 15, 2025", description: "Join our annual Hackathon and showcase your skills!" },
  { title: "Placement Drive", date: "April 10, 2025", description: "Top companies visiting for campus placements. Register now!" },
  { title: "AI Workshop", date: "April 25, 2025", description: "Hands-on session on AI and ML. Don't miss it!" },
];

const Homepage = () => {
  return (
    <Box sx={{ p: 4, mt: 6 }}>
      {/* College Info Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to RGUKT RK Valley
        </Typography>
        <Typography variant="body1">
          XYZ College is a premier institution committed to excellence in education, innovation, and research.
          Our Computer Science Department focuses on cutting-edge technologies, AI, and modern software development.
        </Typography>
      </Paper>

      {/* Announcements Section */}
      <Typography variant="h4" gutterBottom sx={{ color: "#1976d2", animation: `${fadeIn} 1s ease-out` }}>
        Announcements
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#1976d2" }} />
      <Grid container spacing={3}>
        {announcements.map((announcement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
                animation: `${fadeIn} 0.5s ease-out ${index * 0.2}s`,
                backgroundColor: "#e3f2fd",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#1976d2" }}>
                  {announcement.title}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {announcement.date}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#424242" }}>
                  {announcement.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Homepage;