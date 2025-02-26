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
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar} from '@mui/material';
import axios from 'axios';
import Drawer from '@mui/material/Drawer';

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GroupIcon } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
const NAV_ITEMS = [
  { label: 'Home', icon: <DashboardIcon />, route: "/dashboard/home" },
  { label: "Discussion Forum", icon: <CodeIcon />, subItems: [
      { label: 'Thread', route: "/dashboard/threads" },
    ],
  },
  {
    label: 'Schedules',
    icon: <ListAltIcon />,
    route: "/dashboard/schedules",
  },
  {
    label: 'Clubs',
    icon: <GroupIcon />,
    route: "/dashboard/clubs",
  },
  {
    label: 'Jobs',
    icon: <GroupIcon />,
    route: "/dashboard/jobs",
  }
];

function Dashboard() {
  const user=useSelector((state)=>state.auth.user)
  const [openSubNav, setOpenSubNav] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userData, setUserData] = React.useState({ name: "", email: "", role: "", profilePicture: "" });
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();
  // Fetch user data from backend
  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:7777/api/user'); // Replace with your API endpoint
        setUserData(response.data);
        dispatch(login(response.data));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
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

  const handleItemClick = (label) => {
    setOpenSubNav(openSubNav === label ? null : label);
  };

  const handleSubItemClick = (route) => {
    navigate(route);
    setMobileOpen(false); // Close mobile drawer after navigation
  };

  const handleLogout = () => {
    // Implement logout logic
    console.log('User logged out');
    navigate('/login');
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", ml:4 }}>
      <List sx={{ p: 0, mt: 6 }}>
        {NAV_ITEMS.map((item) => (
          <div key={item.label}>
            <ListItem
              button
              onClick={() => item.subItems ? handleItemClick(item.label) : navigate(item.route)}
              sx={{
                mb: 1,
                cursor: "pointer",
                backgroundColor: location.pathname === item.route ? "#6cc5f5" : "transparent",
                "&:hover": { backgroundColor: "#b2ebf2" },
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
                        backgroundColor: location.pathname === subItem.route ? "#e0f7fa" : "transparent",
                        "&:hover": { backgroundColor: "#b2ebf2" },
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

      {/* Profile Section at Bottom */}
      <Box sx={{ textAlign: "center", p: 2, cursor: "pointer", mt: "auto" }} onClick={() => navigate("/dashboard/profile")}>
        <Divider />
        <Avatar sx={{ width: 56, height: 56, mx: "auto", mt: 2 }} src={userData.profilePicture}>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.role}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Navigation for Larger Screens */}
      {!isMobile && (
        <Box
          component="nav"
          sx={{
            width: 280,
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            background: "linear-gradient(to right, #0284C7, #0284C7)",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
          }}
        >
          {drawerContent}
        </Box>
      )}

      {/* Mobile Navbar */}
      {isMobile && (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            backgroundColor: "whitesmoke",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ ml: 2 }}>
              Uniconnect Hub
            </Typography>
          </Box>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      )}

      {/* Mobile Drawer with Sliding Animation */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            background: "linear-gradient(135deg, #87CEEB, #00BFFF)",
            transition: 'transform 0.3s ease-in-out', // Sliding animation
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isMobile ? 0 : "240px",
          overflowY: "auto",
          height: "100vh",
          background: "linear-gradient(to right, #F8FAFC, #F8FAFC)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );

  // return (
  //   <>
  //   <Box sx={{ display: "flex", minHeight: "100vh" }}>

  //     {isMobile ? (
  //       <>
  //         <IconButton sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }} onClick={handleDrawerToggle}>
  //           <MenuIcon />
  //         </IconButton>
  //         <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
  //           {sidebarContent}
  //         </Drawer>
  //       </>
  //     ) : (
  //       <Box component="nav" sx={{ width: 240, flexShrink: 0, position: "fixed", top: 0, left: 0 }}>{sidebarContent}</Box>
  //     )}
  //     <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: isMobile ? 0 : "240px", overflowY: "auto", height: "100vh" }}>
  //       <Outlet />
  //     </Box>
  //   </Box> 
  //   </>
  // );
}

export default Dashboard;