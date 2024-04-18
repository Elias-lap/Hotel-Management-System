import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import imgRegister from "../../../Img/Group 33@2x.png";
import styleRegister from "./Register.module.css";

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
          console.log(response);
          
      toast.success("User created successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
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

          <Typography sx={{ mt: 2 }} variant="h6" component="h6">
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

            <FormControl sx={{ mb: 2 }} fullWidth>
              {/* <InputLabel htmlFor="profile-image">Profile Image</InputLabel> */}

                <label className="custum-file-upload" htmlFor="file">
                <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                </div>
                <div className="text">
                   <span>Click to upload image</span>
                   </div>
                   <input type="file" id="file"
                     {...register("profileImage", {
                      required: "profileImage is required",
                    })}
                   />
                </label>
                


             
             
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
