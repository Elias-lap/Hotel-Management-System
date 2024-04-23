
import { Box } from "@mui/material";
import Footer from "../../../userLayout/Footer/Footer";
// import Landing from "../../../userLayout/Landing";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
    <div>Layout</div>
    <Box   sx={{  width : "80%"  ,m:"auto" }  }>
            <Navbar/>
            {/* <Landing/> */}
            <Footer/>
            </Box>
            </> 
   
  )
}
