import { TextField, FormControl, FormLabel, Button } from "@mui/material";
import { useForm } from "react-hook-form";
export default function ChangePassword() {
  type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmPassword:string
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data :FormValues) => {
    // Handle password change logic here
    console.log(data);

    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl sx={{display:"block"}}>
        <FormLabel sx={{color:"black"}}>Current Password</FormLabel>
        <TextField
        variant="filled" 
        sx={{backgroundColor :"#bdb8b891"  , color:"#00000021"}}
        autoFocus
        margin="dense"
        label="Current Password"
        type="password"
        fullWidth
        {...register("oldPassword", { required: true })}
        error={errors.oldPassword ? true : false}
        helperText={errors.currentPassword && "OldPassword is required"}
      />
      
      </FormControl>
      <FormControl sx={{display:"block"}}>
        <FormLabel sx={{color:"black"}}>New Password</FormLabel>
        <TextField
        variant="filled" 
            sx={{backgroundColor :"#bdb8b891",color:"#00000021"}}
        margin="dense"
        label="New Password"
        type="password"
        fullWidth
        {...register("newPassword", { required: true })}
        error={errors.newPassword ? true : false}
        helperText={errors.newPassword && "New password is required"}
      />  
      </FormControl>
  
      <FormControl sx={{display:"block"}}>
        <FormLabel sx={{color:"black"}}>Confirm Password </FormLabel>
        
        <TextField
        variant="filled" 
            sx={{backgroundColor :"#bdb8b891" ,color:"#00000021"}}
        margin="dense"
        label="Confirm New Password"
        type="password"
        fullWidth
        {...register("confirmPassword", { required: true })}
        error={errors.confirmPassword ? true : false}
        helperText={errors.confirmPassword && "Please confirm new password"}
      />
      </FormControl>
      <Button sx={{mt:1 , width :"100%" , marginLeft :"auto" , backgroundColor :"#e770706c"}}  color="error" variant="outlined" type="submit">Change </Button>
    </form>
  );
}
