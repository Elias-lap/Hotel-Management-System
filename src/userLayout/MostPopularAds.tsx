import { Box, Grid, IconButton, Typography } from "@mui/material";
import defaultImage from "../Img/defaultImage.jpg";
import React, { useContext } from "react";
import "./MostPopular.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../Context/Components/AuthContext";
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  // ///////// Modal for user Not Login
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => setOpen(false);
  // ///////// Add To favorite
  const addToFav = async (id: string) => {
    if (!loginData) {
      // handleOpen();
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
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const {  loginData, requestHeaders } = authContext;
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
            className={"layer"}
            sx={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: "100%",
              left: "0",
              display: "none",
              borderRadius: "25px"
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <IconButton onClick={() => addToFav('')}>
                <FavoriteIcon style={{ color: "white" }} />
              </IconButton>

              <IconButton>
                <VisibilityIcon style={{ color: "white" }} />
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
            <Box
            className={"layer"}
            sx={{
              height: "100%",
              width: "100%",
              position: "absolute",
              top: "100%",
              left: "0",
              display: "none",
              borderRadius: "25px"
            }}
          >
            <Grid container justifyContent="center" alignItems="center">
              <IconButton onClick={() => addToFav('')}>
                <FavoriteIcon style={{ color: "white" }} />
              </IconButton>

              <IconButton>
                <VisibilityIcon style={{ color: "white" }} />
              </IconButton>
              {/* </Link> */}
            </Grid>
          </Box>
            
          </Box>
        ))}
      </Box>
    </>
  );
};

export default MostPopularAds;

// import { Box, Grid } from "@mui/material";
// import defaultImage from '../Img/defaultImage.jpg'
// interface MostPopularAdsProps {
//   ADSList: ADS[];
// }

// interface ADS {
//   _id: string;
//   room: {
//     price: number;
//     roomNumber: string;
//     capacity: number;
//     discount: number;
//     images: string[]
//   };
// }

// const MostPopularAds: React.FC<MostPopularAdsProps> = ({ ADSList }) => {
//     console.log(ADSList)
//   return (
//     <Grid container spacing={5} sx={{ mt: 20, height: "100vh" }}>
//   {/* First column with one image */}
//   <Grid item xs={12} lg={4} >
//     <Box sx={ {height : "600px" , display :"block"} }>
//       <img
//         style={{
//           width: '100%', // Example width
//           height:'100%'
//         }}
//         src={ADSList[0]?.room?.images[0] ? ADSList[0]?.room?.images[0] : defaultImage}
//         alt="RoomPicture"
//       />
//     </Box>
//   </Grid>

//   {/* Remaining columns with dynamic content */}
//   {ADSList.map((ad, index) => (
//     <Grid item xs={10} lg={4} key={ad._id}>
//       <Box>
//         <img
//           style={{
//             width: '100%', // Example width
//             height:'300px'
//           }}
//           src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
//           alt={`RoomPicture ${index}`}
//         />
//       </Box>
//     </Grid>
//   ))}
// </Grid>

//     <Grid container spacing={5} sx={{ mt: 20, height: "100vh" }} style={{ display: 'grid', gridTemplateColumns: '400px auto auto' }}>
//      {ADSList.map(ad => (
//         <Grid item lg={3} key={ad._id}>
//           <Box>
//           <img
//           style={{
//             width: '100%', // Example width
//             height:'470px'
//           }}
//           src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
//           alt="RoomPicture"
//         />

//           </Box>
//         </Grid>
//       ))}
//     </Grid>
//   );
// }

// export default MostPopularAds;
