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
import CircularProgress from "@mui/material/CircularProgress";

const RoomDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState<any>({});
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    today,
    nextDate,
  ]);
  const roomDateStart = selectedDateRange[0];
  const roomDateEnd = selectedDateRange[1];
  const startDate = dayjs(roomDateStart).format("YYYY-MM-DD");
  const endDate = dayjs(roomDateEnd).format("YYYY-MM-DD");
  const getRoomDetails = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/rooms/${id}`,
        {
          headers: requestHeaders,
        }
      );
      setRoomDetails(response.data.data.room);
      setPrice(response?.data.data.room?.price);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room details:", error);
      setLoading(false);
    }
  };
  // data is ready to be sent to the backend for Containio booking

  const createBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("hey you need to login first ");
      throw new Error("User is not authenticated");
      
    }
    // setLoading(true)
    try {
      const requestBody = {
        startDate: startDate,
        endDate: endDate,
        room: id,
        totalPrice: price * dayjs(roomDateEnd).diff(roomDateStart, "day"),
      };

      const response = await axios.post(
        `${baseUrl}/v0/portal/booking`,
        requestBody,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      toast.success("Booking created successfully");
      navigate(`/checkout/${response.data.data.booking._id}`,{
        state:{
          id :price * dayjs(roomDateEnd).diff(roomDateStart, "day")
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Booking creation failed ");
    }
  };

  useEffect(() => {
    if (id) {
      getRoomDetails();
    }
  }, [id]);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { requestHeaders, baseUrl } = authContext;

  return (
    <Box>
      {loading ? (
        <Typography variant="body1">
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        </Typography>
      ) : (
        <>
          <Typography
            variant="h2"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            Room Details
          </Typography>

          <Container maxWidth="xl">
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                padding: "5px",
              }}
            >
              <Typography variant="body1" style={{ marginRight: "5px" }}>
                <Link
                  to="/dashboard/home"
                  style={{ color: "#B0B0B0", textDecoration: "none" }}
                >
                  Home
                </Link>
              </Typography>
              <Typography
                variant="body1"
                style={{ marginRight: "5px", color: "#B0B0B0" }}
              >
                /
              </Typography>
              <Typography variant="body1" style={{ color: "#152C5B" }}>
                Room Details
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} lg={8}>
                <img
                  src={
                    roomDetails.images && roomDetails.images.length > 0
                      ? roomDetails.images[0]
                      : roomDetails.images[0]
                  }
                  alt="Large Image"
                  style={{
                    width: "95%",
                    height: "500px",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                {roomDetails.images &&
                  roomDetails.images.slice(1, 3).map((img: any, index: any) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Small Image ${index + 1}`}
                      style={{
                        width: "80%",
                        height: "500px",
                        objectFit: "cover",
                      }}
                    />
                  ))}
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="xl">
            <Grid container spacing={2} style={{ marginTop: "3rem" }}>
              <Grid item xs={12} md={12} lg={8}>
                <Typography
                  style={{
                    color: "#B0B0B0",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                  variant="body2"
                >
                  Minimal techno is a minimalist subgenre of techno music. It is
                  characterized by a stripped-down aesthetic that exploits the
                  use of repetition and understated development. Minimal techno
                  is thought to have been originally developed in the early
                  1990s by Detroit-based producers Robert Hood and Daniel Bell.
                </Typography>

                <Typography
                  style={{
                    color: "#B0B0B0",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                  variant="body2"
                >
                  Such trends saw the demise of the soul-infused techno that
                  typified the original Detroit sound. Robert Hood has noted
                  that he and Daniel Bell both realized something was missing
                  from techno in the post-rave era.
                </Typography>

                <Typography
                  style={{
                    color: "#B0B0B0",
                    fontSize: "16px",
                    fontWeight: "300",
                  }}
                  variant="body2"
                >
                  Design is a plan or specification for the construction of an
                  object or system or for the implementation of an activity or
                  process, or the result of that plan or specification in the
                  form of a prototype, product or process. The national agency
                  for design: enabling Singapore to use design for economic
                  growth and to make lives better.
                </Typography>

                {/* Icon */}

                <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <BedIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bedroom</Box>
                  </Box>
                  <Box sx={{ marginLeft: "2rem" }}>
                    <WeekendIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Living room</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <BathtubIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bathroom</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <FlatwareIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Dining room</Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box>
                    <NetworkWifiIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Mbp/s</Box>
                  </Box>
                  <Box sx={{ marginLeft: "2rem" }}>
                    <AcUnitIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}>Unit Ready</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <BluetoothIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> Bluetooth</Box>
                  </Box>

                  <Box sx={{ marginLeft: "2rem" }}>
                    <TvIcon
                      style={{
                        color: "#152C5B",
                        fontSize: "38px",
                        height: "38px",
                      }}
                    />
                    <Box style={{ color: "#B0B0B0" }}> television</Box>
                  </Box>
                </Box>
              </Grid>

              {/* border */}
              <Grid item xs={12} md={12} lg={4}>
                <Box
                  sx={{
                    border: "1px solid #E5E5E5",
                    padding: "5rem",
                    borderRadius: "1rem",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ color: "#1a237e", marginTop: "2" }}
                  >
                    Start Booking
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1ABC9C",
                      fontSize: "36px",
                      fontWeight: "300",
                      marginTop: "1rem",
                    }}
                  >
                    {price}
                    <span style={{ color: "#B0B0B0", marginLeft: "0.5rem" }}>
                      per night
                    </span>
                  </Typography>
                  <Calendar {...{ selectedDateRange, setSelectedDateRange }} />

                  {/* btn */}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "3rem",
                    }}
                  >
                    <Button
                      onClick={() => {
                        createBooking();
                      }}
                      variant="contained"
                    >
                      Continue Book
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
            <Box
              sx={{
                border: "1px solid #E5E5E5",
                padding: "5rem",
                borderRadius: "1rem",
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                container
                spacing={2}
              >
                <Grid item xs={12} md={6} lg={6}>
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ color: "#1a237e", marginBottom: "2rem" }}
                  >
                    <StarsIcon sx={{ marginRight: "1rem", color: "#DFCB1D" }} />
                    Rate
                  </Typography>

                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ color: "#1a237e", marginBottom: "1rem" }}
                  >
                    Message
                  </Typography>

                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={5}
                  />

                  <Button sx={{ marginTop: "2rem" }} variant="contained">
                    Rate{" "}
                  </Button>
                </Grid>
                <Grid
                  className={`${styleRoomDetails.spaceInputs}`}
                  item
                  xs={12}
                  md={6}
                  lg={6}
                >
                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ color: "#1a237e", marginBottom: "2rem" }}
                  >
                    <CommentIcon
                      sx={{ marginRight: "0.5rem", color: "#c62828" }}
                    />
                    Add Your Comment
                  </Typography>

                  <Typography
                    variant="h5"
                    color="secondary"
                    sx={{ color: "#1a237e", marginBottom: "1rem" }}
                  >
                    Comment
                  </Typography>

                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={5}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "2rem",
                    }}
                  >
                    <Button variant="contained">Send</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
};

export default RoomDetails;
