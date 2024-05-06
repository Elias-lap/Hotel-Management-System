/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  FormControl,
  TextField,
  Alert,
  Box,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
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

  facilities: string[];
}

export default function UpdateRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { ListFacility } = useContext(contextFacility);

  const [images, setImages] = useState<File[]>([]);
  const [currentImages, setCurrentImages] = useState<File[]>([]);
  console.log(currentImages);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // Log the files to check if they are being captured correctly
    console.log("Selected files:", files);
    // Replace the current images with the new ones
    setImages(files);
    setCurrentImages(prevImages => [...prevImages, ...files]);
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
    // formData.append("currentImages", JSON.stringify(watch("imgs")));
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
          setCurrentImages(roomData.images);
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
      // If there are new images, replace the current images
      if (images.length > 0) {
        formData.delete("imgs"); // Remove existing images
        for (let i = 0; i < images.length; i++) {
          formData.append("imgs", images[i]); // Append new images
        }
      }

      const response = await axios.put(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      toast.success(`Room Updated Successfully`);
      navigate("/dashboard/rooms");
    } catch (error: any) {
      console.log("Error updating rooms: ", error.message);
      toast.error(error.message);
    }
  };

  {
    console.log("Current Images:", currentImages);
  }
  {
    (" ");
  }
  return (
    <>
      <Container>
        <Box sx={{ marginTop: "3rem" }}>
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
                {currentImages.length > 0 && (
                  <div>
                    {currentImages.map((image, index) => (
                      <img
                        key={index}
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`Previous Image ${index}`}
                        style={{ maxWidth: "100px", margin: "5px" }}
                      />
                    ))}
                  </div>
                )}
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "end" }}>
              <Button variant="contained" type="submit">
                Update
              </Button>
            </Box>
          </Form>
        </Box>
      </Container>
    </>
  );
}
