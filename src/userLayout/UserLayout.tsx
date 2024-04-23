
import { Box } from "@mui/material";
import Navbar from "../ShareModule/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


const UserLayout = () => {
    return (
        <> 
           
            <Box   sx={{  width : "80%"  ,m:"auto" }  }>
            <Navbar/>
            <Outlet/>
            </Box>
            </> 
      
    );
}

export default UserLayout;
