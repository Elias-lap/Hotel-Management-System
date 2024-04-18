import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imgForgotPass from "../../../Img/forgotPass.png";
import StyleForgotPass from "./ForgotPassword.module.css";

export interface FormDataRegister {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>();

  const onSubmit: SubmitHandler<FormDataRegister> = async (data) => {
    setLoadingBtn(true);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users/forgot-password",
        data
      );

      console.log(response);

      toast.success(
        "Password reset request, already sent successfully, check your email"
      );

      navigate("/reset-Pass");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <Container sx={{ my: 5 }} className={StyleForgotPass.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            className={`${StyleForgotPass.ConStay}`}
            variant="h5"
            component="h5"
          >
            <Box component="span" color="primary.main">
              Stay
            </Box>
            cation.
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="h6">
              Forgot password
            </Typography>
            <Typography variant="body1" gutterBottom>
              If you already have an account, register
              <br />
              You can{" "}
              <Link href="login">
                {" "}
                <Box
                  className={`${StyleForgotPass.wordLogin}`}
                  component="span"
                  color="#EB5148"
                >
                  Login here !
                </Box>
              </Link>
            </Typography>

            <Form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <FormControl sx={{ mt: 4, display: "block" }} variant="standard">
                <label htmlFor="email">Email</label>
                <TextField
                  sx={{ width: 1 }}
                  hiddenLabel
                  id="email"
                  placeholder="Enter Your Email"
                  variant="filled"
                  type="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
                      message: "Email must be a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.email.message?.toString()}
                  </Alert>
                )}
              </FormControl>

              <Button
                sx={{ width: 1, mt: 5 }}
                variant="contained"
                type="submit"
              >
                {loadingBtn ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Send mail"
                )}
              </Button>
            </Form>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <img
            className={`${StyleForgotPass.imgRe}`}
            src={imgForgotPass}
            alt=""
          />
        </Grid>
      </Grid>
    </Container>
  );
}
