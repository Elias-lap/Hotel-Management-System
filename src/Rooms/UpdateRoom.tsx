import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  FormControl,
  TextField,
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
  CircularProgress,
  Grid,
  Container,
} from "@mui/material";


import styleRooms from "./Rooms.module.css";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { contextFacility } from "../RoomFacilityContext/RoomFacility";
import { Form, useNavigate, useParams } from "react-router-dom";


interface FormData {
    roomNumber: string;
    price: string;
    capacity: string;
    discount: string;
    imgs: FileList;
  
    facilities: string;
  }

export default function UpdateRoom() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState([]);
    const { ListFacility, getFacility } = useContext(contextFacility);
    

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
      } = useForm<FormData>();


    
    


  

    const onSubmit = async (data: FormData) => {

        try {
          const response = await axios.put(`https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,data, {
            headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
              },
            
          });
          console.log(response);
          toast.success(`Room Updated Successfully`);
          navigate("/dashboard/rooms");
        } catch (error) {
          console.error("Error updating rooms: ", error);
          toast.error(`Failed to update rooms`);
        }
      };

      const getRoomDetails = async () => {
        try {
          const response = await axios.get(`https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`, {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
            },
          });
    
          if (response) {
            const roomData = response.data.data.room;
            console.log(roomData)
            setValue("roomNumber", roomData.roomNumber);
            setValue("price", roomData.price);
            setValue("capacity", roomData.capacity);
            setValue("discount", roomData.discount);
            const selectedFacilities = roomData?.facilities?.map((f) => f._id) || [];
            setValue("facilities", selectedFacilities);
          } else {
            console.log("Error retrieving room details:", response);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const goBack = () => {
        navigate(-1);
      };

      useEffect(() => {
        getRoomDetails();
    
       
      }, []);


      // 


      
    
      
  return (
    <>
        <Container>
        <Box>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
                              sx={{ width: 1 ,mb: 4}}

              hiddenLabel
              id="roomNumber"
              variant="filled"
              type="text"
              placeholder="Room Number"
              {...register("roomNumber", {
                required: "Room Number is required",
              })}
            />
            {errors.roomNumber && (
              <Alert sx={{mt: 1}}  severity="error">
                {errors.roomNumber.message}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField
                              sx={{ width: 1 ,mb: 4}}
                              hiddenLabel
                  id="price"
                  variant="filled"
                  type="number"
                  placeholder="Price"
                  {...register("price", {
                    required: "Price is required",
                  })}
                />
                {errors.price && (
              <Alert sx={{mt: 1}}  severity="error">
              {errors.price.message}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} md={6}>

              <TextField
                              sx={{ width: 1 ,mb: 4}}
                              hiddenLabel
                  id="capacity"
                  variant="filled"
                  type="number"
                  placeholder="Capacity"
                  {...register("capacity", {
                    required: "Capacity is required",
                  })}
                />
                {errors.capacity && (
              <Alert sx={{mt: 1}}  severity="error">
              {errors.capacity.message}
                  </Alert>
                )}
              </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField
                              sx={{ width: 1 ,mb: 4}}
                              hiddenLabel
                  id="discount"
                  variant="filled"
                  type="number"
                  placeholder="Discount"
                  {...register("discount", {
                    required: "Discount is required",
                  })}
                />
                {errors.discount && (
              <Alert sx={{mt: 1}}  severity="error">
              {errors.discount.message}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={6}>
                <FormControl sx={{ padding: "5px", minWidth: 120, width: '98%' }}>
                  <InputLabel id="facilities-label">Facilities</InputLabel>


                  <Select
                    labelId="facilities-label"
                    id="facilities"
                    label="facilities"
                    multiple
                    value={watch('facilities') || []}
                    onChange={(e) => setValue('facilities', e.target.value, { shouldValidate: true })}
                    sx={{ width: '100%' }}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <span key={value} style={{ marginRight: '8px' }}>
                            {ListFacility.find((facility) => facility._id === value)?.name || ''}
                          </span>
                        ))}
                      </div>
                    )}

                  >
                    {ListFacility.map((facility) => (
                      <MenuItem key={facility._id} value={facility._id}>
                        <Checkbox checked={watch('facilities')?.includes(facility._id)} />
                        <ListItemText primary={facility.name} />
                      </MenuItem>
                    ))}
                  </Select>

                </FormControl>
                {errors.facilities && errors.facilities.type === "required" && (
                  <Box className="errorMsg">Facilities are required</Box>
                )}
              </Grid>
            </Grid>


            <Container >
           

                <Button variant="contained" type="submit"
                  style={{ position: 'absolute', bottom: '30px', right: '20px' }} >
                  Update
                </Button>
              </Container>
          </Form>
        </Box>
      </Container>
      
    </>
  )
}
