import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { useContext, useEffect } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Form, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { contextFacility } from "../RoomFacilityContext/RoomFacility";

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
  // console.log(id);
  
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectedFacility, setSelectedFacility] = useState([]);
  const { ListFacility } = useContext(contextFacility);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
console.log(data);

    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
        data,
        {
          headers: {
            Authorization: token,"Content-Type": "multipart/form-data",
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

  const getRoomDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
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
        // console.log(roomData);
        setValue("roomNumber", roomData.roomNumber);
        setValue("price", roomData.price);
        setValue("capacity", roomData.capacity);
        setValue("discount", roomData.discount);
        const selectedFacilities = Array.isArray(roomData?.facilities)
          ? roomData.facilities.map((f: any) => f._id)
          : [];

        setValue("facilities", selectedFacilities);
      } else {
        // console.log("Error retrieving room details:", response);
      }
    } catch (error) {
      // console.log(error);
    }
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

            <Button  variant="contained" type="submit">
              Update
            </Button>
          </Form>
        </Box>
      </Container>
    </>
  );
}
