import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/Components/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ImageDelete from "../../../assets/images/noData.png";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Grid,
  // ListItemIcon,
  // ListItemText,
  // Popover,
  TextField,
} from "@mui/material";
// import IconButton from "@mui/material/IconButton";
import "./ADS.css";
import axios from "axios";
import {
  CircularProgress,
  TableBody,
  useTheme,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import MenuItem from "@mui/material/MenuItem";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
interface ADS {
  isActive: boolean;
  _id: string;
  room: {
    price: number;
    roomNumber: string;
    capacity: number;
    discount: number;
  };
}
interface IRooms {
  _id: string;
  roomNumber: string;
}

interface FormValues {
  room?: string;
  discount: number;
  isActive: string;
}
export default function ADS() {
  const [ADSList, setADSList] = useState<ADS[]>([]);
  const [RoomsList, setRoomsList] = useState<IRooms[]>([]);
  const [idAds, setIdads] = useState<string>("");
  console.log(idAds);
  const [TotalCountNumberRooms, setTotalCountNumberRooms] = useState<number>();
  const [loading, setLoading] = useState(false); // Add the loading state variable
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "update">("add");
  const [selectedADS, setSelectedADS] = useState<ADS | null>(null);
  console.log(selectedADS);
  // Function to handle opening the dialog for updating
  const handleClickOpenDialogForUpdate = (id: string) => {
    // Find the selected ADS item based on its ID
    const selectedADS = ADSList.find((ad) => ad._id === id);
    if (!selectedADS) {
      return;
    }

    setSelectedADS(selectedADS);
    setIdads(id); // Set the ID of the ADS to be updated
    setDialogMode("update");
    reset({
      discount: selectedADS.room.discount,
      isActive: selectedADS.isActive ? "true" : "false",
    });
    setOpenDialog(true);
  };
  // 1 -menu for Edit / update /
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [openPopover, setOpenPopover] = React.useState(false);
  // // Function to handle opening the menu
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpenPopover(true);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setOpenPopover(false);
  // };
  const theme = useTheme();
  //2- Dialog for Add Or Edit
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    reset({
      discount: 0,
      isActive: "", // Reset the isActive field
    });
  };

  const handleCloseDilaog = () => {
    setOpenDialog(false);
  };
  // 3- Modal for Delete
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);
  //  Reat Hook form for submiting Data
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { control } = useForm<FormValues>();
  // 1- fetching Data Get All ADS
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/v0/admin/ads`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data.ads);
      setADSList(response.data.data.ads);
    } catch (error) {
      console.log("ssssssssss");
    } finally {
      setLoading(false);
    }
  };

  //2- send Data to Add
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoadingSubmit(true);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const response = await axios.post(`${baseUrl}/v0/admin/ads`, data, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.message);
      toast.success("Advertisement has been added successfully.");
      handleCloseDilaog();
      fetchData();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoadingSubmit(false);
    }
    reset();
  };
  //3- get All room for select
  const totalRooms = String(TotalCountNumberRooms);
  const fetchDataAllRooms = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseUrl}/v0/admin/rooms?page=1&size=${totalRooms}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      setRoomsList(response.data.data.rooms);
      setTotalCountNumberRooms(response.data.data.totalCount);
    } catch (error) {
      console.log("ssssssssss");
    } finally {
      setLoading(false);
    }
  };

  // 4 Delete Ads ///////🐱‍🚀🐱‍🚀🐱‍🚀
  const DeleteData = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setLoadingSubmit(true);
    try {
      const response = await axios.delete(`${baseUrl}/v0/admin/ads/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      toast.success("Advertisement has been Deleted successfully.");
      fetchData();
      handleCloseModal();
    } catch (error) {
      toast.error("error");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // 5 Update the Ads
  const updateAds: SubmitHandler<FormValues> = async (data) => {
    setLoadingSubmit(true);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const payload = {
        discount: data.discount, // Include the discount field from the form data
        isActive: data.isActive, // Get the original isActive value for the updated ad
      };
      const response = await axios.put(
        `${baseUrl}/v0/admin/ads/${idAds}`,
        payload, // Send the payload with discount and isActive
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.message);
      toast.success("Advertisement has been updated successfully.");
      handleCloseDilaog();
      fetchData();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
    } finally {
      setLoadingSubmit(false);
    }
    reset();
  };

  useEffect(() => {
    fetchData();
    fetchDataAllRooms();
  }, []);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;

  return (
    <>
      {/* Modal For Delete  */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginY: "40px",
            }}
          >
            <img src={ImageDelete} alt="" style={{ width: "30%" }} />
          </Box>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, textAlign: "center" }}
          >
            Delete This Ads Room ?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 3, textAlign: "center" }}
          >
            are you sure you want to delete this item ? if you are sure just
            click on delete it
          </Typography>
          <Box sx={{ textAlign: "end", m: 2 }}>
            {loadingSubmit ? (
              <CircularProgress size={24} />
            ) : (
              <Button
                onClick={() => {
                  DeleteData(idAds);
                }}
                variant="contained"
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Modal>

      {/* end Modal Dialog */}
      {/* Dialog for ADD ////////////////////Update  */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDilaog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ m: 2 }}>ADS</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <form
            onSubmit={handleSubmit(dialogMode === "add" ? onSubmit : updateAds)}
            style={{ width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {dialogMode === "add" ? (
                  <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                    <InputLabel id="demo-simple-select-filled-label">
                      Room Name
                    </InputLabel>

                    <Controller
                      name="room" // Specify the name of the field
                      control={control} // Pass the control object
                      render={(
                        { field } // Render the Select component
                      ) => (
                        <Select
                          {...field} // Spread the field object to bind onChange and value
                          {...register("room")}
                          sx={{ borderBottom: "none" }}
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                        >
                          {RoomsList.map((room) => (
                            <MenuItem key={room._id} value={room._id}>
                              {room.roomNumber}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                ) : (
                  ""
                )}

                <TextField
                  {...register("discount", { required: true })}
                  error={errors.discount ? true : false}
                  helperText={errors.discount && "discount is required"}
                  fullWidth
                  label="Discount"
                  variant="filled"
                  sx={{ m: 1 }}
                />
                <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                  <InputLabel id="demo-simple-select-filled-label">
                    Active
                  </InputLabel>
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        {...register("isActive")}
                        sx={{ borderBottom: "none" }}
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        // value={field.value} // Bind the value to the field value
                        // value={selectedADS?.isActive ? "true" : "false"}
                      >
                        <MenuItem value={"true"}>Yes</MenuItem>
                        <MenuItem value={"false"}>No</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              {loadingSubmit ? (
                <CircularProgress size={24} />
              ) : (
                <Button variant="contained" type="submit" sx={{ m: 1 }}>
                  {dialogMode === "add" ? "Add" : "Save"}
                </Button>
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* //// end Dialog  */}
      <div className="Header-ADS">
        <div>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "20px", fontWeight: "bolder" }}
          >
            ADS Table Details{" "}
          </Typography>
          <Typography variant="body1" color="initial">
            You can check all details{" "}
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            sx={{ backgroundColor: theme.palette.primary.dark }}
            onClick={() => {
              handleClickOpenDialog();
              setDialogMode("add");
            }}
          >
            ADD New Ads
          </Button>
        </div>
      </div>
      {loading ? ( // Display the spinner while loading is true
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={60} />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ paddingX: 3, width: "100%" }}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.grey[400] }}>
                <TableCell>Room Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Active</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ADSList.map((room) => (
                <TableRow key={room._id}>
                  <TableCell component="th" scope="row">
                    {room.room.roomNumber}
                  </TableCell>
                  <TableCell>{room.room.price}</TableCell>
                  <TableCell>{room.room.discount}</TableCell>
                  <TableCell>{room.room.capacity}</TableCell>
                  <TableCell>{room.isActive ? "Yes" : "No"}</TableCell>

                  <TableCell>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        onClick={() => {
                          handleClickOpenDialogForUpdate(room._id);
                        }}
                        startIcon={<EditIcon />}
                        variant="text"
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          handleOpenModal();
                          setIdads(room._id);
                        }}
                        startIcon={<DeleteIcon />}
                        variant="text"
                        size="small"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                

                  {/* <TableCell>
                    <IconButton
                      id="basic-button"
                      aria-describedby={
                        openPopover ? "basic-popover" : undefined
                      }
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Popover
                      id="basic-popover"
                      anchorEl={anchorEl}
                      open={openPopover}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClickOpenDialogForUpdate(room._id);
                        }}
                      >
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleOpenModal();
                          setIdads(room._id);
                        }}
                      >
                        <ListItemIcon>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Popover>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
