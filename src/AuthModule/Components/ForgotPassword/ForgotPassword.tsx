import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { SubmitHandler } from "react-hook-form";
import StyleForgotPass from "./ForgotPassword.module.css";
import imgForgotPass from "../../../Img/forgotPass.png";

// Import components from MUI
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Alert,
  Box,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

export interface FormDataRegister {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loadingBtn, setloadingBtn] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormDataRegister> = async (data) => {
    setloadingBtn(true);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users/forgot-password",
        data
      );

      console.log(response);

      toast.success(
        "Password reset request, already sent successfully ,check your email"
      );

      navigate("/reset-Pass");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    // console.log(data)
    setloadingBtn(false);
  };

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

  return (
    <>
      <div className="container my-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <Typography
              className={`${StyleForgotPass.ConStay} mb-5`}
              variant="h5"
              component="h5"
            >
              <Box component="span" color="primary.main">
                Stay
              </Box>
              cation.
            </Typography>
            <div className="mt-4 ">
              <Typography variant="h6" component="h6">
                Forgot password{" "}
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you already have an account register <br />
                You can{" "}
                {/* <span className={`${StyleForgotPass.wordLogin}`}>
                  Login here !
                </span> */}
                <Box
                  className={`${StyleForgotPass.wordLogin}`}
                  component="span"
                  color="#EB5148"
                >
                  Login here !
                </Box>
              </Typography>

              <form
                className={`${StyleForgotPass.marginTop}`}
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
                    className={`${StyleForgotPass.textField} `}
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
                    <Alert className=" mt-1" severity="error">
                      {errors.email.message?.toString()}
                    </Alert>
                  )}
                </FormControl>

                <Button
                  className=" w-100 mt-5"
                  variant="contained"
                  type="submit"
                >
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
                    "Send mail"
                  )}
                </Button>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <img
              className={`${StyleForgotPass.imgRe}`}
              src={imgForgotPass}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
