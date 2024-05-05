import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { AuthContext } from "../../../Context/Components/AuthContext";
import img from "../../../assets/images/avatar.png";
import style from "./NavBar.module.css";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../../ChangeLanguage/ChangeLanguage";


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // //////////////////////

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }

  const { loginData, baseUrl } = authContext;
  // console.log(loginData?._id);
  // /////////// user data
  interface IUser {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    profileImage: string;
    country: string;
    createdAt: string;
    role: string;
  }
  const [UserList, setUserList] = React.useState<IUser | null>(null);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const response = await axios.get(
        `${baseUrl}/v0/admin/users/${loginData ? loginData?._id : ""}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response?.data?.data.user);
      setUserList(response?.data?.data?.user);
       localStorage.setItem("userData", JSON.stringify(response.data.data.user));

      
    } catch (error) {
      console.log("ssssssssss");
      // console.log(response?.error);
    }
  };

  // // translate
  const { t, i18n } = useTranslation();
  const directionStyle = i18n.resolvedLanguage;
  // console.log(direction);

  React.useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserList(JSON.parse(storedUserData));
      // console.log(storedUserData);
      
    } else {
      fetchData(); // Fetch data if not stored
    }
  }, []);

 
  return (
    <>
      <AppBar
        position="static"
        className={style.nav}
        sx={{ backgroundColor: "red" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex", color:"red" }, mr: 1 }} /> */}

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <h4 className={style.hlogo}>
                Stay<span className={style.logo}>cation</span>
              </h4>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="info"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
                <Box
                  sx={{
                    "& a": { color: "common.black", textDecoration: "none" },
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    mt: 2,
                    "& a:hover": { textDecoration: "underline" },
                  }}
                >
                  <Link to="/landing"> {t("main.navLink1")}</Link>
                  <Link to="/explore"> {t("main.navLink2")}</Link>
                  <Link to="/Favorites"> {t("main.navLink3")}</Link>
                </Box>
              </Menu>
            </Box>

            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <h6 className={style.hlogo}>
                Stay<span className={style.logo}>cation</span>
              </h6>
            </Typography>
            <Box
              sx={{
                "& a": { color: "common.black", textDecoration: "none", ml: 2 },
                flexGrow: 1,
                display: {
                  xs: "none",
                  md: "flex",
                  // justifyContent: "end",
                  alignItems: "center",
                  direction: directionStyle === "ar" ? "rtl" : "ltr",
                  justifyContent: directionStyle === "ar" ? "" : "end",
                },
                mx: 2,
              }}
            >
              <Link to="/landing"> {t("main.navLink1")}</Link>
              <Link to="/explore"> {t("main.navLink2")}</Link>
              <Link to="/Favorites"> {t("main.navLink3")}</Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {loginData ? (
                <Tooltip
                  className={style.avatar}
                  title="Open To Show Your Data"
                >
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={UserList ? UserList.profileImage : img}
                    />
                    <ArrowDropDownIcon sx={{ color: "pramary.light" }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  onClick={logOut}
                  sx={{
                    p: 1,
                    width: "100%",
                    m: "auto",
                    alignItems: "center",
                    backgroundColor: "primary.light",
                    color: "common.black",
                  }}
                  color={"inherit"}
                >
                  Login Now
                </Button>
              )}

              <Menu
                sx={{ mt: "45px", width: "100%", ml: "40px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Typography sx={{ mx: 1 }} textAlign="start">
                  {UserList ? UserList.userName : "Name"}
                </Typography>
                <Typography sx={{ mx: 1}} textAlign="start">
                  {UserList ? UserList.email : "emaail"}
                </Typography>
                {/* <MenuItem title="LogOut"> */}
                {/* <Typography textAlign="center">Log Out</Typography> */}
                <IconButton onClick={logOut}>
                  <LogoutIcon sx={{ color: "pramary.light", pl: 1 }} />
                  <Typography>LogOut</Typography>
                </IconButton>
                {/* </MenuItem> */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ChangeLanguage />
    </>
  );
}
export default ResponsiveAppBar;
