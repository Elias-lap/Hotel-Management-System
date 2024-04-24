import { Box, Grid, Typography } from "@mui/material";
import defaultImage from "../Img/defaultImage.jpg";
import React from "react";
import "./MostPopular.css";
import { IconButton } from "material-ui";
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
          </Box>
        ))}
      </Box>
    </>

    //   <Grid container spacing={1} sx={{ mt: 20, height: "100vh" }} style={{ display: 'grid', gridTemplateRows: "215px 215px", gridTemplateColumns: 'auto 400px 400px' }}>
    //   {/* First column with one image */}
    //   <Grid item lg={4} sx={{ height: '430px', gridRow: "span 2", '@media (max-width: 960px)': { height: '100%', gridColumn: 'span 3' } }}>
    //     <Box sx={{ height: '100%' , width:"600px"}}>
    //       <img
    //         style={{
    //           width: '100%',
    //           height: '100%',
    //           objectFit: 'cover' // Ensure the image covers the container
    //         }}
    //         src={ADSList[0]?.room?.images[0] ? ADSList[0]?.room?.images[0] : defaultImage}
    //         alt="RoomPicture"
    //       />
    //     </Box>
    //   </Grid>

    //   {/* Remaining columns with dynamic content */}
    //   {ADSList.slice(1).map((ad, index) => (
    //     <Grid gap={1} item lg={4} key={ad._id} sx={{ height: '215px', '@media (max-width: 960px)': { height: '100%' } }}>
    //       <Box sx={{ height: '100%' , width:'100%' }}>
    //         <img
    //           style={{
    //             width: '100%',
    //             height: '100%',
    //             objectFit: 'cover' // Ensure the image covers the container
    //           }}
    //           src={ad?.room?.images[0] ? ad?.room?.images[0] : defaultImage}
    //           alt={`RoomPicture ${index}`}
    //         />
    //       </Box>
    //     </Grid>
    //   ))}
    // </Grid>
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
