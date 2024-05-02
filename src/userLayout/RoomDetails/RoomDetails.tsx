/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Components/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
// import imgO from "../../Img/90d09327b53aab08ce3911a49cb2e305.png";
import { Typography } from "@mui/material";
import styleRoomDetails from "./RoomDetails.module.css";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FlatwareIcon from "@mui/icons-material/Flatware";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TvIcon from "@mui/icons-material/Tv";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import CommentIcon from "@mui/icons-material/Comment";
import StarsIcon from "@mui/icons-material/Stars";
import dayjs, { Dayjs } from "dayjs";
import Calendar from "../calendar";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';




// import axios from "axios";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Context/Components/AuthContext";
// import { useParams } from "react-router-dom";


const RoomDetails = () => {
    const id =useParams()
    const [roomDetails, setRoomDetails] = useState<any>([]);

    const getroomDetails = async (id: string) => {
      try {
        const response = await axios.get(`${baseUrl}/v0/portal/rooms/available`, {
          params: {
            size: 9,
            page: page,
            //   startDate: startDate,
            //   endDate: endDate,
          },
        });
        // console.log(response);
        setRoomDetails(response);
      } catch (error) {
        console.log(error);
      }
    };


    const authContext = useContext(AuthContext);
    if (!authContext) {
      // Handle the case where AuthContext is null
      return null;
    }
    const { baseUrl, loginData, requestHeaders } = authContext;
    return (
        <Box>



            <Typography variant="h4" >
                details 
            </Typography>
            
        </Box>
    );
}

export default RoomDetails;

// import { Box, Typography } from "@mui/material";
// import axios from "axios";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../Context/Components/AuthContext";
// import { useParams } from "react-router-dom";


// const RoomDetails = () => {
//     const id =useParams()
//     const [roomDetails, setRoomDetails] = useState<any>([]);

//     const getroomDetails = async (id: string) => {
//       try {
//         const response = await axios.get(`${baseUrl}/v0/portal/rooms/available`, {
//           params: {
//             size: 9,
//             page: page,
//             //   startDate: startDate,
//             //   endDate: endDate,
//           },
//         });
//         // console.log(response);
//         setRoomDetails(response);
//       } catch (error) {
//         console.log(error);
//       }
//     };


//     const authContext = useContext(AuthContext);
//     if (!authContext) {
//       // Handle the case where AuthContext is null
//       return null;
//     }
//     const { baseUrl, loginData, requestHeaders } = authContext;
//     return (
//         <Box>



//             <Typography variant="h4" >
//                 details 
//             </Typography>
            
//         </Box>
//     );
// }

// export default RoomDetails;
