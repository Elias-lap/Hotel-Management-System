import { Box, Grid, Typography } from "@mui/material";
import defaultImage from "../Img/defaultImage.jpg";
import React from "react";
import "./MostPopular.css";
import { IconButton } from "@mui/material";
interface MostPopularAdsProps {
  ADSList: ADS[];
}

interface ADS {
  _id: string;
  room: {
    price: number;
    roomNumber: string;
    capacity: number;
    discount: number;
    images: string[];
  };
}

const MostPopularAds: React.FC<MostPopularAdsProps> = ({ ADSList }) => {
  console.log(ADSList);
  return (
    <>
      <Box className={"grid"}>
        <Box
          className={"main  card"}
          sx={{ height: "100%", borderRadius: "25px", position: "relative" }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensure the image covers the container
              borderRadius: "25px",
            }}
            src={
              ADSList[0]?.room?.images[0]
                ? ADSList[0]?.room?.images[0]
                : defaultImage
            }
            alt="RoomPicture"
          />
          <Box
            sx={{
              width: { xs: "32%", md: "42%", lg: "36%", xl: "25%" },
              position: "absolute",
              top: "0%",
              left: { xs: "67%", md: "58%", lg: "64%", xl: "75%" },
              color: "whitesmoke",
              backgroundColor: "#FF498B",
              px: 1,
              borderTopRightRadius: "25px",
              borderBottomLeftRadius: "25px",
            }}
            variant="body1"
            color="initial"
          >
            <Typography
              sx={{
                fontSize: 11,
                py: {
                  md: "10px",
                },
              }}
            >
              {ADSList[0]?.room.price}$ per Night
            </Typography>
          </Box>

          <Box
            className ={'layer'}
            sx={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: "100%",
              left: "0",
              backgroundColor :"black",
              display :"flex"
            }}
          >
                    <Grid container justifyContent="center" alignItems="center">
                      <IconButton onClick={() => addToFav(room._id)}>
                        {/* <FavoriteIcon style={{ color: "white" }} /> */}
                      </IconButton>

                      <IconButton>
                        {/* <VisibilityIcon style={{ color: "white" }} /> */}
                      </IconButton>
                      {/* </Link> */}
                    </Grid>
            
          </Box>
        </Box>
        {ADSList.slice(1).map((ad, index) => (
          <Box
            className={"card"}
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: "25px",
              position: "relative",
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensure the image covers the container
                borderRadius: "25px",
              }}
              src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
              alt={`RoomPicture ${index}`}
            />
            <Box
              sx={{
                width: { xs: "32%", md: "42%", lg: "36%", xl: "25%" },
                position: "absolute",
                top: "0%",
                left: { xs: "67%", md: "58%", lg: "64%", xl: "75%" },
                color: "whitesmoke",
                backgroundColor: "#FF498B",
                px: 1,
                borderTopRightRadius: "25px",
                borderBottomLeftRadius: "25px",
              }}
              variant="body1"
              color="initial"
            >
              <Typography
                sx={{
                  fontSize: 11,
                  py: {
                    md: "10px",
                  },
                }}
              >
                {ad.room.price}$ per Night
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>

  );
};

export default MostPopularAds;
