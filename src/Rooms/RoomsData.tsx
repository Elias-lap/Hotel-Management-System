/* eslint-disable @typescript-eslint/no-explicit-any */
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { contextFacility } from "../RoomFacilityContext/RoomFacility";
import styleRooms from "./Rooms.module.css";

interface FormData {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  imgs: FileList;
  facilities: string[];
}

export default function RoomsData() {
  const { ListFacility, getFacility } = useContext(contextFacility);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  // const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
  
    // Append new files to the existing images array
    setImages(prevImages => [...prevImages, ...files]);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const appendToFormData = (data: FormData) => {
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

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    if (
      data.discount &&
      data.price &&
      parseInt(data.discount) > parseInt(data.price)
    ) {
      setValue("discount", "", { shouldValidate: true });
      setValue("discount", data.discount, { shouldValidate: true });
      toast.error("Discount cannot be greater than the price.");
      setIsLoading(false);
      return;
    }

    if (
      data.discount !== undefined &&
      (parseInt(data.discount) < 0 || parseInt(data.discount) > 100)
    ) {
      toast.error("Discount must be between 0 and 100.");
      setIsLoading(false);
      return;
    }

    const addFormData = appendToFormData(data);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms`,
        addFormData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      toast.success(`You Added a New Room`);
      navigate("/dashboard/rooms");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("You Can't Add New Room");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFacility()
  
  
  }, [])
  

  return (
    <>
      <Container>
        <Form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ mt: 4, display: "block" }} variant="standard">
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

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
                <FormControl  fullWidth>
                  <InputLabel id="facilities-label">Facilities</InputLabel>
                  <Select
                    labelId="facilities-label"
                    id="facilities"
                    label="facilities"
                    multiple
                    value={watch("facilities") || []}
                    onChange={(e:any) =>
                      setValue("facilities", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    sx={{ width: "100%" }}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
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
                {errors.facilities && (
                  <Alert sx={{ mt: 1 }} severity="error">
                    {errors.facilities.message}
                  </Alert>
                )}
              </Grid>
            </Grid>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div>
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
                  multiple  // Allow multiple files to be selected
                  style={{ display: "none" }}
                />
                {images.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    {images.map((file, index) => (
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
                    ))}
                  </div>
                )}
              </Box>
              {errors.imgs && (
                <Alert sx={{ mt: 1 }} severity="error">
                  {errors.imgs.message}
                </Alert>
              )}
            </div>

            <Box
              sx={{ borderBottom: 1, borderColor: "divider" }}
              className={styleRooms.line}
            />

            <Grid container justifyContent="flex-end" mt={5}>
              <Grid item xs={12} md={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="outlined" onClick={goBack}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    {isLoading ? <CircularProgress size={25} color="inherit" /> : "Save"}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </FormControl>
        </Form>
      </Container>
    </>
  );
}
