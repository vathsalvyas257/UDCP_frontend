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

// Import icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import CodeIcon from '@mui/icons-material/Code';
import ListAltIcon from '@mui/icons-material/ListAlt';

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
  },
];

function Dashboard() {
  const [openSubNav, setOpenSubNav] = React.useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const location = useLocation();

  // React.useEffect(() => {
  //   // if (location.pathname === '/dashboard') {
  //   //   navigate('/dashboard/debug', { replace: true });
  //   // }
  // }, [location.pathname, navigate]);

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
      position: "fixed", // Fix sidebar position
      top: 0,
      left: 0,
      backgroundColor: "whitesmoke",
      p: 2,
      display: "flex",
      flexDirection: "column",
      overflowY: "auto", // Allows scrolling inside the sidebar if needed
    }}
  >
    <Typography variant="h6" sx={{ mb: 2 }}>
      AI Resume Analyzer
    </Typography>
    <Divider />
    <List sx={{ p: 0 }}>
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

  {/* Main Content Area */}
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      marginLeft: "240px", // Ensure content does not overlap sidebar
      overflowY: "auto",
      height: "100vh", // Allow content to scroll
    }}
  >
    <Outlet />
  </Box>
</Box>

  );
}

export default Dashboard;