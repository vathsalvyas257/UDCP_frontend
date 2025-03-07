import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardMedia, Typography,
  Grid, Box, Button, Modal, TextField, Snackbar, Alert, CircularProgress, Skeleton
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import CubeLoader from "../loaders/CubeLoader"; // Import the CubeLoader component

// Backend API URL
const API_URL = "http://localhost:7777/club";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClub, setNewClub] = useState({ name: "", logo: null, description: "", facultyCoordinator: "", studentCoordinator: "" });
  const [successMsg, setSuccessMsg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [imageUploaded, setImageUploaded] = useState(false); // State for image upload confirmation
  const [loading, setLoading] = useState(true); // State for loading clubs
  const [creatingClub, setCreatingClub] = useState(false); // State for creating club loading

  useEffect(() => {
    fetchClubs();
  }, [clubs]);

  // Fetch clubs from backend
  const fetchClubs = async () => {
    try {
      const response = await axios.get(API_URL);
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImagePreview(null); // Reset image preview on modal close
    setImageUploaded(false); // Reset image upload confirmation
  };

  const handleChange = (e) => {
    setNewClub({ ...newClub, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewClub({ ...newClub, logo: file });

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageUploaded(true); // Set image upload confirmation
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreatingClub(true); // Start loading

    const formData = new FormData();
    formData.append("name", newClub.name);
    formData.append("description", newClub.description);
    formData.append("facultyCoordinator", newClub.facultyCoordinator);
    formData.append("studentCoordinator", newClub.studentCoordinator);
    formData.append("logo", newClub.logo);

    try {
      await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg(true);
      handleClose(); // Close the modal
      fetchClubs(); // Refresh the club list

      // Reset form and image preview
      setNewClub({ name: "", logo: null, description: "", facultyCoordinator: "", studentCoordinator: "" });
      setImagePreview(null);
      setImageUploaded(false);
    } catch (error) {
      console.error("Error creating club:", error);
    } finally {
      setCreatingClub(false); // Stop loading
    }
  };

  return (
    <Box sx={{ p: 4, mt: 6, ml: 4 }}>
      {/* Title + Create Club Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Our Clubs</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Club
        </Button>
      </Box>

      {/* Loader */}
      {loading ? (
        // Skeleton Loading
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345, mx: "auto", boxShadow: 3, borderRadius: 2, backgroundColor: "#CAF0F8", height: 400 }}>
                <Skeleton variant="rectangular" width="100%" height="60%" />
                <CardContent sx={{ height: "40%" }}>
                  <Skeleton variant="text" width="80%" height={30} />
                  <Skeleton variant="text" width="100%" height={60} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {clubs.map((club) => (
            <Grid item xs={12} sm={6} md={4} key={club.id}>
              <Card sx={{ maxWidth: 345, mx: "auto", boxShadow: 3, borderRadius: 2, backgroundColor: "#CAF0F8", height: 400 }}>
                {/* Image (60% of card height) */}
                <CardMedia
                  component="img"
                  sx={{ height: "60%", objectFit: "cover" }} // Ensure the image covers the area
                  image={`${club.logo}`}
                  alt={club.name}
                />
                {/* Text (40% of card height) */}
                <CardContent sx={{ height: "40%", overflow: "auto" }}>
                  <Typography variant="h6" gutterBottom sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {club.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {club.description}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    Faculty: {club.facultyCoordinator}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    Student: {club.studentCoordinator}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Club Modal */}
      <AnimatePresence>
        {open && (
          <Modal open={open} onClose={handleClose} aria-labelledby="add-club-modal">
            <Box sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              overflow: "hidden",
              filter: creatingClub ? "blur(1px)" : "none", // Blur the modal when loading
            }}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ padding: 20 }}
              >
                <Typography id="add-club-modal" variant="h6" gutterBottom>
                  Create a New Club
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField fullWidth margin="dense" label="Club Name" name="name" value={newClub.name} onChange={handleChange} required />
                  <TextField fullWidth margin="dense" label="Description" name="description" value={newClub.description} onChange={handleChange} multiline rows={3} required />
                  <TextField fullWidth margin="dense" label="Faculty Coordinator" name="facultyCoordinator" value={newClub.facultyCoordinator} onChange={handleChange} required />
                  <TextField fullWidth margin="dense" label="Student Coordinator" name="studentCoordinator" value={newClub.studentCoordinator} onChange={handleChange} required />
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="upload-logo" />
                    <label htmlFor="upload-logo">
                      <Button component="span" variant="outlined" startIcon={<UploadFileIcon />}>Upload Logo</Button>
                    </label>
                  </Box>
                  {/* Image Preview and Upload Confirmation */}
                  {imagePreview && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <img src={imagePreview} alt="Logo Preview" style={{ maxWidth: "50%", maxHeight: 50, borderRadius: 8 }} />
                      {imageUploaded && (
                        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                          Image uploaded successfully!
                        </Typography>
                      )}
                    </Box>
                  )}
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">Create</Button>
                  </Box>
                </form>
              </motion.div>
              {/* CubeLoader overlay */}
              {creatingClub && (
                <Box sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                }}>
                  <CubeLoader />
                </Box>
              )}
            </Box>
          </Modal>
        )}
      </AnimatePresence>

      {/* Success Snackbar */}
      <Snackbar open={successMsg} autoHideDuration={3000} onClose={() => setSuccessMsg(false)}>
        <Alert onClose={() => setSuccessMsg(false)} severity="success" sx={{ width: "100%" }}>
          Club created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Clubs;