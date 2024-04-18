import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import {
  Grid,
  Button,
  FormControl,
  TextField,
  Typography,
  FilledInput,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Container,
  Box,
  InputLabel,
  Input,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styleRegister from "./Register.module.css";
import imgRegister from "../../../Img/Group 33@2x.png";

export interface FormDataRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  profileImage: FileList;
}

export default function Register() {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormDataRegister>();

  const validatePasswordMatch = (value: unknown) => {
    const password = watch("password");
    return value === password || "Confirm Password doesn't match Password";
  };

  const onSubmit: SubmitHandler<FormDataRegister> = async (data) => {
    setLoadingBtn(true);

    try {
      const formData = new FormData();

      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("role", "user");
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users",
        formData
      );

      toast.success("User created successfully");
      navigate("/verifyAccount");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography
            className={`${styleRegister.ConStay}`}
            variant="h5"
            component="h5"
          >
            <Box component="span" color="primary.main">
              Stay
            </Box>
            cation.
          </Typography>

          <Typography sx={{ mt: 4 }} variant="h6" component="h6">
            Sign up
          </Typography>
          <Typography variant="body1" gutterBottom>
            If you already have an account register <br />
            You can{" "}
            <Link href="login">
              {" "}
              <Box
                className={`${styleRegister.wordLogin}`}
                component="span"
                color="#EB5148"
              >
                Login here !
              </Box>
            </Link>
          </Typography>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
              <label htmlFor="name">User Name</label>
              <TextField
                hiddenLabel
                id="name"
                variant="filled"
                type="text"
                placeholder="Enter Your Name"
                {...register("userName", {
                  required: "userName is required",
                })}
              />
              {errors.userName && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.userName.message?.toString()}
                </Alert>
              )}
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  sx={{ mt: 1 }}
                  className={`${styleRegister.dBlock}`}
                  variant="standard"
                >
                  <label htmlFor="Phone">Phone Number</label>
                  <TextField
                    className={`${styleRegister.textField} `}
                    hiddenLabel
                    id="Phone"
                    placeholder="Enter Your Phone Number"
                    variant="filled"
                    type="tel"
                    {...register("phoneNumber", {
                      required: "phoneNumber is required",
                      pattern: {
                        value: /^01\d{9}$/,
                        message:
                          "Phone number must start with 01 and be 11 digits in total",
                      },
                    })}
                  />
                  {errors.phoneNumber && (
                    <Alert sx={{ mt: 1 }} severity="error">
                      {errors.phoneNumber.message?.toString()}
                    </Alert>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  sx={{ mt: 1 }}
                  className={`${styleRegister.dBlock}`}
                  variant="standard"
                >
                  <label htmlFor="Phone">Country</label>
                  <TextField
                    className={`${styleRegister.textField} `}
                    hiddenLabel
                    id="Phone"
                    placeholder="Enter Your Phone Number"
                    variant="filled"
                    type="text"
                    {...register("country", {
                      required: "country is required",
                    })}
                  />
                  {errors.country && (
                    <Alert sx={{ mt: 1 }} severity="error">
                      {errors.country.message?.toString()}
                    </Alert>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Email */}
            <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
              <label htmlFor="Email">Email Address</label>
              <TextField
                hiddenLabel
                id="Email"
                placeholder="Enter Your Email Address"
                variant="filled"
                type="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com$/,
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

            {/* password */}

            <FormControl sx={{ width: 1, mt: 1 }} variant="standard">
              <label htmlFor="Password">Password</label>
              <FilledInput
                id="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password "
                {...register("password", {
                  required: "password is required",
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.password && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.password.message?.toString()}
                </Alert>
              )}
            </FormControl>

            <FormControl sx={{ width: 1, mt: 1, mb: 4 }} variant="standard">
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <FilledInput
                id="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Your Confirm Password "
                {...register("confirmPassword", {
                  required: "confirmPassword is required",
                  validate: validatePasswordMatch,
                })}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle Confirm visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.confirmPassword && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.confirmPassword.message?.toString()}
                </Alert>
              )}
            </FormControl>

            {/* 
              <div sx={{ mb: 3 }} className="input-group ">
                <input
                  className={`${styleRegister.inputs} form-control`}
                  type="file"
                  {...register("profileImage", {
                    required: "profileImage is required",
                  })}
                />
              </div>
              {errors.profileImage && (
                <Alert className=" mb-2 mt-1" severity="error">
                  {errors.profileImage.message?.toString()}
                </Alert>
              )} */}

            <FormControl sx={{ mb: 3 }} fullWidth>
              {/* <InputLabel htmlFor="profile-image">Profile Image</InputLabel> */}
              <Input
                id="profile-image"
                type="file"
                inputProps={{ accept: "image/*" }}
                {...register("profileImage", {
                  required: "profileImage is required",
                })}
              />
              {errors.profileImage && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.profileImage.message?.toString()}
                </Alert>
              )}
            </FormControl>

            <Button
              sx={{ width: 1 }}
              variant="contained"
              type="submit"
              disabled={loadingBtn}
            >
              {loadingBtn ? <CircularProgress color="inherit" /> : "Sign up"}
            </Button>
          </Form>
        </Grid>

        <Grid item xs={12} md={6}>
          <img className={`${styleRegister.imgRe}`} src={imgRegister} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
}
