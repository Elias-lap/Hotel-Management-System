import { Box, Button, Grid, IconButton, Modal, Typography } from "@mui/material";
import imgLogin from "../../src/assets/images/login PopUp.jpg";
import defaultImage from "../Img/defaultImage.jpg";
import React, { useContext } from "react";
import "./MostPopular.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../Context/Components/AuthContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";

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
    _id  : string
  };
}

const MostPopularAds: React.FC<MostPopularAdsProps> = ({ ADSList }) => {
  const goToLogin = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const navigate =useNavigate()
  // ///////// Modal for user Not Login
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  // ///////// Add To favorite
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
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const {  loginData, requestHeaders } = authContext;
  return (
    <>
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
          <Typography sx={{position:"absolute" , top :"90%" , left :"10%" , color :"white"} } variant="h6" color="initial">{ADSList[0]?.room?.roomNumber}</Typography>
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
              <IconButton onClick={() => addToFav(ADSList[0]?.room._id)}>
                <FavoriteIcon style={{ color: "white" }} />
              </IconButton>

              <IconButton  onClick={()=>navigate(`/RoomDetails/${ADSList[0]?.room._id}`)}>
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
            <Typography sx={{position:"absolute" , top :"85%" , left :"10%" , color :"white"} } variant="h6" color="initial">{ad?.room?.roomNumber}</Typography>
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
              <IconButton onClick={() => addToFav(ad.room._id)}>
                <FavoriteIcon style={{ color: "white" }} />
              </IconButton>

              <IconButton onClick={()=>navigate(`/RoomDetails/${ad.room._id}`)}>
                <VisibilityIcon  style={{ color: "white" }} />
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


