import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { SubmitHandler, FieldValues } from "react-hook-form";
// Import image

import imgForgotPass from "../../../Img/forgotPass.png";

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
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Import CSS module
import styleResetPass from "./ResetPassword.module.css";
import { createTheme } from "@mui/material/styles";

export interface FormDataRegister {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

// mui color
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#eb5048 ",
      contrastText: "#000",
    },
  },
});
export default function ResetPassword() {
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoadingBtn(true);

    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users/reset-password",
        data
      );

      console.log(response);
      toast.success("Verification successful. Password reset initiated.");
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setLoadingBtn(false);
  };

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <Typography
              className={`${styleResetPass.ConStay}`}
              variant="h5"
              component="h5"
            >
              {/* <span className={`${styleRegister.wordStay}`}> Stay</span> */}
              <Box component="span" color="primary.main">
                Stay
              </Box>
              cation.
            </Typography>

            <div className="mt-4 ">
              <Typography className=" mb-3" variant="h6" component="h6">
                Reset Password{" "}
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you already have an account register <br />
                You can{" "}
                <Box  className={`${styleResetPass.wordLogin}`} component="span" color="#EB5148">
    Login here !
</Box>
              </Typography>

              <form
                onSubmit={handleSubmit(
                  onSubmit as SubmitHandler<FormDataRegister>
                )}
              >
                {/*Email */}
                <FormControl className="mt-4 d-block" variant="standard">
                  <label className="mb-3 d-block" htmlFor="email">
                    Email
                  </label>
                  <TextField
                    className={`${styleResetPass.textField} `}
                    hiddenLabel
                    id="email"
                    placeholder="Enter Your Email"
                    variant="filled"
                    type="email"
                    {...register("email", {
                      required: "email is required",
                    })}
                  />
                  {errors.email && (
                    <Alert className=" mt-1" severity="error">
                      {errors.email.message?.toString()}
                    </Alert>
                  )}
                </FormControl>

                {/*OTP */}
                <FormControl className="mt-4 d-block" variant="standard">
                  <label className="mb-3 d-block" htmlFor="seed">
                    OTP
                  </label>
                  <TextField
                    className={`${styleResetPass.textField} `}
                    hiddenLabel
                    id="seed"
                    placeholder="Enter Your OTP"
                    variant="filled"
                    type="text"
                    {...register("seed", {
                      required: "OTP is required",
                    })}
                  />
                  {errors.seed && (
                    <Alert className=" mt-1" severity="error">
                      {errors.seed.message?.toString()}
                    </Alert>
                  )}
                </FormControl>

                {/* Password */}
                <FormControl className="mt-4 d-block " variant="standard">
                  <label className=" mb-2" htmlFor="Password">
                    Password
                  </label>
                  <FilledInput
                    className={`${styleResetPass.textField} `}
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
                    className={`${styleResetPass.textField} `}
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

                {/* Submit Button */}
                {/* <Button className=" w-100" variant="contained" type="submit">
                  Sign up
                </Button> */}
                <Button className=" w-100" variant="contained" type="submit">
                  {" "}
                  {loadingBtn ? (
                    <RotatingLines
                      visible={true}
                      height="20"
                      width="20"
                      color="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      ariaLabel="rotating-lines-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Reset  "
                  )}
                </Button>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              className={`${styleResetPass.imgRe}`}
              src={imgForgotPass}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
