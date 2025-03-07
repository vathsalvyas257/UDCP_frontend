import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  Drawer,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { motion, AnimatePresence } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";

const Alumni = () => {
  const alumniData = [
    {
      name: "Alice Brown",
      photo: "https://www.dice.com/binaries/large/content/gallery/dice/insights/2022/09/shutterstock_2079730714.jpg ",
      job: "AI Researcher at OpenAI",
      package: "$180,000",
      linkedin: "https://www.linkedin.com/in/alicebrown",
    },
    {
      name: "Robert White",
      photo: "https://onlinecs.baylor.edu/sites/default/files/field/image/Future%20of%20Software_Engineering%20%281%29.jpg",
      job: "Full Stack Developer at Netflix",
      package: "$145,000",
      linkedin: "https://www.linkedin.com/in/robertwhite",
    },
   
  ];
  


  const [openSidebar, setOpenSidebar] = useState(false); // State for sidebar
  const [newAlumni, setNewAlumni] = useState({
    name: "",
    photo: "",
    job: "",
    package: "",
    linkedin: "",
  });
  const [successMsg, setSuccessMsg] = useState(false); // State for success message

  // Open sidebar
  const handleOpenSidebar = () => setOpenSidebar(true);

  // Close sidebar
  const handleCloseSidebar = () => {
    setOpenSidebar(false);
    setNewAlumni({ name: "", photo: "", job: "", package: "", linkedin: "" }); // Reset form
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewAlumni({ ...newAlumni, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlumniData([...alumniData, newAlumni]); // Add new alumni to the list
    setSuccessMsg(true); // Show success message
    handleCloseSidebar(); // Close the sidebar
  };

  return (
    <Box sx={{ p: 4, mt: 3 }}>
      {/* Title + Add Alumni Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Alumni Success Stories 🎓
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenSidebar}
          sx={{ bgcolor: "#4CAF50", "&:hover": { bgcolor: "#45a049" } }}
        >
          Add Alumni
        </Button>
      </Box>

      {/* Alumni Cards */}
      <Grid container spacing={3} justifyContent="center">
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
                <CardMedia component="img" height="200" image={alumni.photo} alt={alumni.name} />
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

      {/* Add Alumni Sidebar with Animation */}
      <AnimatePresence>
        {openSidebar && (
          <Drawer anchor="right" open={openSidebar} onClose={handleCloseSidebar}>
            <motion.div
              initial={{ x: "100%" }} // Start from the right
              animate={{ x: 0 }} // Slide in to the center
              exit={{ x: "100%" }} // Slide out to the right
              transition={{ type: "spring", stiffness: 300, damping: 30 }} // Spring animation
              style={{ width: 350, padding: 24 }}
            >
              <Typography variant="h6" gutterBottom>
                Add New Alumni
              </Typography>
              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} // Fade in and slide up
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={newAlumni.name}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Photo URL"
                    name="photo"
                    value={newAlumni.photo}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Job"
                    name="job"
                    value={newAlumni.job}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Package"
                    name="package"
                    value={newAlumni.package}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <TextField
                    fullWidth
                    margin="normal"
                    label="LinkedIn URL"
                    name="linkedin"
                    value={newAlumni.linkedin}
                    onChange={handleChange}
                    required
                  />
                </motion.div>
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  <Button onClick={handleCloseSidebar} sx={{ mr: 1 }}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Add
                  </Button>
                </Box>
              </form>
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>

      {/* Success Snackbar */}
      <Snackbar
        open={successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg(false)}
      >
        <Alert onClose={() => setSuccessMsg(false)} severity="success">
          Alumni added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Alumni;