/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Button,
  CardContent,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Components/AuthContext";
import Style from "./Explore.module.css";
import imgLogin from "../../assets/images/login PopUp.jpg";

// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import dayjs from "dayjs"; // استيراد مكتبة dayjs

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "info.light",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ExplorePage() {
  {
    /*  // in commpontet explor you can use  //const { state } = useLocation();// this line of code to accses state and this piss of code 
          // const bookingGuestCount = state?.persons;
          // const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
         //   state?.range[0],
         //   state?.range[1],
         // ]);

  // */
  }

  interface IRoom {
    roomNumber:string
    _id:string
    price:string
    images:string
  }

  const [roomsList, setRoomsList] = useState<IRoom[]>([]);

  const getAllRooms = async (
    page: number,
    startDate?: string,
    endDate?: string
  ) => {
    if (!location.state) {
      try {
        const response = await axios.get(
          `${baseUrl}/v0/portal/rooms/available`,
          {
            params: {
              size: 9,
              page: page,
            },
          }
        );
        // console.log(response.data.data.rooms);
        setRoomsList(response.data.data.rooms);
      } catch (error) {
        // console.log(error);
      }
    }
    try {
      const response = await axios.get(`${baseUrl}/v0/portal/rooms/available`, {
        params: {
          size: 9,
          page: page,
          startDate: startDate,
          endDate: endDate,
        },
      });
      // console.log(response.data.data.rooms);
      setRoomsList(response.data.data.rooms);
    } catch (error) {
      // console.log(error);
    }
  };

  const [page, setPage] = React.useState(1);
  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  interface State {
    range?: any;
    // range?: [Date, Date];
  }

  const location = useLocation();
  const state = (location.state as State) || {};
  const roomDateStart = state.range?.[0]?.$d;
  const roomDateEnd = state.range?.[1].$d;

  // console.log(roomDateStart);
  // console.log(roomDateEnd);

  // تحويل التواريخ إلى الشكل المطلوب

  const startDate = dayjs(roomDateStart).format("YYYY-MM-DD");
  const endDate = dayjs(roomDateEnd).format("YYYY-MM-DD");
  // console.log(startDate);

  if (location?.state) {
    useEffect(() => {
      getAllRooms(page, startDate, endDate);
    }, [page, startDate, endDate]);
  } else {
    useEffect(() => {
      getAllRooms(page);
    }, [page]);
    // console.log("::::::::::::::::::::");
  }

  

  // ///////// modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // ////// addfav
  const addToFav = async (id: string) => {
    if (!loginData) {
      handleOpen();
    } else {
      try {
        const response = await axios.post(
          `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
          { roomId: id },
          {
            headers: requestHeaders,
          }
        );
        toast.success(" add to fav successfully");
        // console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    GetFav()
    }, []);

// /////////// get fav
// const [favRoomsList, setFavRoomsList] = useState<{ images: string[]; roomNumber: string; price: number; _id: string; }[]>([]);

// const GetFav = async () => {
//   // if (!loginData) {
//   // } else {
//     try {
//       const response = await axios.get(
//         `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
      
//         {
//           headers: requestHeaders,
//         }
//       );
//       setFavRoomsList(response?.data?.data?.favoriteRooms[0].rooms);
//       console.log(response?.data.data.favoriteRooms[0].rooms);
//       // console.log(response);
//     } catch (error) {
//      console.log(error);
     
//     // }
//   }
// };


  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl, loginData, requestHeaders } = authContext;

  const navigate = useNavigate();
  const goToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {roomsList?.length > 0 ? (
        <Box className={Style.imageWrapperr} sx={{ mx: 5, mt: 1 }}>
          <div className={Style.wrapper}>
            <h2 className={Style.animatText}>Explore ALL Rooms</h2>
          </div>

          <Grid sx={{ mx: 1, mt: 3 }} container spacing={2}>

            {roomsList?.map((room , index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <CardContent>
                  <div className={Style.imgoverlay}>
                    <img
                      src={room.images[0]}
                      alt=""
                      style={{
                        width: "100%",
                        height: "300px",
                        borderRadius: "30px",
                        overflow: "hidden",
                      }}
                    />
                    <h3 className={Style.roomName}>{room?.roomNumber}</h3>
                    <span className={Style.imgStyle}>
                      ${room?.price} per night
                    </span>
                    <div className={Style.overlay}>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton onClick={() => addToFav(room._id)}>
                          <FavoriteIcon style={{ color: "white" }} />
                        </IconButton>

                        <IconButton>
                          <VisibilityIcon style={{ color: "white" }} />
                        </IconButton>
                        {/* </Link> */}
                      </Grid>
                    </div>
                  </div>
                </CardContent>
              </Grid>
            ))}

          </Grid>
        </Box>
      ) : (
        <Box className={Style.imageWrapperr} sx={{ mx: 5, mt: 1 }}>
          <CircularProgress sx={{ mx: "50%" }} size={54} color="inherit" />
        </Box>
      )}
      <Stack
        sx={{ margin: "20px", display: "flex", justifyContent: "center" }}
        spacing={2}
      >
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "inherit",
          }}
          count={50}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
          page={page}
        />
      </Stack>

      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Hey you need to login first !
            </Typography>
            <img
              src={imgLogin}
              style={{ width: "300px", height: "200px" }}
              alt=""
            />
            <Button
              onClick={goToLogin}
              sx={{
                p: 1,
                width: "50%",
                mt: 4,
                alignItems: "center",
                backgroundColor: "primary.dark",
                color: "common.black",
              }}
              color={"inherit"}
            >
              Login Now
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
