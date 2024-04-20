import { CardContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Components/AuthContext";
import style from "./Explore.module.css";
import { Style } from "@mui/icons-material";
export default function ExplorePage() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;
  const [roomsList, setRoomsList] = useState<any>([]);

  const getAllRooms = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/v0/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30`
      );
      console.log(response.data.data.rooms);
      setRoomsList(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return (
    <>
      <Box className={style.imageWrapperr} sx={{ mx: 5, mt: 1 }}>
        <div className={style.wrapper}>
          <h2 className={style.animatText}>Explore ALL Rooms</h2>
        </div>

        <Grid sx={{ mx: 1, mt: 5 }} container spacing={2}>
          {roomsList?.map((room: any, index: any) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
              <CardContent>
                <div className={style.imgoverlay}>
                  <img
                    src={room.images[0]}
                    alt=""
                    style={{
                      width: "100%",
                      height: "250px",
                      borderRadius: "30px",
                      overflow:"hidden"
                    }}
                  />
                  <h3 className={style.roomName}>{room?.roomNumber}</h3>
                  <span className={style.imgStyle}>
                    ${room?.price} per night
                  </span>
                  <div className={style.overlay}>
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <IconButton>
                                <FavoriteIcon
                                  style={{ color: 'white'  }}
                                />
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
    </>
  );
}
