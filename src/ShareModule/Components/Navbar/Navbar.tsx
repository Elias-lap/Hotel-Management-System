import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
// import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";

// /////////////////////
import { AuthContext } from "../../../Context/Components/AuthContext";
import logo from "../../../assets/images/Staycation.png";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Navbar(props: Props) {

  

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const drawerWidth = 240;
  // const navItems = ["Home", "Explore", "Reviews", "Favorites"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { loginData } = authContext;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 5 }}>
        <img src={logo} />
      </Typography>
      <Divider />
      <Box>
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <Box sx={{ display: { xs: "flex",flexDirection:"column", sm: "block" } }} >
            <Link to="/user/explore"> Home</Link>
            <Link to="/user/explore"> Explore</Link>
            <Link to="/user/explore"> Favorites</Link>
          
          {/* <Link  underline="hover" color="common.black" mb={2}>
            Home
          </Link>
          <Link href="#" underline="hover" color="common.black"  mb={2}>
            Explore
          </Link>
          <Link href="#" underline="hover" color="common.black"  mb={2}>
            Reviews
          </Link> */}
          {loginData ? (
            <Button
              onClick={logOut}
             
              sx={{ p:1, width:"50%", m:"auto" ,alignItems:"center",  backgroundColor: "primary.dark", color: "common.black", }}
             
            >
              Log Out
            </Button>
          ) : (
            <Button
              onClick={logOut}
              sx={{ p:1, width:"50%", m:"auto" ,alignItems:"center",  backgroundColor: "primary.dark", color: "common.black", }}
             
              color={"inherit"}
            >
              Login Now
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex",  width:"100%"}}>
        <CssBaseline />
        <AppBar component="nav" className={styles.nav}>
          <Toolbar>
            <IconButton
              color={"primary"}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block"  } }}
            >
              <img src={logo} className={styles.logoimg} />
            </Typography>
            <Box sx={{"& a":{marginLeft:"10px",color:"common.black" ,textDecoration:"none"}, display: { xs: "none", sm: "block" } ,"& a:hover":{textDecoration:"underline"}}}>
            <Link to="/user/landing"> Home</Link>
            <Link to="/user/explore"> Explore</Link>
            <Link to="/user/Favorites"> Favorites</Link>
              {/* <Link href="#" underline="hover" color="common.black" ml={2}>
                Home
              </Link>
              <Link href="#" underline="hover" color="common.black" ml={2}>
                Explore
              </Link>
              <Link href="#" underline="hover" color="common.black" ml={2}>
                Reviews
              </Link> */}
              {loginData ? (
                <Button
                  className={styles.linkStyle}
                  onClick={logOut}
                  sx={{
                    color: "common.black",
                    backgroundColor: "primary.dark",
                    marginLeft: "30px",
                  }}
                  color={"inherit"}
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  className={styles.linkStyle}
                  onClick={logOut}
                  sx={{
                    color: "common.black",
                    backgroundColor: "primary.dark",
                    marginLeft: "30px",
                  }}
                  color={"inherit"}
                >
                  Login Now
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </>
  );
}
