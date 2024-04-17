import React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import UsersIcon from "@mui/icons-material/People";
import {  Dialog,  DialogContent, DialogTitle, ListItemButton } from "@mui/material";
import RoomsIcon from "@mui/icons-material/Hotel";
import AdsIcon from "@mui/icons-material/LocalOffer";
import BookingsIcon from "@mui/icons-material/Event";
import FacilitiesIcon from "@mui/icons-material/LocationCity";
import ChangePasswordIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import ChangePassword from "../../../AuthModule/Components/ChangePassword/ChangePassword";
<<<<<<< HEAD
// import { Link } from "@mui/icons-material";
=======
>>>>>>> Ads/UserList
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
//  open close SideBar ///////////////
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
////////////////////////////////////
const handleClickOpenDialog = () => {
  setOpenDialog(true);
};

const handleCloseDialog = () => {
  setOpenDialog(false);
};



  return (
    // Modal Dialog for change Password 
  
    <>
      <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"change Password "}
    </DialogTitle>
    <DialogContent>
      <ChangePassword handleCloseDialog ={handleCloseDialog}/>
    
    </DialogContent>

  </Dialog>

    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{ "& .MuiDrawer-paper": { backgroundColor: "blue" } }} >
        <DrawerHeader>
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon sx={{color : "white" }} />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon  sx={{color : "white" }}/>
            </IconButton>
          )}
        </DrawerHeader>

        <List >
          <ListItemButton  sx={{color : "white" }}  >
            <ListItemIcon>
              <IconButton>
                <HomeIcon  sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Home" sx={{color : "white" }} />
          </ListItemButton>
          <ListItemButton component={Link} to="UserList">
            <ListItemIcon>
              <IconButton>
                <UsersIcon  sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Users" sx={{color : "white" }}/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton>
              <RoomsIcon  sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Rooms" sx={{color : "white" }}/>
          </ListItemButton>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <IconButton>
              <AdsIcon sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Ads"  sx={{color : "white" }}/>
          </ListItemButton>
          <ListItemButton >
            <ListItemIcon>
              <IconButton>
              <BookingsIcon sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Bookings" sx={{color : "white" }}/>
          </ListItemButton>
          <ListItemButton  component={Link} to="facilitiesList">
            <ListItemIcon>
              <IconButton>
              <FacilitiesIcon  sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Facilities"  sx={{color : "white" }}/>
          </ListItemButton>
          <ListItemButton onClick={ ()=>{handleClickOpenDialog()}}>
            <ListItemIcon>
              <IconButton >
              <ChangePasswordIcon sx={{color : "white" }} />
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Change Password"  sx={{color : "white" }}/>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton>
              <LogoutIcon sx={{color : "white" }}/>
              </IconButton>
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{color : "white" }} />
          </ListItemButton>
          
        </List>
      </Drawer>
    </Box>

    </>
  );
}
