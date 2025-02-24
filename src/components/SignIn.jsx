import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Email Field */}
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Field */}
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Sign In Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5 }}
          >
            Sign In
          </Button>
        </Box>

        {/* Additional Links */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>
            Forgot password?
          </a>
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Don't have an account?{" "}
          <a href="#" style={{ color: "#1976d2", textDecoration: "none" }}>
            Sign Up
          </a>
        </Typography>
      </Paper>
    </Container>
  );
}

export default SignIn;