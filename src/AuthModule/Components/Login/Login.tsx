import Grid from "@mui/material/Grid";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/Components/AuthContext";
import Styles from "./Login.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import img from "../../../assets/images/login0.png";
import logo from "../../../assets/images/Staycation.png";

export default function Login() {

   interface FormData {
    email: string;
    password: string;
   
  }
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { loginData, savLoginData, baseUrl } = authContext;

  const [showPassword, setShowPassword] = useState("password");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm <FormData>();

  const onSubmit = async (data: FormData) => {
    // console.log(data);
    
    await axios
      .post(`${baseUrl}/v0/admin/users/login`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
        navigate("/layout");
        savLoginData();

        // console.log("token", response.data.data.token);
        console.log(loginData);
        // console.log(baseUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
     

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
          // border: '1px solid',
          // borderColor: "divider",
          // borderRadius: 2,
          // bgcolor: "#cfe8fc",
          // color: "text.secondary",
          // "& svg": {
          //   m: 1,
          // },
        }}
       
      >
        <Grid
          className={Styles.loginContainer}
          sx={{ bgcolor: "#ffffff" }}
          container
          rowSpacing={1}
        >
          <Grid item  md={6}  m={1}>
            <img src={logo} className={Styles.logoimage} />
            <Grid item xs={10} sx={{ bgcolor: "" }} m={5}>
              <Typography variant="h4">Sign in</Typography>

              <Typography sx={{ my: 2 }}>
                If you don’t have an account register
                <br />
                You can
                <Link className={Styles.register} to="/register"> Register here !</Link>
              </Typography>
              <Box 
               onSubmit={handleSubmit(onSubmit)}
              component="form" noValidate autoComplete="off">
                <TextField
                 {...register("email", {
                  required: "Email is required jhhkhkjhkj",
                  pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                })}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors?.email}
                  helperText= {errors?.email && errors?.email.type === "required" && (
                   " Email is required"
                  )}
                  // {String(errors?.email? errors.email.message:"")}
                  // autoFocus
                />
               

                <FormControl fullWidth sx={{ mb: 1 ,mt:4 }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput

                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                   
                    error={!!errors?.password}
                    
                    className=""
                    id="outlined-adornment-password"
                    type={showPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setShowPassword(
                              showPassword === "password" ? "text" : "password"
                            );
                          }}
                          
                          edge="end"
                        >
                          {showPassword === "password" ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Grid container>
                  <Grid
                    justifyContent="end"
                    item
                    xs
                    sx={{ mb: 5, pb: 5, pt: 2, display: "flex" }}
                  >
                    <Link className={Styles.register} to="/forgot-Pass">Forgot password?</Link>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2, py: 1 }}
                >
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid
            className={Styles.imageContainer}
            sx={{ height: "100%" }}
            item
            xs={5}
          >
            <img src={img} alt="Login Image" className={Styles.image} />
            <Typography variant="h4" className={Styles.imageText1}>
              Sign in
            </Typography>
            <Typography variant="h6" className={Styles.imageText}>
              Homes as unique as you.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}


