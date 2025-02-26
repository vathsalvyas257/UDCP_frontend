import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';

const NAV_ITEMS = [
  { label: 'Home', icon: <DashboardIcon />, route: "/dashboard" },
  { label: 'Chat Rooms', icon: <BugReportIcon />, subItems: [
      { label: 'Debug Code', route: "/dashboard/debug" },
      { label: 'Optimization History', route: "/dashboard/history" },
    ]},
  { label: "Discussion Forum", icon: <CodeIcon />, subItems: [
      { label: 'Optimize Code', route: "/dashboard/optimize" },
      { label: 'Language Conversion', route: "/dashboard/convert" },
    ]},
  { label: 'Schedules', icon: <ListAltIcon />, route: "/dashboard/schedules" },
  { label: 'Chatbot', icon: <ListAltIcon />, route: "/dashboard/chatbot" },
];

function Dashboard() {
  const [openSubNav, setOpenSubNav] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (label) => {
    setOpenSubNav(openSubNav === label ? null : label);
  };

  const handleSubItemClick = (route) => {
    navigate(route);
    setOpenSubNav(null);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.chatbase.co/embed.min.js";
  script.id = "kyTSjERga5ap-ZlkxZ5X7";
  script.domain = "www.chatbase.co";
  script.async = true;

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script); // Cleanup on unmount
  };
}, []);


  const sidebarContent = (
    <Box
      sx={{ width: 240, height: "100vh", backgroundColor: "whitesmoke", p: 2, display: "flex", flexDirection: "column", justifyContent: "space-between", overflowY: "auto" }}
    >
      <Box>
        <Divider />
        <List sx={{ p: 0, mt: 6 }}>
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              <ListItem
                button
                onClick={() => item.subItems ? handleItemClick(item.label) : navigate(item.route)}
                sx={{ mb: 1, cursor: "pointer", backgroundColor: location.pathname === item.route ? "#ddd" : "transparent", "&:hover": { backgroundColor: "#e0e0e0" } }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
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
                        sx={{ pl: 4, cursor: "pointer", backgroundColor: location.pathname === subItem.route ? "#ddd" : "transparent", "&:hover": { backgroundColor: "#e0e0e0" } }}
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
      <Box sx={{ textAlign: "center", p: 2, cursor: "pointer" }} onClick={() => navigate("/dashboard/profile")}>
        <Divider />
        <Avatar sx={{ width: 56, height: 56, mx: "auto", mt: 2 }}>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>User Name</Typography>
        <Typography variant="body2" color="textSecondary">user@example.com</Typography>
      </Box>
    </Box>
  );

  return (
    <>
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      {isMobile ? (
        <>
          <IconButton sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Box component="nav" sx={{ width: 240, flexShrink: 0, position: "fixed", top: 0, left: 0 }}>{sidebarContent}</Box>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: isMobile ? 0 : "240px", overflowY: "auto", height: "100vh" }}>
        <Outlet />
      </Box>
    </Box> 
    </>
  );
}

export default Dashboard;