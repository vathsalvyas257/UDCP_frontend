import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";

const ScheduleUpload = () => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const token = Cookies.get("token"); // Get authentication token

  const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]; // PDF & XLSX

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError("");
      } else {
        setError("Invalid file type. Please upload a PDF or XLSX.");
        setFile(null);
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    
    const droppedFile = event.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("https://your-backend-api.com/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  // Show upload section only if the user is authenticated
//   if (!token) return null;

  return (
    <Paper sx={{ p: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" gutterBottom>
        Upload New Schedule
      </Typography>

      {/* Drag & Drop File Input */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          height: "150px",
          border: `2px dashed ${dragActive ? "blue" : "gray"}`,
          borderRadius:'10px',
          backgroundColor: dragActive ? "#e3f2fd" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          mb: 2,
          transition: "all 0.3s ease-in-out",
        }}
        onClick={() => document.getElementById("file-input").click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Typography variant="body1" sx={{ color: dragActive ? "blue" : "black" }}>
          {file ? file.name : "Drag & Drop a PDF/XLSX or Click to Select"}
        </Typography>
      </Box>

      <input
        id="file-input"
        type="file"
        accept=".pdf, .xlsx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Error Message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Upload Button */}
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={!file}>
        Upload
      </Button>
    </Paper>
  );
};

export default ScheduleUpload;