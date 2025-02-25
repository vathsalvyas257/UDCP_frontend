import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <Paper id="contact" component="footer" sx={{ mt: 8, py: 5, backgroundColor: "#1a1a1a", color: "#ffffff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="center">
          
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              University Department
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#b0b0b0" }}>
              Discover and explore information about our university departments, including academic programs, research initiatives, and student services.
            </Typography>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Resources
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {["Library", "Admissions", "Events", "Career Services"].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/\s/g, "")}`} 
                    underline="none" 
                    sx={{ color: "#b0b0b0", "&:hover": { color: "#ffffff" } }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
              123 University Ave, City, State, 12345
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#b0b0b0" }}>
              Phone: (123) 456-7890
            </Typography>
            <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
              Email: info@university.edu
            </Typography>
            
            {/* Social Icons */}
            <Box sx={{ display: "flex", mt: 2 }}>
              {[
                { icon: faFacebookF, link: "https://facebook.com" },
                { icon: faTwitter, link: "https://twitter.com" },
                { icon: faLinkedinIn, link: "https://linkedin.com" },
              ].map(({ icon, link }, index) => (
                <IconButton
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "#b0b0b0", transition: "color 0.3s", "&:hover": { color: "#ffffff" } }}
                >
                  <FontAwesomeIcon icon={icon} size="lg" />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Campus Map */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Campus Map
            </Typography>
            <Box sx={{ mt: 1, borderRadius: "8px", overflow: "hidden" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.587454063622!2d78.5373096737276!3d14.335379686120072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb3a3138e2593b9%3A0x98992fa5d3002a97!2sDEPARTMENT%20OF%20COMPUTER%20SCIENCE%20AND%20ENGINEERING%2C%20RGUKT%20RK%20VALLEY!5e0!3m2!1sen!2sin!4v1732985023829!5m2!1sen!2sin"
                title="campus map"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ textAlign: "center", mt: 5, color: "#b0b0b0" }}>
          &copy; {new Date().getFullYear()} Tech Alchemists - Aadhya2k25. All rights reserved.
        </Box>
      </Container>
    </Paper>
  );
};

export default Footer;