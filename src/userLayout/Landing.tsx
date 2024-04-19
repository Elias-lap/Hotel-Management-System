import { Box, Grid, Typography, useTheme } from '@mui/material';
import dayjs, { Dayjs } from "dayjs";
import { useState } from 'react';
import Calendar from './calendar';
// import { IconButton } from 'material-ui';
import {   IconButton,  TextField } from "@mui/material";
import { Add, Remove } from '@mui/icons-material';



const Landing = () => {
    const theme = useTheme();
    const today = dayjs();
    const nextDate = dayjs().add(1, "day");
    const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>(
      [ today,
         nextDate,]
      );
      const [bookingGuestCount, setBookingGuestCount] = useState(1);
      const handleIncrease = () => {
        setBookingGuestCount(bookingGuestCount + 1);
      };
    
      const handleDecrease = () => {
        if (bookingGuestCount > 1) {
          setBookingGuestCount(bookingGuestCount - 1);
        }
      };

    return (
        <Box display="flex">
            <Grid container spacing={2}>
                <Grid item xs={10} lg={6}>
                    <Box sx={{ width: '95%', border: '1px solid black' }}>
                        <Typography sx={{ fontSize: 70, fontWeight: '800' }} variant="body1" color="initial">
                            Forget Busy Work,
                            Start Next Vacation
                        </Typography>
                        <Typography sx={{ fontSize: 35, fontWeight: '200', color: theme.palette.grey[500] }} variant="body1" color="initial">
                            We provide what you need to enjoy your holiday with family. Time to make another memorable moments.
                        </Typography>
                        <Typography variant="h2" color="initial">
                            Start Booking
                        </Typography>
                     <Calendar {... { selectedDateRange ,setSelectedDateRange ,theme} }/>
                     <Box className="capacityCon">
                <IconButton
                  onClick={handleIncrease}
                  color="primary"
                  sx={{
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    borderRadius: "12px",
                    p: "8px",
                    mr: { xs: "5px", sm: "10px" },
                    ml: "5px",
                  }}
                >
                  <Add/>
                </IconButton>
                <TextField
               
                   sx={{
                    backgroundColor: theme?.palette.grey[300],
                    border: 'none !important',
                    width:"80%",
                    mt:2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    '& .MuiInputBase-input': {
                      textAlign: 'center', // Center align the text value
                    },
                  }}
                
                  value={`${bookingGuestCount} person`}
                />
                <IconButton
                  onClick={handleDecrease}
                  className="caleBtnDiscernment"
                  color="error"
                  sx={{
                    fontSize: { xs: "1px", sm: "1px", md: "1px" },
                    padding: {
                      xs: "8px 16px",
                      sm: "10px 20px",
                      md: "12px 24px",
                    },
                    width: { xs: "40px", sm: "50px" },
                    height: { xs: "40px", sm: "50px" },
                    borderRadius: "12px",
                    p: "8px",
                    mr: { xs: "5px", sm: "10px" },
                    ml: "5px",
                  }}
                >
                  <Remove />
                </IconButton>
              </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" color="initial"><h1>Container ddeeeeeeeeeeeeeeeee1</h1></Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Landing;
