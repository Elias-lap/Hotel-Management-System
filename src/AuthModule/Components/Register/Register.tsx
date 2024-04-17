import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { SubmitHandler, FieldValues } from "react-hook-form";

// Import components from MUI
import {
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme } from '@mui/material/styles';

// Import CSS module
import styleRegister from "./Register.module.css";

// Import image
import imgRegister from "../../../Img/Group 33@2x.png";
import { purple } from "@mui/material/colors";

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
  const [dataApi, setdataApi] = useState([]);


  // mui color
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#eb5048 ',
        contrastText: '#000',
      },
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const validatePasswordMatch = (value: unknown) => {
    const password = watch("password");
    return value === password || "Confirm Password doesn't match Password"; 
  };
  const onSubmit: SubmitHandler<FormDataRegister> = async (data) => {
    console.log(data.profileImage)
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
        formData,
      );

      
      console.log(response);
      setdataApi(response.data);
      toast.success("User created successfully");
      navigate("/verifyAccount");
    } catch (error:any) {
      // console.log(error);
            // console.log(error.response.data.message);

      toast.error(error.response.data.message);
    } finally {
      setLoadingBtn(false); 
    }
  };


  return (
    <>
      <Container>
        <div className="row">
          <div className="col-12 col-md-6">
            <Typography
            
              className={`${styleRegister.ConStay}`}
              variant="h5"
              component="h5"
            >
              {/* <span className={`${styleRegister.wordStay}`}> Stay</span> */}
              <Box component="span" color="primary.main" >
              Stay
    </Box>


              cation.
            </Typography>

       

            <div className="mt-4">
              <Typography variant="h6" component="h6">
                Sign up
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you already have an account register <br />
                You can{" "}
               
                <Box  className={`${styleRegister.wordLogin}`} component="span" color="#EB5148">
    Login here !
</Box>

              </Typography>

              <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FormDataRegister>)}>
                {/* User Name */}
                <FormControl className="mt-4 d-block" variant="standard">
                  <label className="mb-2" htmlFor="name">
                    User Name
                  </label>
                  <TextField
                    className={`${styleRegister.textField}`}
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
                    <Alert className=" mt-1" severity="error"> 
    {errors.userName.message?.toString()}
                    
                    </Alert>
                    // <div className="alert alert-danger  d-inline-block w-100 mt-1">
                    //   {errors.userName.message}
                    // </div>
                  )}
                </FormControl>

                {/* Phone Number */}
                <FormControl className="mt-4 d-block" variant="standard">
                  <label className="mb-3 d-block" htmlFor="Phone">
                    Phone Number
                  </label>
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
                        message: "Phone number must start with 01 and be 11 digits in total",
                      },
                    })}
                  />
                   {errors.phoneNumber && (
                    <Alert className=" mt-1" severity="error">
                       {errors.phoneNumber.message?.toString()}

                       
                       </Alert>
                 
                  )}
                </FormControl>

                <div className=" row">
                  <div className=" col-md-6">
                    {/* Country */}
                    <FormControl className="mt-4" variant="standard">
                      <label className="mb-2 d-block" htmlFor="Country">
                        Country
                      </label>
                      <TextField
                        className={`${styleRegister} d-block`}
                        hiddenLabel
                        id="Country"
                        placeholder="Enter Your Country"
                        variant="filled"
                        type="text"
                        {...register("country", {
                          required: "country is required",
                        })}
                      />
                        {errors.country && (
                    <Alert className=" mt-1" severity="error">
                                             {errors.country.message?.toString()}

                      
                       </Alert>
                 
                  )}
                    </FormControl>
                  </div>
                  <div className=" col-md-6">
                    {/* Email Address */}
                    <FormControl className="mt-4" variant="standard">
                      <label className="mb-2 d-block" htmlFor="Email">
                        Email Address
                      </label>
                      <TextField
                        className={`${styleRegister.textField}`}
                        hiddenLabel
                        id="Email"
                        placeholder="Enter Your Email Address"
                        variant="filled"
                        type="email"
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value:
                            /^[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com$/,
                            message: "Email must be a valid email",
                          },
                        })}
                      />
                           {errors.email && (
                    <Alert className=" mt-1" severity="error"> 
                                                                 {errors.email.message?.toString()}

                    
                 </Alert>
                 
                  )}
                    </FormControl>
                  </div>
                </div>

                {/* Password */}
                <FormControl className="mt-4 d-block " variant="standard">
                  <label className=" mb-2" htmlFor="Password">
                    Password
                  </label>
                  <FilledInput
                    className={`${styleRegister.textField} `}
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
                    <Alert className=" mt-1" severity="error"> 
                    
                    {errors.password.message?.toString()}

                    
                 </Alert>
                 
                  )}
                </FormControl>

                {/* Confirm Password */}
                <FormControl className="mt-4 d-block mb-4" variant="standard">
                  <label className=" mb-2 d-block" htmlFor="ConfirmPassword">
                    Confirm Password
                  </label>
                  <FilledInput
                    className={`${styleRegister.textField} `}
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
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                        {errors.confirmPassword && (
                    <Alert className=" mt-1" severity="error"> 
                                        {errors.confirmPassword.message?.toString()}

                    
                  </Alert>
                 
                  )}
                </FormControl>

                {/* Profile Image */}
                <div className="input-group mb-3">
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
                 
                  )}

              

            
                <Button className=" w-100" variant="contained" type="submit">
                      {" "}
                      {loadingBtn ? (
                      <CircularProgress  color="inherit" />

                      ) : (
                        "                  Sign up                        "
                      )}
                </Button>
      
              </form>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              className={`${styleRegister.imgRe}`}
              src={imgRegister}
              alt=""
            />
          </div>
        </div>
      </Container>
    </>
  );
}
