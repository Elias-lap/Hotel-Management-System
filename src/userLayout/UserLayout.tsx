
import { Box } from "@mui/material";
import Navbar from "../ShareModule/Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";


const UserLayout = () => {
    return (
        <Box>
            <Navbar/>
            <Outlet/>
            <h2>hhhhhhhhhhhhhhhhhhhhhhhhh</h2>
        </Box>
    );
}

export default UserLayout;
