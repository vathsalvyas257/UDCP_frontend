import React from "react";
import { Box, Typography, Avatar, Paper, Divider, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import Cookies from "js-cookie";

const ProfilePage = () => {

    const handleLogout = async () => {
        try {
          const response = await axios.post("http://localhost:7777/api/auth/logout", {}, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response) {
            console.log('Logged out successfully:');
            dispatch(logout()); // Dispatch the logout action
            navigate("/auth");
          } else {
            console.log('Error logging out:');
          }
        } catch (err) {
          console.error('Logout Error:', err);
        }
      };

    // Get user token from cookies

  const userData = Cookies.get("token");

  // Decode JWT (assuming it's a JSON Web Token)
  const user = userData ? JSON.parse(atob(userData.split(".")[1])) : null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper
        sx={{
          p: 4,
          width: 450,
          textAlign: "center",
          boxShadow: 5,
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Profile Picture Section */}
        <Avatar sx={{ width: 90, height: 90, mx: "auto", mb: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 80 }} />
        </Avatar>
        
        {/* Name & Email */}
        <Typography variant="h4" fontWeight="bold">
          {user?.name || "John Doe"}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user?.email || "johndoe@example.com"}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Profile Details */}
        <Box sx={{ textAlign: "left", px: 3 }}>
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
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
          <Button variant="contained" color="primary" startIcon={<EditIcon />}>
            Edit Profile
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;