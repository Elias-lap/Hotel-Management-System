import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import { Box, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/Components/AuthContext";
import Styles from "./Login.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Login() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { loginData, savLoginData, baseUrl } = authContext;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
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
      <Grid
        container
        // direction="row"
        justifyContent="center"
        alignItems="center"
        component="main"
        // spacing={3}
        sx={{ height: "100dvh" }}
        // rowSpacing={2}
        className={` ${Styles.backgroun} `}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          m={2}
          p={2}
          // spacing={3}

          className={` ${Styles.backgrou} `}
        >
          <Typography variant="h4">Sign in</Typography>

          <Typography sx={{ my: 2 }}>
            If you don’t have an account register
            <br />
            You can
            <Link to="/register"> Register here !</Link>
          </Typography>

          <Box
      component="form"
      
      noValidate
      autoComplete="off"
    >
      <TextField 
         margin="normal"
         required
         fullWidth
         id="email"
         label="Email Address"
         name="email"
         autoComplete="email"
         autoFocus />
     
    </Box>
        
     

        </Grid>

       

        <Grid item xs={false} sm={false} md={4} className={Styles.background}>
          {/* <img src={img} alt="Login Image" className={Styles.image} /> */}
          <Typography variant="h4">Sign in</Typography>
          <Typography variant="h6">Homes as unique as you.</Typography>
        </Grid>
      </Grid>
    </>
  );
}

{
  /* <form onSubmit={handleSubmit(onSubmit)}>
<div className="mb-3 px-5">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
  {...register("email", {
    required: "email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "email is not valid ",
    },
  })}
 />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3 px-5">
  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1"
  {...register("password", {
    required: "password is required ",
    // pattern: {
    //   value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    //   message:
    //     "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
    // },
  })}
  />
</div>

<button type="submit" className="btn btn-primary px-5">Submit</button>
</form> */
}
