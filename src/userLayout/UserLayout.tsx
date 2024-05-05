
import { Box } from "@mui/material";
import Navbar from "../ShareModule/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import ChangeLanguage from "../ShareModule/ChangeLanguage/ChangeLanguage";


const UserLayout = () => {
    return (
        <> 
            <Box   sx={{  width : "100%"  , m:"auto"  }  }>
            <Navbar/>
        <Box sx={{minHeight:"65vh"}}>
            <Outlet />
            </Box>
            </Box>
            <Footer/>

            </> 
      
          
    );
}

export default UserLayout;
