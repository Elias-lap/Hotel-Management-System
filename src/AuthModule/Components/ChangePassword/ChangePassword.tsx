import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  FormControl,
  FormLabel,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  createTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/Components/AuthContext";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
type Props ={
  handleCloseDialog : ()=>void
}


export default function ChangePassword({ handleCloseDialog }: Props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00000021',
      },
      secondary: {
        main: '#bdb8b891',
      },
      // Add more colors as needed
    },
  });
  // Inside your component function
  const authContextValue = useContext(AuthContext); // Get the context value
  const baseUrl: string | undefined = authContextValue
    ? authContextValue.baseUrl
    : undefined;

const [spinner, setSpinner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  // for showing current password
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // for showing New password
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  // for showing confirm New password
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const handleClickShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };
  // Custom validation function to check if passwords match
  const validatePasswordMatch = (value: unknown) => {
    const password = watch("newPassword"); // Get the value of the "password" field
    return value === password ? true : "Passwords do not match"; // Return error message if passwords don't match
  };
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // Handle password change logic here
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setSpinner(true)
    // const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjEzZWZlZTZlYmJiZWZiYzE5ZjAwZmYiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMjU4MjY4NCwiZXhwIjoxNzEzNzkyMjg0fQ.M887Vp9SsT7OzO_fbw0acuL1PzADMB4v03Tf0DdD9Vo"
    try {
      const response = await axios.post(
        `${baseUrl}/v0/admin/users/change-password`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.message);
      toast.success("Password has been updated successfully");
      handleCloseDialog()
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    }finally{
      setSpinner(false)
    
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{ display: "block" }}>
        <FormLabel sx={{ color: "black" }}>Current Password</FormLabel>
        <TextField
          variant="filled"
          sx={{ backgroundColor: theme.palette.secondary.main ,  color: theme.palette.primary.main }}
          autoFocus
          margin="dense"
          label="Current Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("oldPassword", { required: true })}
          error={errors.oldPassword ? true : false}
          helperText={errors.oldPassword && "OldPassword is required"}
        />
      </FormControl>
      <FormControl sx={{ display: "block" }}>
        <FormLabel sx={{ color: "black" }}>New Password</FormLabel>
        <TextField
          variant="filled"
          sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}
          margin="dense"
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowNewPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("newPassword", { required: true })}
          error={errors.newPassword ? true : false}
          helperText={errors.newPassword && "New password is required"}
        />
      </FormControl>

      <FormControl sx={{ display: "block" }}>
        <FormLabel sx={{ color: "black" }}>Confirm Password </FormLabel>
        <TextField
          variant="filled"
          sx={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main}}
          margin="dense"
          label="Confirm New Password"
          type={showConfirmNewPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmNewPassword}
                  edge="end"
                >
                  {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("confirmPassword", {
            required: "Please confirm new password",
            validate: validatePasswordMatch,
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword && errors.confirmPassword.message}
          
        />
      </FormControl>
      <Button
        sx={{
          mt: 1,
          width: "100%",
          marginLeft: "auto",
        }}
      
        variant="contained"
        type="submit"
      >
         {spinner ? <CircularProgress size={24} color="inherit" /> : 'Change'}
        
      </Button>
    </form>
  );
}
