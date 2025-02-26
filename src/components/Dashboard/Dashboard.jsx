import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Collapse, useMediaQuery } from '@mui/material';
import { ExpandLess, ExpandMore, Dashboard as DashboardIcon, BugReport as BugReportIcon, Code as CodeIcon, ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';

const NAV_ITEMS = [
  {
    label: 'Home',
    icon: <DashboardIcon />,
    route: "/dashboard",
  },
  {
    label: 'Chat Rooms',
    icon: <BugReportIcon />,
    subItems: [
      { label: 'Debug Code', route: "/dashboard/debug" },
      { label: 'Optimization History', route: "/dashboard/history" },
    ],
  },
  {
    label: "Discussion Forum",
    icon: <CodeIcon />,
    subItems: [
      { label: 'Optimize Code', route: "/dashboard/optimize" },
      { label: 'Language Conversion', route: "/dashboard/convert" },
    ],
  },
  {
    label: 'Schedules',
    icon: <ListAltIcon />,
    route: "/dashboard/schedules",
  },{
    label: 'Chatbot',
    icon: <ListAltIcon />,
    route: "/dashboard/chatbot",
  }
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

  const handleItemClick = (label) => {
    setOpenSubNav(openSubNav === label ? null : label);
  };

  const handleSubItemClick = (route) => {
    navigate(route);
    setOpenSubNav(null);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <Box
        component="nav"
        sx={{
          width: 240,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "whitesmoke",
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Push profile section to bottom
          overflowY: "auto",
        }}
      >
        <Box>
          {/* <Typography variant="h6" sx={{ mb: 2, mt:5 }}>
            Dashboard
          </Typography> */}
          <Divider />
          <List sx={{ p: 0, mt:6 }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <ListItem
                  button
                  onClick={() => item.subItems ? handleItemClick(item.label) : navigate(item.route)}
                  sx={{
                    mb: 1,
                    cursor: "pointer",
                    backgroundColor: location.pathname === item.route ? "#ddd" : "transparent",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.subItems ? (openSubNav === item.label ? <ExpandLess /> : <ExpandMore />) : null}
                </ListItem>

                {/* Sub-Menu */}
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
                            backgroundColor: location.pathname === subItem.route ? "#ddd" : "transparent",
                            "&:hover": { backgroundColor: "#e0e0e0" },
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

        {/* Profile Section at Bottom */}
        <Box sx={{ textAlign: "center", p: 2, cursor: "pointer" }} onClick={() => navigate("/dashboard/profile")}>
          <Divider />
          <Avatar sx={{ width: 56, height: 56, mx: "auto", mt: 2 }}>
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            {"User Name"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {"user@example.com"}
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "240px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;