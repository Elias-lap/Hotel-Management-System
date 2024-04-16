import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  TableBody,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/Components/AuthContext";
import "./FacilitiesList.css";
import noData1 from "../../../assets/images/noData.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IFacilities {
  _id: string;
  id: string;
  createdBy: any;
  name: string;
  updatedAt: string;
  // dateTime: string;

  createdAt: string | any;
  role: string;
}
export default function FacilitiesList() {
  const [facilitiesList, setFacilitiesList] = useState<IFacilities[]>([]);
  const [loading, setLoading] = useState(false); // Add the loading state variable
  // menu for Edit / update /
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
     id:string
  ) => {
    setAnchorEl(event.currentTarget);
    setFacilitiesId(id)
    // console.log(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  // Dialog for Add Or Edit
  const [openDialog, setOpenDialog] = React.useState("false");
  const [FacilitiesId, setFacilitiesId] = useState<string>("");

  const handleOpenAddDialo = () => {
    setOpenDialog("add-modal");
  };

  const handleOpenDeleteDialo = () => {
    setOpenDialog("delete");
    setAnchorEl(null); 
    // console.log(FacilitiesId);
  };
  const handleOpenUpdateDialo = () => {
    setOpenDialog("update");
    setAnchorEl(null); 
    getAllFacilitiesById()
   
  };
  const handleCloseDilaog = () => {
    setOpenDialog("false");
  };

  interface IFacility {
    name: string;
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFacility>();

  // getAllFacilities Data
  const getAllFacilities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/v0/admin/room-facilities`, {
        headers: requestHeaders,
      });
      // console.log(response.data.data.facilities);
      setFacilitiesList(response.data.data.facilities);
    } catch (error) {
      console.log("ssssssssss");
    } finally {
      setLoading(false);
    }
  };
  // ////////// getAllFacilities By Id to set in input
  const getAllFacilitiesById = async () => { 
  // console.log("test");
  
    try {
      const response = await axios.get(`${baseUrl}/v0/admin/room-facilities/${FacilitiesId?FacilitiesId:""}`, {
        headers: requestHeaders,
      });
      console.log(response.data.data.facility.name);
      setValue("name",response.data.data.facility.name);
    } catch (error) {
      console.log(error);
   
  };
}

  // ************Add Facility
  const onSubmit = async (data: IFacility) => {
    try {
      await axios.post(`${baseUrl}/v0/admin/room-facilities`, data, {
        headers: requestHeaders,
      });
      // console.log("5666666665");
      // console.log(response);
      getAllFacilities();
      handleCloseDilaog();
      toast.success("Add facilities success ");
    } catch (error) {
      console.log("reeeeee");
    }
  };
  /////// update
  const updateFacility = async (data: IFacility) => {
    try {
      await axios.put(`${baseUrl}/v0/admin/room-facilities/${FacilitiesId}`, data, {
        headers: requestHeaders,
      });
      // console.log("5666666665");
      // console.log(response);
      getAllFacilities();
      handleCloseDilaog();
      toast.success("Add facilities success ");
    } catch (error) {
      console.log("reeeeee");
    }
  };

  const deleteFacility = async (Id: string) => {
    setLoading(true);
    console.log(FacilitiesId);

    await axios
      // .delete(`${baseUrl}/v0/admin/room-facilities/${FacilitiesId}`, {
      .delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${Id}`,
        {
          headers: requestHeaders,
        }
      )
      .then((response) => {
        toast.success("Facility Delete Successfully");
        console.log(response);

        // setRoomsList(response.data.data.totalCount);
        // setRoomId(roomId);
        handleCloseDilaog();
        getAllFacilities();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllFacilities();
    
  }, []);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl, requestHeaders } = authContext;

  return (
    <>
      {/* Dialog for  ////////////////////Update  */}
      <Dialog
        open={openDialog === "update"}
        onClose={handleCloseDilaog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ mb: 4, mt: 1 }}>Update Facility</DialogTitle>
        <DialogContent sx={{ mt: 1, mb: 5 }}>
          <form style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                  <Grid container spacing={2}>
                    <TextField
                      {...register("name", {
                        required: true,
                      })}
                      margin="normal"
                      fullWidth
                      id="name"
                      label=" name"
                      name="name"
                      autoComplete="name"
                      // autoFocus
                    />
                    {errors.name && errors.name.type === "required" && (
                      <span className="errorMsg">Name is required</span>
                    )}
                  </Grid>
                </FormControl>
              </Grid>
              {/* You can add more Grid items for additional form elements */}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseDilaog}>Cancel</Button> */}

          {/* <DialogContent dividers></DialogContent> */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mb: 2,
              mt: 1,
              px: 4,
              backgroundColor: theme.palette.primary.dark,
            }}
            onClick={handleSubmit(updateFacility)}
            type="submit"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog === "add-modal"}
        onClose={handleCloseDilaog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ mb: 4, mt: 1 }}>Add Facility</DialogTitle>
        <DialogContent sx={{ mt: 1, mb: 5 }}>
          <form style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" sx={{ m: 1 }}>
                  <Grid container spacing={2}>
                    <TextField
                      {...register("name", {
                        required: true,
                      })}
                      margin="normal"
                      fullWidth
                      id="name"
                      label="name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                    />
                    {errors.name && errors.name.type === "required" && (
                      <span className="errorMsg">Name is required</span>
                    )}
                  </Grid>
                </FormControl>
              </Grid>
              {/* You can add more Grid items for additional form elements */}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseDilaog}>Cancel</Button> */}

          {/* <DialogContent dividers></DialogContent> */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mb: 2,
              mt: 1,
              px: 4,
              backgroundColor: theme.palette.primary.dark,
            }}
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* DELETE  */}
      <Dialog
        open={openDialog === "delete"}
        onClose={handleCloseDilaog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ mb: 4, mt: 1 }}></DialogTitle>
        <DialogContent
          sx={{
            mt: 1,
            mb: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={noData1} alt="Delete" />
          <Typography sx={{ my: 2 }} variant="h6">
            Delete This facility Room ?
          </Typography>
          <p>Are you sure you want to delete this facility ? </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDilaog}>Cancel</Button>

          {/* <DialogContent dividers></DialogContent> */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              mb: 2,
              mt: 1,
              px: 4,
              backgroundColor: theme.palette.error.dark,
            }}
            onClick={() => {
              deleteFacility(FacilitiesId);
            }}
            type="submit"
          >
            Delelte
          </Button>
        </DialogActions>
      </Dialog>
      {/* //// end Dialog  */}
      <div className="Header">
        <div>
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "20px", fontWeight: "bolder" }}
          >
            Facilities Table Details{" "}
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
              handleOpenAddDialo();
            }}
          >
            ADD New Facilities
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
                <TableCell> Name</TableCell>
                <TableCell>UpdatedAt</TableCell>
                <TableCell>createdAt</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {facilitiesList.map((facil) => (
                <TableRow key={facil._id}>
                  <TableCell component="th" scope="row">
                    {facil.name}
                  </TableCell>

                  <TableCell>
                    {new Date(facil?.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(facil?.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(event)=>handleClick(event,facil._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    {/* <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem
                      // onClick={() => showViewModal(facility?._id)}
                      >
                        <Tooltip title="View" arrow>
                          <IconButton color="primary">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </MenuItem>
                      <MenuItem>
                        <Tooltip title="Update" arrow>
                          <IconButton color="warning">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleOpenDeleteDialo();
                          setFacilitiesId(facil._id);
                        }}
                      >
                        <Tooltip title="Delete" arrow>
                          <IconButton color="error">
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </MenuItem>
                    </Menu> */}
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)&&FacilitiesId==facil._id}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => {handleOpenUpdateDialo(); setFacilitiesId(facil._id)}}>
                        <ListItemIcon
                          sx={{ color: theme.palette.primary.dark }}
                        >
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {handleOpenDeleteDialo();
                          setFacilitiesId(facil._id)}}
                      >
                        <ListItemIcon sx={{ color: "error.main" }}>
                          <DeleteIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
