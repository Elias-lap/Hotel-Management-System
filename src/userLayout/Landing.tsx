import { Box, Grid, Typography, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useContext, useEffect, useState } from "react";
import Calendar from "./calendar";
// import { IconButton } from 'material-ui';
import { IconButton, TextField, Button } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import image from "../Img/90d09327b53aab08ce3911a49cb2e305.png";
import { useNavigate } from "react-router-dom";
import MostPopularAds from "./MostPopularAds";
import { AuthContext } from "../Context/Components/AuthContext";
import axios from "axios";
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

const Landing = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    today,
    nextDate,
  ]);
  const [bookingGuestCount, setBookingGuestCount] = useState(1);
  const handleIncrease = () => {
    setBookingGuestCount(bookingGuestCount + 1);
  };

  const handleDecrease = () => {
    if (bookingGuestCount > 1) {
      setBookingGuestCount(bookingGuestCount - 1);
    }
  };
  const [ADSList, setADSList] = useState<ADS[]>([]);

  // get ads data for mostPopularAds
  const fetchDataAds = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/v0/portal/ads?page=1&size=5`
      );
      // console.log(response.data.data.ads);
      setADSList(response.data.data.ads);
    } catch (error) {
      console.log("ssssssssss");
    }
  };
  // hook use Effect
  useEffect(() => {
    fetchDataAds();
  }, []);

  // condition for context baseUrl
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;
  return (
    <>
      <Box
        display="flex"
        sx={{
          mt: {
            xs: 0,
            lg: 10,
          },
        }}
      >
        <Grid
          container
          spacing={20}
          sx={{ justifyContent: { sm: "center", md: "center", lg: "center" } }}
        >
          <Grid item xs={12} md={12} lg={12} xl={6}>
            <Box sx={{ width: "95%" }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 40,
                    md: 70,
                  },
                  fontWeight: "800",
                }}
                variant="body1"
                color="initial"
              >
                Forget Busy Work, Start Next Vacation
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    md: 35,
                  },
                  fontWeight: "200",
                  color: theme.palette.grey[500],
                }}
                variant="body1"
                color="initial"
              >
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </Typography>
              <Typography variant="h2" color="initial">
                Start Booking
              </Typography>
              <Typography variant="h5" color="initial">
                Pick a Date
              </Typography>
              <Calendar
                {...{ selectedDateRange, setSelectedDateRange, theme }}
              />
              <Typography sx={{ mt: 2 }} variant="h5" color="initial">
                Capacity
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                }}
              >
                <IconButton
                  onClick={handleDecrease}
                  sx={{
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    color: "white",
                    backgroundColor: red[600],
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px", lg: "55px" },
                    borderRadius: "1px",
                    p: "8px",
                    ml: "0px",
                    mt: "16px",
                    "&:hover": {
                      backgroundColor: red[700], // Change background color on hover
                    },
                  }}
                >
                  <Remove />
                </IconButton>
                <TextField
                  sx={{
                    backgroundColor: theme?.palette.grey[100],
                    border: "none !important",
                    width: {
                      sm: "80%",
                      md: "80%",
                    },
                    mt: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiInputBase-input": {
                      textAlign: "center", // Center align the text value
                      border: "none",
                    },
                  }}
                  value={`${bookingGuestCount} person`}
                />
                <IconButton
                  onClick={handleIncrease}
                  sx={{
                    color: "white",
                    backgroundColor: green[500],
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px", lg: "55px" },
                    borderRadius: "1px",
                    p: "8px",
                    ml: "0px",
                    mt: "16px",
                    "&:hover": {
                      backgroundColor: green[700], // Change background color on hover
                    },
                  }}
                >
                  <Add />
                </IconButton>
              </Box>
              <Button
                onClick={() => {
                  navigate("/explore", {
                    state: {
                      range: selectedDateRange,
                      persons: bookingGuestCount,
                    },
                  });
                }}
                sx={{ mt: 6, px: 10, fontSize: 20 }}
                variant="contained"
                color="primary"
              >
                Explor
              </Button>
              
              {/*  // in commpontet explor you can use  //const { state } = useLocation();// this line of code to accses state and this piss of code 
            // const bookingGuestCount = state?.persons;
               // const [selectedDateRange, setSelectedDateRange] = useState<Range<Dayjs>>([
         //   state?.range[0],
         //   state?.range[1],
         // ]);

  // */}
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            md={10}
            lg={10}
            xl={6}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "500px",
                border: "1px solid black",
                width: "80%",
                borderTopLeftRadius: "26%",
                borderTopRightRadius: "5%",
                borderBottomLeftRadius: "5%",
              }}
            >
              <img
                style={{
                  position: "absolute",
                  top: "-10%",
                  left: "-18%",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "26%",
                  borderTopRightRadius: "5%",
                  borderBottomLeftRadius: "5%",
                }}
                src={image}
                alt="image"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: "5rem", height: "100vh" }}>
        <MostPopularAds ADSList={ADSList} />
      </Box>
    </>
  );
};

export default Landing;
