import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { motion } from "framer-motion";

const alumniData = [
  {
    name: "John Doe",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7OeXS8D8gsi14ZcKsWCK3p20a2pqNERitw&s",
    job: "Software Engineer at Google",
    package: "$150,000",
    linkedin: "https://www.linkedin.com/in/johndoe",
  },
  {
    name: "Jane Smith",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7OeXS8D8gsi14ZcKsWCK3p20a2pqNERitw&s",
    job: "Data Scientist at Meta",
    package: "$140,000",
    linkedin: "https://www.linkedin.com/in/janesmith",
  },
  {
    name: "Michael Johnson",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo7OeXS8D8gsi14ZcKsWCK3p20a2pqNERitw&s",
    job: "Cloud Architect at Amazon",
    package: "$160,000",
    linkedin: "https://www.linkedin.com/in/michaeljohnson",
  },
];

const Alumni = () => {
  return (
    <Box sx={{ p: 4, mt:3 }}>
      <Typography variant="h4" align="center" gutterBottom  >
        Alumni Success Stories 🎓
      </Typography>
      <Grid container spacing={3} justifyContent="center" className="mt-16">
        {alumniData.map((alumni, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Card
                sx={{
                  maxWidth: 350,
                  mx: "auto",
                  borderRadius: 3,
                  boxShadow: 5,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 10 },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={alumni.photo}
                  alt={alumni.name}
                />
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    {alumni.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <WorkIcon sx={{ mr: 1, color: "blue" }} />
                    <Typography variant="body1">{alumni.job}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <MonetizationOnIcon sx={{ mr: 1, color: "green" }} />
                    <Typography variant="body1">{alumni.package}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<LinkedInIcon />}
                    sx={{ mt: 2, width: "100%", bgcolor: "#0077b5" }}
                    href={alumni.linkedin}
                    target="_blank"
                  >
                    View LinkedIn
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Alumni;
