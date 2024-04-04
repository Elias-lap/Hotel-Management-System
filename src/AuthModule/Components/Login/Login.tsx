import React from "react";
import { Box, Button, FormGroup , FormHelperText, Grid, Input, InputLabel, Paper, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="auth-cotainer vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50 h-50 bg-info">
        <Grid container component="main" className=''>
      <Grid item xs={12} sm={12} md={6} className=''>
        <Paper elevation={0} className=''>
          <Paper elevation={0} sx={{ mx: 4, pt: 1, mb: 2 }}>
            <img src='' />
          </Paper>
          {/* *******container of left side******* */}
          <Box
            sx={{
              // my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              // mt: 3, maxWidth: '400px', margin: 'auto'
            }}
          >
            <Typography component="h2" variant="h5">
              Sign in
            </Typography>
            <Typography sx={{ my: 2 }} component="body" variant="body1">
              If you don’t have an account register
              <br />
              You can
              <Link to="/register"> Register here !</Link>
            </Typography>
            {/* **********form inputs*********** */}
            <Box
              component="form"
              noValidate
            
              sx={{ mt: 3 }}
            >
              <TextField 
                // {...register("email", {
                //   required: true,
                //   pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                // })}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {/* {errors.email && errors.email.type === "required" && (
                <span className="errorMsg">Email is required</span>
              )} */}

              {/* {errors.email && errors.email.type === "pattern" && (
                <span className="errorMsg">Email is invalid</span>
              )} */}

              <TextField
                // {...register("password", {
                //   required: true,
                //   pattern:
                //     /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                // })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* {errors.password && errors.password.type === "required" && (
                <span className="errorMsg">Password is required</span>
              )}
              {errors.password && errors.password.type === "pattern" && (
                <span className="errorMsg">password is invalid</span>
              )} */}

              <Grid container>
                <Grid item xs sx={{ mb: 5, pb: 5, pt: 2 }}>
                  <Link to="/forget-password">Forgot password?</Link>
                </Grid>
              </Grid>

              <Button
                className=''
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 5, mb: 2, py: 1 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className=''>
        <img src='' alt="Login Image" className='' />
        <Typography variant="h4" className=''>
          Sign in to Roamhome
          <h6>Homes as unique as you.</h6>
        </Typography>
      </Grid>
    </Grid>
        </div>
      </div>
    </>
  );
}
