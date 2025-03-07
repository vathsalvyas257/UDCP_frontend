import React from "react";
import { Box, Typography, Card, CardContent, Grid, Paper, Divider } from "@mui/material";
import { keyframes } from "@emotion/react";
import StatsSection from "./StatsSection";

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
    transform: translateY(-10px);
  }
  100% {
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
    <Box
      sx={{
        p: 4,
        mt: 6,
        minHeight: "100vh",
        backgroundColor: "#f0f8ff", // Light background
      }}
    >
      {/* Featured University Collaboration Photo */}
      <Box
  sx={{
    position: "relative",
    height: "400px",
    overflow: "hidden",
    borderRadius: "12px",
    mb: 4,
    backgroundImage: `url("https://res.cloudinary.com/dcqd5eimb/image/upload/v1740627671/new_ver8cx.jpg ")`, // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: `${fadeIn} 1s ease-out`,
    "&:hover": {
      transform: "scale(1.02)",
      transition: "transform 0.3s ease",
    },
    "&::before": { // Overlay for transparency
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.3)", // Semi-transparent black overlay
      backdropFilter: "blur(2px)", // Slight blur effect
      zIndex: 1,
    },
  }}
>
<Typography
  variant="h2"
  sx={{
    color: "#fff",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
    fontWeight: "bold",
    textAlign: "center",
    animation: `${float} 6s ease-in-out infinite`,
    background: "linear-gradient(#ffffff,white)", // Dark blue to black gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    zIndex: 2, // Ensure text is above the overlay
  }}
>
  Welcome to RGUKT RK Valley
</Typography>
</Box>

      {/* College Info Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: "#fff",
          color: "#1976d2",
          animation: `${fadeIn} 1s ease-out`,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #1976d2, #00bfff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Us
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.6 }}>
          <strong style={{ color: "#1976d2" }}>RGUKT RKV University</strong> is a premier institution committed to{" "}
          <strong style={{ color: "#1976d2" }}>excellence in education, innovation, and research</strong>.
          Our <strong style={{ color: "#1976d2" }}>Computer Science Department</strong> focuses on{" "}
          <strong style={{ color: "#1976d2" }}>cutting-edge technologies, AI, and modern software development</strong>.
        </Typography>
      </Paper>

      {/* Announcements Section */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: "#1976d2",
          animation: `${fadeIn} 1s ease-out`,
          textAlign: "center",
          fontWeight: "bold",
          textShadow: "1px 1px 4px rgba(0, 0, 0, 0.2)",
          background: "linear-gradient(45deg, #1976d2, #00bfff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Announcements
      </Typography>
      <Divider sx={{ mb: 2, borderColor: "#e0e0e0" }} />
      <Grid container spacing={3}>
        {announcements.map((announcement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                  transform: "scale(1.05)",
                },
                animation: `${fadeIn} 0.5s ease-out ${index * 0.2}s, ${float} 6s ease-in-out infinite`,
                backgroundColor: "#fff",
                borderRadius: "12px",
                cursor: "pointer",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #1976d2, #00bfff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {announcement.title}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#757575" }}>
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

      {/* Stats Section */}
      <Box sx={{ mt: 4 }}>
        <StatsSection />
      </Box>
    </Box>
  );
};

export default Homepage;