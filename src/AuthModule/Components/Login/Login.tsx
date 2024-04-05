// import React from "react";
// import { Box, Button, FormGroup, FormHelperText, Grid, Input, InputLabel, Paper, TextField, Typography } from "@mui/material";
// import { Link, useFormAction } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../Context/Components/AuthContext";

export default function Login() {
  const { loginData, savLoginData,baseUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data:any) => {
   
    await axios.post (`${baseUrl}/v0/admin/users/login`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);
           navigate("/layout");
           savLoginData();

        // console.log("token", response.data.data.token);
        console.log(loginData); 
        // console.log(baseUrl); 

      })
      .catch((error) => {
        console.log(error );
     
      });
  };
 
  return (
    <>

<div className="auth-cotainer vh-100 d-flex justify-content-center align-items-center">
  <div className="w-50 h-50 bg-info">
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  </div>
</div>
    </>
  );
}
