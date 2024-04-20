import { Box, Grid, Typography } from "@mui/material";

const Landing = () => {
  return (
    <>
      <Box display="flex">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              <h1>Container 1</h1>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" color="initial">
              <h1>Container ddeeeeeeeeeeeeeeeee1</h1>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Landing;
