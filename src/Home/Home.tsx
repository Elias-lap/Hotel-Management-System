import { Box, Container, Grid, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { useContext, useEffect } from "react";
import BedIcon from "@mui/icons-material/Bed";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { contextDashBoard } from "../DashBoardRoomContext/DashBoardRoom";

export default function Home() {
 

  const {
    DataDashboard,
    numberForFacilities,
    numberForRooms,
    numberForAds,
    userData,
    AdminData,
    pendingBookings,
    completedBookings
  } = useContext(contextDashBoard);

  const Colors1 = [
    "#3949AB",
    "#FF5252",
    "#039BE5",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF6666",
  ];
  const Colors2 = ["#7E57C2", "#FF6666"];
  const Colors3 = ["#35C2FD", "#54D14D"];

  

  useEffect(() => {
    // console.log(DataDashboard);
  }, [DataDashboard]);

  const pieChartData = [
    { name: "Rooms", value: numberForRooms },
    { name: "Ads", value: numberForAds },
    { name: "Facilities", value: numberForFacilities },
  ];

  const UserData = [
    { name: "Admin", value: AdminData },
    { name: "User", value: userData },
  ];

  const bookingsData = [
    { name: "Completed", value: completedBookings },
    { name: "Pending", value: pendingBookings },
  ];

  return (
    <>
      <Box  sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* Rooms , Ads , Facilities*/}
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
                      backgroundColor: "#1A1B1E",
                      color: "white",
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
                      backgroundColor: "#1A1B1E",
                      color: "white",
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
                      backgroundColor: "#1A1B1E",
                      color: "white",
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

      {/*  ==================================================================================*/}
      {/* UserData */}

      <Container  sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
            <ResponsiveContainer style={{boxShadow:"0px 2px 48px 0px #0000000F"}}  width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`${index}`}
                      fill={Colors1[index % Colors1.length]}
                    />
                  ))}
                </Pie>

                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>

          {/* ================================================================================================ */}

          {/* bookingsData  */}

          <Grid item xs={12} sm={6} md={4}>
          <ResponsiveContainer style={{boxShadow:"0px 2px 48px 0px #0000000F"}}  width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingsData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {bookingsData.map((entry, index) => (
                    <Cell
                      key={`${index}`}
                      fill={Colors2[index % Colors2.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>

          {/* UserData */}
          <Grid item xs={12} sm={6} md={4}>
          <ResponsiveContainer style={{boxShadow:"0px 2px 48px 0px #0000000F"}}  width="100%" height={300}>
              <PieChart>
                <Pie
                  data={UserData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {UserData.map((entry, index) => (
                    <Cell
                      key={`${index}`}
                      fill={Colors3[index % Colors3.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
