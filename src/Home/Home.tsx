/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { Card } from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { contextDashBoard } from "../DashBoardRoomContext/DashBoardRoom";
import { PieChart } from "@mui/x-charts";

export default function Home() {
  const theme = useTheme();
  const {
    numberForFacilities,
    numberForRooms,
    numberForAds,
    userData,
    adminData,
    pendingBookings,
    completedBookings
  } = useContext(contextDashBoard);

  const Colors1 = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.text.primary, 
  ];

  const pieChartData = [
    { title: "Rooms", value: numberForRooms, color: Colors1[0] },
    { title: "Ads", value: numberForAds, color: Colors1[1] },
    { title: "Facilities", value: numberForFacilities, color: Colors1[2] },
  ];

  const UserData = [
    { title: "Admin", value: adminData, color: Colors1[3] },
    { title: "User", value: userData, color: Colors1[4] },
  ];

  const bookingsData = [
    { title: "Completed", value: completedBookings, color: Colors1[5] },
    { title: "Pending", value: pendingBookings, color: Colors1[6] },
  ];

  // Function to render labels
  const renderLabels = (data: any[]) => {
    return (
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid key={index} item xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: item.color,
                  marginRight: 1,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body1">{item.title}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
    <Box sx={{mt:5}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ p: 5 }}>
              <Grid container spacing={5}>
                {/* Rooms */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      p: 5,
                      textAlign: "start",
                      borderRadius: 4,
                      backgroundColor: "#212121                      ",
                      color: "#fafafa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h4">{numberForRooms}</Typography>
                      <Typography variant="h5" className="py-3">
                        Rooms
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#203FC733",
                        padding: "1rem",
                        borderRadius: "50%",
                        color: "#203FC7",
                      }}
                    >
                      <BedIcon />
                    </Box>
                  </Card>
                </Grid>

                {/* Facilities */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      p: 5,
                      textAlign: "start",
                      borderRadius: 4,
                      backgroundColor: "#212121                      ",
                      color: "#fafafa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h4">
                        {numberForFacilities}
                      </Typography>
                      <Typography variant="h5" className="py-3">
                        Facilities
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#203FC733",
                        padding: "1rem",
                        borderRadius: "50%",
                        color: "#203FC7",
                      }}
                    >
                      <WorkOutlineIcon />
                    </Box>
                  </Card>
                </Grid>

                {/* Ads */}
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      p: 5,
                      textAlign: "start",
                      borderRadius: 4,
                      backgroundColor: "#212121                      ",
                      color: "#fafafa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="h4">{numberForAds}</Typography>
                      <Typography variant="h5" className="py-3">
                        Ads
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        backgroundColor: "#203FC733",
                        padding: "1rem",
                        borderRadius: "50%",
                        color: "#203FC7",
                      }}
                    >
                      <AdsClickIcon />
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* ==================================================================================*/}
      {/* Pie Charts */}

      <Container sx={{ flexGrow: 1, marginTop: "2rem" }}>
        <Grid container spacing={6}>
          {/* Pie Chart for pieChartData */}
          <Grid style={{ margin: "auto", marginBottom: "2rem" }} item xs={12} sm={6} md={4}>
            <Box style={{ margin: "auto", padding: "1.5rem", boxShadow: "0px 2px 48px 0px #0000000F"  , borderRadius:"2rem" , position:"relative"}}>

              <PieChart sx={{position:"absolute" , left:"15%"}}
                series={[
                  {
                    data: pieChartData.map((item:any) => ({
                      value: item.value,
                      color: item.color,
                    })),
                  },
                ]}
                height={200}
                
              />
            </Box>
            <Box sx={{ p: 2 }}>{renderLabels(pieChartData)}</Box>
          </Grid>

          {/* Pie Chart for bookingsData */}
          <Grid style={{ margin: "0 auto", marginBottom: "2rem" }} item xs={12} sm={6} md={4}>
          <Box style={{ margin: "auto", padding: "1.5rem", boxShadow: "0px 2px 48px 0px #0000000F"  , borderRadius:"2rem" , position:"relative"}}>
          <PieChart sx={{position:"absolute" , left:"15%"}}
                series={[
                  {
                    data: bookingsData.map((item:any) => ({
                      value: item.value,
                      color: item.color,
                    })),
                  },
                ]}
                height={200}
              />
            </Box>
            <Box sx={{ p: 2   }}>{renderLabels(bookingsData)}</Box>

  
            
          </Grid>

          {/* Pie Chart for UserData */}
          <Grid style={{ margin: "0 auto", marginBottom: "2rem" }} item xs={12} sm={6} md={4}>
          <Box style={{ margin: "auto", padding: "1.5rem", boxShadow: "0px 2px 48px 0px #0000000F"  , borderRadius:"2rem"  , position:"relative"}}>
          <PieChart sx={{position:"absolute" , left:"15%"}}
                series={[
                  {
                    data: UserData.map((item:any) => ({
                      value: item.value,
                      color: item.color,
                    })),
                  },
                ]}
                height={200}
              />
            </Box>
            <Box sx={{ p: 2  }}>{renderLabels(UserData)}</Box>
          </Grid>
        </Grid>
      </Container>
      </Box>
    </>
  );
}
