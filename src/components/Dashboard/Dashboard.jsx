import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Collapse, useMediaQuery } from '@mui/material';
import { ExpandLess, ExpandMore, Dashboard as DashboardIcon, BugReport as BugReportIcon, Code as CodeIcon, ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', icon: <DashboardIcon />, route: "/dashboard" },
  { label: 'Chat Rooms', icon: <BugReportIcon />, subItems: [{ label: 'Debug Code', route: "/dashboard/debug" }, { label: 'Optimization History', route: "/dashboard/history" }] },
  { label: "Discussion Forum", icon: <CodeIcon />, subItems: [{ label: 'Optimize Code', route: "/dashboard/optimize" }, { label: 'Language Conversion', route: "/dashboard/convert" }] },
  { label: 'Schedules', icon: <ListAltIcon />, route: "/dashboard/schedules" },
];

function Dashboard() {
  const [openSubNav, setOpenSubNav] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('/api/auth/user', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  const handleItemClick = (label) => setOpenSubNav(openSubNav === label ? null : label);
  const handleSubItemClick = (route) => { navigate(route); setOpenSubNav(null); };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Box
          component="nav"
          sx={{
            width: 260,
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            background: "linear-gradient(to bottom, #64b5f6, #1e88e5)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
            color: "white"
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>AI Resume Analyzer</Typography>
            <Divider sx={{ mb: 2, bgcolor: "white" }} />
            <List>
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <ListItem
                    button
                    onClick={() => item.subItems ? handleItemClick(item.label) : navigate(item.route)}
                    sx={{
                      mb: 1,
                      cursor: "pointer",
                      backgroundColor: location.pathname === item.route ? "rgba(255, 255, 255, 0.3)" : "transparent",
                      borderRadius: "8px",
                      '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                      color: "white"
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                    {item.subItems ? (openSubNav === item.label ? <ExpandLess /> : <ExpandMore />) : null}
                  </ListItem>
                  {item.subItems && (
                    <Collapse in={openSubNav === item.label} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem) => (
                          <ListItem
                            button
                            key={subItem.label}
                            onClick={() => handleSubItemClick(subItem.route)}
                            sx={{
                              pl: 4,
                              cursor: "pointer",
                              backgroundColor: location.pathname === subItem.route ? "rgba(255, 255, 255, 0.3)" : "transparent",
                              '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                              color: "white"
                            }}
                          >
                            <ListItemText primary={subItem.label} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>
          </Box>
          {user && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Divider sx={{ mb: 2, bgcolor: "white" }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar src={user.image || '/default-avatar.png'} alt={user.name} sx={{ width: 48, height: 48, border: "2px solid white" }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">{user.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#e3f2fd" }}>{user.role}</Typography>
                </Box>
              </Box>
            </motion.div>
          )}
        </Box>
      </motion.div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "260px",
          backgroundColor: "#f5f5f5",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;