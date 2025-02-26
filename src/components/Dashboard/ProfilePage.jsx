import React from "react";
import { Box, Typography, Avatar, Paper, Divider, Button, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";
import { motion } from "framer-motion"; // Import motion from framer-motion
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice"; // Import the logout action
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user);
  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7777/api/auth/logout",
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response) {
        console.log("Logged out successfully:");
        dispatch(logout()); // Dispatch the logout action
        navigate("/auth");
      } else {
        console.log("Error logging out:");
      }
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  // Get user token from cookies
  const userData = Cookies.get("token");

  // Decode JWT (assuming it's a JSON Web Token)
//   const user = userData ? JSON.parse(atob(userData.split(".")[1])) : null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
        backgroundColor: "#A2D2FF", // Plain white background
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%" }, // Increased width
          textAlign: "center",
          boxShadow: 3,
          borderRadius: "16px",
          backgroundColor: "#ffffff", // Light sky blue background
        }}
      >
        <Grid container spacing={4}>
          {/* Profile Picture Section (Left Side for larger screens, Top for smaller screens) */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 160, // Increased size
                    height: 160, // Increased size
                    mb: 2,
                    backgroundColor: "#87CEEB", // Light blue color
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 140, color: "#ffffff" }} /> {/* Increased size */}
                </Avatar>
                <Typography variant="h5" fontWeight="bold">
                  {user?.name || "John Doe"}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {user?.email || "johndoe@example.com"}
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Profile Details Section (Right Side for larger screens, Bottom for smaller screens) */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Profile Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Role:</strong> {user?.role || "Member"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {user?.phone || "+1234567890"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Organization:</strong> {user?.organization || "ABC Corp"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Address:</strong> {user?.address || "123 Main Street, City, Country"}
                </Typography>
                <Typography variant="body1">
                  <strong>Joined:</strong> {user?.joined || "Jan 2023"}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-around",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  fullWidth
                  sx={{ backgroundColor: "#87CEEB", "&:hover": { backgroundColor: "#6aa8c7" } }} // Light blue color
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogout}
                  fullWidth
                >
                  Logout
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;