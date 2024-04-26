
import { Box } from "@mui/material";
import Navbar from "../ShareModule/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";


const UserLayout = () => {
    return (
        <> 
           
            <Box   sx={{  width : "100%"  ,m:"auto" }  }>
            <Navbar/>
            <Outlet/>
            <Footer/>
            </Box>
            </> 
      
          
    );
}

export default UserLayout;
