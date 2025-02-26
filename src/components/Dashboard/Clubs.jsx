import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";

// Sample clubs data (You can fetch from an API or database)
const clubs = [
  {
    id: 1,
    name: "Coding Club",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoXSfbQM_YIY3WQdk04pLfV3VScNvAw4t4tQ&s", // Replace with actual logo URL
    description: "A club for coding enthusiasts to learn and build projects.",
    coordinators: ["Alice", "Bob"],
  },
  {
    id: 2,
    name: "Green Club",
    logo: "https://res.cloudinary.com/highereducation/images/v1663943062/BestColleges.com/college-student-participating-in-a-club_4835015b70/college-student-participating-in-a-club_4835015b70.jpg",
    description: "A club focused on robotics and automation projects.Student registrations are available you can register now!",
    coordinators: ["Charlie", "David"],
  },
  {
    id: 3,
    name: "AI & ML Club",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSetQ9JADhl-zZj5v_3POrjGuKqAbXZdYpCEA&s",
    description: "A club for AI and Machine Learning enthusiasts.",
    coordinators: ["Eve", "Frank"],
  },
];

const Clubs = () => {
  return (
    <Box sx={{ p: 4, mt:6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Our Clubs
      </Typography>
      <Grid container spacing={3}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id}>
            <Card sx={{ maxWidth: 345, mx: "auto", boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={club.logo}
                alt={club.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {club.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {club.description}
                </Typography>
                <Typography variant="subtitle2" color="primary" mt={1}>
                  Coordinators: {club.coordinators.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Clubs;