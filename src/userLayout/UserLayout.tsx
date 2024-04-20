
import { Box } from "@mui/material";
import Navbar from "../ShareModule/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


const UserLayout = () => {
    return (
        <Box>
            <Navbar/>
            <Outlet/>
        </Box>
    );
}

export default UserLayout;
