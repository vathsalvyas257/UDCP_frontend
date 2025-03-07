import React, { useState } from "react";
import { Box, Typography, Button, Paper, TextField, Backdrop } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import CubeLoader from "../loaders/CubeLoader"; // Import the CubeLoader component

const ScheduleUpload = ({ showUpload, setShowUpload }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("token");

  const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
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
    setLoading(true);
    if (!file || !fileName.trim() || !description.trim()) {
      alert("Please fill in all fields and select a file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file); // Match backend expected field
    formData.append("filename", fileName); // Match backend expected field
    formData.append("description", description);
    console.log(formData);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/schedule`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File uploaded successfully!");
      setFile(null);
      setFileName("");
      setDescription("");
      setShowUpload(false);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Loader Overlay */}
      <Backdrop
        open={loading}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backdropFilter: "blur(1px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CubeLoader /> {/* Show CubeLoader when loading */}
      </Backdrop>

      {/* Upload Form */}
      <Paper sx={{ p: 3, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#" }}>
        <Typography variant="h5" gutterBottom>
          Upload New Schedule
        </Typography>

        <TextField
          label="File Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            height: "150px",
            border: `2px dashed ${dragActive ? "blue" : "gray"}`,
            borderRadius: "10px",
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
            {file ? file.name : "Drop a PDF/XLSX or Click to Select"}
          </Typography>
        </Box>

        <input
          id="file-input"
          type="file"
          accept=".pdf, .xlsx"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || !fileName.trim() || !description.trim() || loading}
        >
          {loading ? "Uploading..." : "Upload"} {/* Show text when loading */}
        </Button>
      </Paper>
    </Box>
  );
};

export default ScheduleUpload;