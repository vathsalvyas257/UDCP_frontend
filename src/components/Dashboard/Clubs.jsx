import React, { useState, useEffect } from "react";
import {
  Card, CardContent, CardMedia, Typography,
  Grid, Box, Button, Modal, TextField, Snackbar, Alert
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:7777/club";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [open, setOpen] = useState(false);
  const [newClub, setNewClub] = useState({ name: "", logo: null, description: "", facultyCoordinator: "", studentCoordinator: "" });
  const [successMsg, setSuccessMsg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [imageUploaded, setImageUploaded] = useState(false); // State for image upload confirmation

  useEffect(() => {
    fetchClubs();
  }, []);

  // Fetch clubs from backend
  const fetchClubs = async () => {
    try {
      const response = await axios.get(API_URL);
      setClubs(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
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
      setOpen(false);
      fetchClubs(); // Refresh club list

      // Reset form and image preview
      setNewClub({ name: "", logo: null, description: "", facultyCoordinator: "", studentCoordinator: "" });
      setImagePreview(null);
      setImageUploaded(false);
    } catch (error) {
      console.error("Error creating club:", error);
    }
  };

  return (
    <Box sx={{ p: 4, mt: 6, ml:4 }}>
      {/* Title + Create Club Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">Our Clubs</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Club
        </Button>
      </Box>

      <Grid container spacing={3}>
        {clubs.map((club) => (
          <Grid item xs={12} sm={6} md={4} key={club.id } >
            <Card sx={{ maxWidth: 345, mx: "auto", boxShadow: 3, borderRadius: 2, backgroundColor:"#CAF0F8" }}>
              <CardMedia component="img" height="140" image={`${club.logo}`} alt={club.name} />
              <CardContent>
                <Typography variant="h6" gutterBottom>{club.name}</Typography>
                <Typography variant="body2" color="text.secondary">{club.description}</Typography>
                <Typography variant="subtitle2" color="primary" mt={1}>Faculty: {club.facultyCoordinator}</Typography>
                <Typography variant="subtitle2" color="primary">Student: {club.studentCoordinator}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              overflow: "hidden"
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