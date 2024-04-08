import  React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
// /////////////////////
import styles from "./NavBar.module.css";
import logo from "../../../assets/images/Staycation.png";
import { AuthContext, IAuth } from "../../../Context/Components/AuthContext";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Navbar(props: Props) {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }

  const { loginData } = authContext;


  const drawerWidth = 240;
  const navItems = ["Home", "Explore", "Reviews", "Favorites"];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={logo}  />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
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
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img src={logo} className={styles.logoimg} />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link
                style={{ color: "#3252DF" }}
                className={styles.linkStyle}
                to="/user/home"
              >
                Home
              </Link>
              <Link
                style={{ color: "#3252DF" }}
                className={styles.linkStyle}
                to="/user/home"
              >
                Explore
              </Link>
              <Link
                style={{ color: "#3252DF" }}
                className={styles.linkStyle}
                to="/user/home"
              >
                Reviews
              </Link>

              <Link
               
                to="/login"
              >
                {!loginData?
                 <Button
                 className={styles.bottom}
                 sx={{ bgcolor: "primary" }}
                 color={"inherit"}
               >
                 Login Now
               </Button>
                :""}
              
              </Link>
              {/* <Button
                className={styles.bottom}
                sx={{ bgcolor: "primary" }}
                color={"inherit"}
              >
                Login Now */}
              {/* </Button> */}
              {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} */}
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
