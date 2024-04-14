import MoreVertIcon from "@mui/icons-material/MoreVert";
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
import { Grid } from "@mui/material";
import "./ADS.css";
import axios from "axios";
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  TableBody,
  useTheme,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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
export default function ADS() {
  const [ADSList, setADSList] = useState<ADS[]>([]);
  const [loading, setLoading] = useState(false); // Add the loading state variable
  // menu for Edit / update /
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = useTheme();
  // Dialog for Add Or Edit
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialo = () => {
    setOpenDialog(true);
  };

  const handleCloseDilaog = () => {
    setOpenDialog(false);
  };

  // fetching Data
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
  useEffect(() => {
    fetchData();
  }, []);
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl } = authContext;

  return (
    <>
      {/* Dialog for ADD ////////////////////Update  */}
      <Dialog open={openDialog} onClose={handleCloseDilaog} maxWidth="sm" fullWidth>
  <DialogTitle>ADS</DialogTitle>
  <DialogContent sx={{ mt: 1 }}>
    <form style={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <FormControl fullWidth variant="filled" sx={{ m: 1}}>
        <InputLabel id="demo-simple-select-filled-label">RooM Name</InputLabel>
        <Select
        sx={{borderBottom :"none"}}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={''}
          onChange={()=>{}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        {/* You can add more Grid items for additional form elements */}
      </Grid>
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDilaog}>Cancel</Button>
    <Button type="submit">Subscribe</Button>
  </DialogActions>
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
              handleClickOpenDialo();
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
                <TableCell>Room Number</TableCell>
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
                  <TableCell>{room.isActive === true ? "Yes" : "No"}</TableCell>

                  <TableCell>
                    <IconButton
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={() => {}}>
                        <ListItemIcon>
                          <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={() => {}}>
                        <ListItemIcon>
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
