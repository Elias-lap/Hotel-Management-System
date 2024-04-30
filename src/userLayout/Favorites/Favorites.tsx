import {
  CardContent,
  IconButton,
  Pagination
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import StyleFav from "./Favorites.module.css";
// import CloseIcon from "@mui/icons-material/Close";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/Components/AuthContext";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation, useNavigate } from "react-router-dom";

const navigate = useNavigate();

export default function Favorites() {
  const authContext = useContext(AuthContext);
  let requestHeaders = {};
  if (authContext) {
    requestHeaders = authContext.requestHeaders;
  } else {
    // Handle the case where AuthContext is null
    return null;
  }

  const [favRoomsList, setFavRoomsList] = useState<{ images: string[]; roomNumber: string; price: number; _id: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Pagination 
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // add AllFavRooms


  const getAllFavRooms = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
        {
          headers: requestHeaders,
        }
      );
      setFavRoomsList(response?.data?.data?.favoriteRooms[0].rooms);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFav = async (roomId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms/${roomId}`,
        {
          headers: requestHeaders,
          data: { roomId },
        }
      );
      // console.log(response.data.message)
      toast.success(response.data.message);
      getAllFavRooms();
    } catch (error) {
      // toast.error(error)
      toast.error("you can't remove your favorite room");

      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const pageCount = Math.ceil(favRoomsList.length / itemsPerPage);

  const displayedRooms = favRoomsList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event:any, value:any) => {
    setPage(value);
  };

  useEffect(() => {
    getAllFavRooms();
  }, []);

  const { t, i18n } = useTranslation();
  const directionStyle=i18n.resolvedLanguage;
    // 

  return (
    <>
      <Box sx={{ mx: 5, mt: 1 }}>
        <div className={StyleFav.wrapper}>
          <h2 className={StyleFav.animatText}>  {t("main.FavTitle")}</h2>
        </div>


        <Grid sx={{ mx: 1 ,mt:5 }} container spacing={2}>
          {displayedRooms.map((room, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <CardContent>
                <div className={StyleFav.imgoverlay}>
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
                  <h5 className={StyleFav.roomName}>
                    {room?.roomNumber}
                    <p>
                      <span style={{ color: "#f44336" }}>price: </span>$
                      {room?.price}
                    </p>
                  </h5>

                  <div className={StyleFav.overlay}>
                    <Grid>
                      <IconButton
                        style={{
                          padding: "1rem",
                          // backgroundColor: "#bdbdbd                        ",
                          borderRadius: "50%",
                        }}
                        onClick={() => removeFromFav(room?._id)}
                      >
                        <DoNotDisturbOnIcon
                          style={{
                            color: "white",
                          }}
                        />
                      </IconButton>
                      <IconButton
                       style={{
                        padding: "1rem",
                        // backgroundColor: "#bdbdbd                        ",
                        borderRadius: "50%",
                      }}
                      onClick={() => navigate(`RoomDetails/${room?._id}`)}
                      >
                          <VisibilityIcon style={{ color: "white" }} />
                        </IconButton>
                    </Grid>
                  </div>
                </div>
              </CardContent>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={pageCount}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ mt: 3, justifyContent: 'center' }}
        />
      </Box>
    </>
  );
}
