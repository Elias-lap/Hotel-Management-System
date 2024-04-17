import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
// import { SubmitHandler } from "react-hook-form";
import StyleForgotPass from "./ForgotPassword.module.css";
import imgForgotPass from "../../../Img/forgotPass.png";

// Import components from MUI
import {
  Button,
  FormControl,
  TextField,
  Typography,

  Alert,
} from "@mui/material";


export interface FormDataRegister {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loadingBtn, setloadingBtn] = useState<boolean>(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>();

  const onSubmit = async (data:FormDataRegister) => {
    setloadingBtn(true);

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users/forgot-password",
        data
      );
  
      console.log(response);

      toast.success("Password reset request, already sent successfully ,check your email");

      navigate("/reset-Pass");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    // console.log(data)
    setloadingBtn(false);
  };

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
            <span className={`${StyleForgotPass.wordStay}`}> Stay</span>
            cation.
          </Typography>
            <div className="mt-4 ">
              <Typography variant="h6" component="h6">
                Forgot password{" "}
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you already have an account register <br />
                You can{" "}
                <span className={`${StyleForgotPass.wordLogin}`}>
                  Login here !
                </span>
              </Typography>

              <form
                className={`${StyleForgotPass.marginTop}`}
                onSubmit={handleSubmit(  onSubmit )}
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
