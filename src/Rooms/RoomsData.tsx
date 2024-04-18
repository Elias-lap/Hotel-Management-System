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
    Autocomplete,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem
  } from "@mui/material";
  import styleRooms from "./Rooms.module.css";
  import { useForm } from "react-hook-form";
  import CloudUploadIcon from "@mui/icons-material/CloudUpload";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { useContext, useEffect, useState } from "react";
  import { contextRoom } from "../ContextForRooms/AllRooms";
  import { useNavigate } from "react-router-dom";
  import { SubmitHandler, FieldValues } from "react-hook-form";
  import { contextFacility } from "../RoomFacilityContext/RoomFacility";
  
  interface FormData {
    roomNumber: string;
    price: string;
    capacity: string;
    discount: string;
    facilities: string;
    imgs: [],}
  
  export default function RoomsData() {
    const { listDataRooms } = useContext(contextRoom);
    const navigate = useNavigate();
  
    const { ListFacility, getFacility } = useContext(contextFacility);
    // console.log(ListFacility);
  
    const [selectedFacility, setSelectedFacility] = useState('');
    const [error, setError] = useState('');
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>({
      defaultValues: {
        roomNumber: '',
        price: '',
        capacity: '',
        discount: '',
        facilities: '',
        imgs: [], 
      },
    });
    
    // navigate
  
    const goRooms = () => {
      navigate("/dashboard/rooms");
    };
  
  
    const onSubmit = async (data: FormData) => {
      console.log(data.imgs)
      
      // Check if Facilities is selected
      if (!selectedFacility) {
        setError('Facilities is required');
        return;
      }
    
      // Reset error state if Facilities is selected
      setError('');
    
      try {
        // Add selectedFacility to data object
        data.facilities = [selectedFacility];
    
        // Continue with form submission
        const response = await axios.post(
          `https://upskilling-egypt.com:3000/api/v0/admin/rooms`,
          data,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
            },
          }
        );
        console.log(response);
    
        toast.success(`You Add a New Room`);
        goRooms();
      } catch (error) {
        console.log(error);
        toast.error(`You Can't Add New Room`);
      }
    };
    
   
    const handleChange = (event) => {
      setSelectedFacility(event.target.value);
      setError('');
    };
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        setUploadedImage(file);
        console.log(file)
      }
    };
  
  
  
    return (
      <>
        <div className=" container">
          <form encType=" multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            {/* Room Number*/}
            <FormControl className="mt-4 d-block" variant="standard">
              <TextField
                className={`${styleRooms.textField} w-100`}
                hiddenLabel
                id="name"
                variant="filled"
                type="text"
                placeholder="Enter Your Name"
                {...register("roomNumber", {
                  required: "Room Number is required",
                })}
              />
              {errors.roomNumber && (
                <Alert className=" mt-1" severity="error">
                  {errors.roomNumber.message?.toString()}
                </Alert>
              )}
  
              {/* price /capacity */}
              <div className=" row my-3">
                {/* price */}
                <div className=" col-md-6">
                  <TextField
                    className={`${styleRooms.textField} w-100`}
                    hiddenLabel
                    id="name"
                    variant="filled"
                    type="number"
                    placeholder="Price"
                    {...register("price", {
                      required: "price is required",
                    })}
                  />
                  {errors.price && (
                    <Alert className=" mt-1" severity="error">
                      {errors.price.message?.toString()}
                    </Alert>
                  )}
                </div>
  
                {/* capacity */}
  
                <div className=" col-md-6">
                  <TextField
                    className={`${styleRooms.textField} w-100`}
                    hiddenLabel
                    id="name"
                    variant="filled"
                    type="number"
                    placeholder="Capacity"
                    {...register("capacity", {
                      required: "capacity is required",
                    })}
                  />
                  {errors.capacity && (
                    <Alert className=" mt-1" severity="error">
                      {errors.capacity.message?.toString()}
                    </Alert>
                  )}
                </div>
              </div>
  
              {/* discount /facilities */}
              <div className=" row my-3">
                {/* discount */}
                <div className=" col-md-6">
                  <TextField
                    className={`${styleRooms.textField} w-100`}
                    hiddenLabel
                    id="name"
                    variant="filled"
                    type="number"
                    placeholder="Discount"
                    {...register("discount", {
                      required: "Discount is required",
                    })}
                  />
                  {errors.discount && (
                    <Alert className=" mt-1" severity="error">
                      {errors.discount.message?.toString()}
                    </Alert>
                  )}
                </div>
  
                {/* facilities */}
  
                <div className=" col-md-6">
           
      <FormControl error={!!error} fullWidth>
        <InputLabel id="facilities-label">Facilities</InputLabel>
        <Select
          labelId="facilities-label"
          id="facilities"
          value={selectedFacility}
          onChange={handleChange}
          fullWidth
        >
          {ListFacility.map((fac) => (
            <MenuItem key={fac._id} value={fac._id}>{fac.name}</MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText>{error}</FormHelperText>
        )}
      </FormControl>
  
                </div>
              </div>
  
              <div>
                
            
              {/* Upload Room Image */}
              <div>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Room Image
                  <input
    type="file"
    className="visually-hidden"
    {...register("imgs", {
      required: "Room image is required",
      validate: {
        fileFormat: (value) =>
          Array.from(value).every((file: File) =>
            ["image/jpeg", "image/png"].includes(file.type)
          ) 
      },
    })}
    onChange={handleImageChange}
  />
  
                </Button>
                {errors.imgs && (
                  <Alert className="mt-1" severity="error">
                    {errors.imgs.message}
                  </Alert>
                )}
                {/* Display uploaded image */}
                {uploadedImage && (
                  <img
                  className=" w-25"
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded Image"
  
                  />
                )}
              </div>
              </div>
  
              <div className={`${styleRooms.line}`}></div>
  
              <div className=" row justify-content-end mt-5">
                <div className=" col-md-3">
                  <Button variant="outlined">Cancel</Button>
  
                  <span className=" mx-2"></span>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </div>
              </div>
            </FormControl>
          </form>
        </div>
      </>
    );
  
  }
  