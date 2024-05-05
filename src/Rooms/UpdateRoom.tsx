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
  Typography, // تضمين Typography
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

  facilities: string[];
}

export default function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState([]);
  const { ListFacility, getFacility } = useContext(contextFacility);

  const [images, setImages] = useState<File[]>([]);
const [currentImages, setCurrentImages] = useState<string[]>([]); 

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  setImages(files);

  const newImagesPreview = files.map(file => URL.createObjectURL(file));
  setCurrentImages(newImagesPreview);
};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const formData = await prepareFormData(data);
    formData.append("currentImages", JSON.stringify(watch("imgs")));
    return formData;
  };

  const prepareFormData = async (data: FormData) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);

    if (Array.isArray(data.facilities)) {
      data.facilities.forEach((facility) => {
        formData.append("facilities[]", facility);
      });
    }

    for (let i = 0; i < images.length; i++) {
      formData.append("imgs", images[i]);
    }

    return formData;
  };

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("room is not authenticated");
        }
        const response = await axios.get(
          `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (response) {
          const roomData = response.data.data.room;
          setValue("roomNumber", roomData.roomNumber);
          setValue("price", roomData.price);
          setValue("capacity", roomData.capacity);
          setValue("discount", roomData.discount);
          const selectedFacilities = Array.isArray(roomData?.facilities)
            ? roomData.facilities.map((f: any) => f._id)
            : [];
          setValue("facilities", selectedFacilities);
          setValue("imgs", roomData.images);
        } else {
          console.log("Error retrieving room details:", response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRoomDetails();
  }, []);

  const handleUpdate = async (data: FormData) => {
    const formData = await onSubmit(data);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("room is not authenticated");
      }

      const response = await axios.put(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(`Room Updated Successfully`);
      navigate("/dashboard/rooms");
    } catch (error: any) {
      console.log("Error updating rooms: ", error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container>
        <Box sx={{marginTop:"3rem"}}>
          <Form onSubmit={handleSubmit(handleUpdate)}>
            <TextField
              sx={{ width: 1, mb: 4 }}
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
              <Alert sx={{ mt: 1 }} severity="error">
                {errors.roomNumber.message}
              </Alert>
            )}

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: 1, mb: 4 }}
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
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.price.message}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: 1, mb: 4 }}
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
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.capacity.message}
                  </Alert>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  sx={{ width: 1, mb: 4 }}
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
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.discount.message}
                  </Alert>
                )}
              </Grid>

              <Grid item xs={6}>
                <FormControl
                  sx={{ padding: "5px", minWidth: 120, width: "98%" }}
                >
                  <InputLabel id="facilities-label">Facilities</InputLabel>
                  <Select
                    labelId="facilities-label"
                    id="facilities"
                    label="facilities"
                    multiple
                    value={watch("facilities") || []}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const valueToSet = Array.isArray(selectedValue)
                        ? selectedValue
                        : [selectedValue];
                      setValue("facilities", valueToSet, {
                        shouldValidate: true,
                      });
                    }}
                    sx={{ width: "100%" }}
                    renderValue={(selected) => (
                      <div>
                        {(selected as string[]).map((value) => (
                          <span key={value} style={{ marginRight: "8px" }}>
                            {ListFacility.find(
                              (facility) => facility._id === value
                            )?.name || ""}
                          </span>
                        ))}
                      </div>
                    )}
                  >
                    {ListFacility.map((facility) => (
                      <MenuItem key={facility._id} value={facility._id}>
                        <Checkbox
                          checked={watch("facilities")?.includes(facility._id)}
                        />
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

            {/* <div>
              <Box>
                <label htmlFor="upload-input">
                  <Button
                    className={`${styleRooms.btnFile}`}
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    component="span"
                  >
                    Upload Images
                  </Button>
                </label>
                <input
                  id="upload-input"
                  onChange={handleImageChange}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                />
             {images.length > 0 && (
  <div style={{ marginTop: "20px" }}>
    {images.map((file, index) => {
      if (file) {
        return (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            alt={`Selected ${index + 1}`}
            style={{
              maxWidth: "80%",
              maxHeight: "100px",
              margin: "5px",
            }}
          />
        );
      }
      return null;
    })}
  </div>
)}

              </Box>
              {errors.imgs && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.imgs.message}
                </Alert>
              )}
            </div> */}

<Grid container spacing={2}>
              <Grid item xs={12}>
          

              <label htmlFor="upload-input">
  <Button
    className={`${styleRooms.btnFile}`}
    variant="contained"
    startIcon={<CloudUploadIcon />}
    component="span"
  >
    Upload Images
  </Button>
</label>
<input
  id="upload-input"
  onChange={handleImageChange}
  type="file"
  multiple
  accept="image/*"
  style={{ display: "none" }}
/>


                <div>
                {/* {images.length > 0 && (
  <div>
    {images.map((image, index) => (
      <img
        key={index}
        src={URL.createObjectURL(image)}
        alt={`Selected Image ${index}`}
        style={{ maxWidth: "100px", margin: "5px" }}
      />
    ))}
  </div>
)} */}

                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                {watch("imgs") && (
                  <div>
                    {watch("imgs").map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Current Image ${index}`}
                        style={{ maxWidth: "100px", margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
              </Grid>
            </Grid>


            <Box sx={{textAlign:"end"}}>
              <Button  variant="contained" type="submit">
                Update
              </Button>
            </Box>
          </Form>
        </Box>
      </Container>
    </>
  );
}
