/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CardContent, IconButton, Pagination, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Components/AuthContext";
import Style from "./Explore.module.css";

// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

const style = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ExplorePage() {

 
  const [roomsList, setRoomsList] = useState<any>([]);

  const getAllRooms = async (page: any) => {
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
      setRoomsList(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = React.useState(1);
  const handleChange = (_e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // console.log(page);
    getAllRooms(page);
  };
  // ///////// modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose =  () => setOpen(false);

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
        console.log(response);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message);
        }
      
         }
    }
  };

  useEffect(() => {
    getAllRooms(page);
  }, [page]);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl, loginData, requestHeaders } = authContext;

  return (
    <>
      <Box className={Style.imageWrapperr} sx={{ mx: 5, mt: 1 }}>
        <div className={Style.wrapper}>
          <h2 className={Style.animatText}>Explore ALL Rooms</h2>
        </div>

        <Grid sx={{ mx: 1, mt: 5 }} container spacing={2}>
          {roomsList?.map((room: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <CardContent>
                <div className={Style.imgoverlay}>
                  <img
                    src={room.images[0]}
                    alt=""
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "30px",
                      overflow: "hidden",
                    }}
                  />
                  <h3 className={Style.roomName}>{room?.roomNumber}</h3>
                  <span className={Style.imgStyle}>
                    ${room?.price} per night
                  </span>
                  <div className={Style.overlay}>
                    <Grid container justifyContent="center" alignItems="center">
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
            count={10}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
            page={page}
          />
        </Stack>
      </Box>
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
