import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { contextRoom } from "../ContextForRooms/AllRooms";
import imgDelete from "../Img/Email.png";
import imgNOdata from "../Img/NOdata.jpg";
import NoImg from "../Img/NoImg.png";
import styleRooms from "./Rooms.module.css";

interface Column {
  id:
    | "roomNumber"
    | "images"
    | "price"
    | "discount"
    | "capacity"
    | "updatedAt"
    | "DropDownMenu";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number | string) => string;
}

const columns: readonly Column[] = [
  { id: "roomNumber", label: "Room Number", minWidth: 170 },
  { id: "images", label: "Images", minWidth: 170 },
  {
    id: "price",
    label: "Price",
    minWidth: 170,
    align: "left",
    format: (value: string | number) => {
      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      }
      return value;
    },
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 170,
    align: "left",
    format: (value: string | number) => {
      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      }
      return value;
    },
  },
  {
    id: "capacity",
    label: "capacity",
    minWidth: 170,
    align: "left",
    format: (value: string | number) => {
      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      }
      return value;
    },
  },
  {
    id: "updatedAt",
    label: "Date Created",
    minWidth: 170,
    align: "left",
    format: (value: string | number) => {
      if (typeof value === "number") {
        return value.toLocaleString("en-US");
      }
      return value;
    },
  },

  { id: "DropDownMenu", label: "", minWidth: 50 },
];

interface Data {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
  discount: string;
  capacity: string;
  updatedAt: string;
}

function createData(
  _id: string,

  roomNumber: string,
  images: string[],
  price: number,
  discount: string,
  capacity: string,
  updatedAt: string
): Data {
  return { _id, roomNumber, images, price, discount, capacity, updatedAt };
}

export default function Rooms() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { listDataRooms, getRooms } = useContext(contextRoom);
  // const { ListBooking ,getBooking} = useContext(contextBooking);
  // console.log(listDataRooms)

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    navigate(`/dashboard/updateRoom/${roomId}`);
    setAnchorEl(null);
  };

  const goNewRoom = () => {
    navigate("/dashboard/roomsData");
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
// Pagination

  useEffect(() => {
    setLoading(true);
    getRooms(page, 10000000000000000)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [rowsPerPage]);

  // const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchInput(event.target.value);
  // };

  const filteredRooms = listDataRooms.filter((room: any) => {
    return (
      room.roomNumber.toLowerCase().includes(searchInput.toLowerCase()) ||
      room.roomNumber === parseInt(searchInput)
    );
  });

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    setLoading(true); // Start loading when the search input changes
    setTimeout(() => {
      setLoading(false); // Stop loading after a timeout (simulating search request)
    }, 1000); // Adjust the timeout as needed
  };

  // delete

  const handleDeleteRoom = (roomId: string) => {
    setSelectedRoomId(roomId); // Set the selected room ID
    setDeleteModalOpen(true); // Open the delete modal
  };

  // const handleDeleteConfirmed = async () => {
  //   setLoading(true)
  //   try {
  //  let del= await axios.delete(
  //       `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${selectedRoomId}`,
  //       {
  //         headers: {
  //           // Authorization: localStorage.getItem("Token"),
  //           Authorization:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
  //         },
  //       }
  //     );
  //     await getRooms(1, 10);
  //     setDeleteModalOpen(false);
  //     // console.log(del.data.message)
  //     toast.success(del.data.message)
  //   } catch (error) {
  //     console.error("Error deleting room:", error);
  //     toast.error(error?.response?.data.message)

  //   }
  // };


  const handleDeleteConfirmed = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("room is not authenticated");
    }
    
    await axios.delete(
      `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${selectedRoomId}`,
      {
        headers: {
          Authorization: token,

        },
      }
    );
    await getRooms(1, 10);
    setDeleteModalOpen(false);
    toast.success("Room deleted successfully!");
  } catch (error:any) {
    console.error("Error deleting room:", error);
    toast.error(error?.response?.data.message);
  } finally {
    setLoading(false);
  }
};


  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false); // Close the delete modal
  };

  // drop down
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const toggleBox = (roomId: string) => {
    setIsOpen({ ...isOpen, [roomId]: !isOpen[roomId] });
  };

  // view

  const [viewModalOpen, setViewModalOpen] = useState(false); // State for view modal
  const [selectedRoomData, setSelectedRoomData] = useState<Data | null>(null); // State to hold selected room data

  // Other states and functions...
  // ...

  const handleViewRoom = (roomData: Data) => {
    setSelectedRoomData(roomData);
    setViewModalOpen(true);
  };


  return (
    <>
      {/* <Container> */}
        <Grid sx={{px:5, mt:2 , display:"flex", justifyContent:"space-between"}} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Rooms Table Details
            </Typography>
            
            <Typography variant="body1">You can check all details</Typography>
           
          </Grid>
          <Button onClick={goNewRoom} sx={{ px: 5 }} variant="contained">
              Add New Room
            </Button>
          {/* <Grid item xs={12} md={6} textAlign="right">
            <Button onClick={goNewRoom} sx={{ px: 5 }} variant="contained">
              Add New Room
            </Button>
          </Grid> */}
        </Grid>

        
          <Grid sx={{ my: 4, px:5, width:{xs:"75%", md:"50%"} }}  spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper
                component="form"
                sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
              >
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search by number ..."
                  inputProps={{ "aria-label": "search google maps" }}
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInput}
                />
              </Paper>
            </Grid>
          </Grid>

       
            {/* <Paper sx={{ width: "100%", overflow: "hidden", mt: 5 }}> */}
            <TableContainer
              // component={Paper}
              sx={{ paddingX: 3, width: "100%" }}
            >
              <Table  sx={{ minWidth: 400 }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{ backgroundColor: "#bdbdbd" }}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            py: 2,
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : filteredRooms.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length}>
                        {/* <Typography variant="body1" align="center">
                            No data
                          </Typography> */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img style={{ width: "50%" }} srcSet={imgNOdata} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRooms
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((room: Data) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={room.roomNumber}
                        >
                          <TableCell align="left">{room.roomNumber}</TableCell>
                          <TableCell align="left">
                            {room.images && room.images.length > 0 ? (
                              <img
                                className="rounded-3"
                                src={room.images[0]}
                                alt={room.roomNumber}
                                style={{ width: "4rem", height: "4rem" }}
                              />
                            ) : (
                              <img
                                className="rounded-3"
                                src={NoImg}
                                alt={"not img"}
                                style={{ width: "4rem", height: "4rem" }}
                              />
                            )}
                          </TableCell>
                          <TableCell align="left">{room.price}</TableCell>
                          <TableCell align="left">{room.discount}</TableCell>
                          <TableCell align="left">{room.capacity}</TableCell>
                          <TableCell align="left">
                            {room.updatedAt.split("T")[0]}
                          </TableCell>
                          <TableCell align="left">
                            <Button
                              aria-controls={`menu-${room._id}`}
                              aria-haspopup="true"
                              onClick={() => toggleBox(room._id)}
                            >
                              <MoreHorizIcon
                                className={`${styleRooms.iconDropdown}`}
                              />
                            </Button>
                            <Box sx={{ position: "relative" }}>
                              <Box
                                sx={{
                                  display: isOpen[room._id] ? "block" : "none",
                                  backgroundColor: "#fff",
                                  position: "absolute",
                                  top: "0px",
                                  right: "0",
                                  zIndex: "1000",
                                  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                                  borderRadius: "8px",
                                  padding: "8px",
                                }}
                              >
                                <MenuItem onClick={() => handleViewRoom(room)}>
                                  <RemoveRedEyeIcon
                                    sx={{ me: 1 }}
                                    className={`${styleRooms.iconsAction} `}
                                  />
                                  View
                                </MenuItem>

                                <MenuItem
                                  onClick={() => handleSelectRoom(room._id)}
                                >
                                  <BorderColorIcon
                                    sx={{ me: 1 }}
                                    className={`${styleRooms.iconsAction}`}
                                  />
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleDeleteRoom(room._id)}
                                >
                                  <DeleteOutlineIcon
                                    className={`${styleRooms.iconsAction} me-1`}
                                  />
                                  Delete
                                </MenuItem>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredRooms.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {/* </Paper> */}
         
       
      {/* </Container> */}

      {/* delete */}
      <Container>
        <Box>
          <Modal
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={deleteModalOpen}
            onClose={handleCloseDeleteModal}
          >
            <Box
              sx={{
                width: 640,
                bgcolor: "background.paper",
                p: 2,
                margin: "auto",
              }}
            >
              <Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img srcSet={imgDelete} alt=" delete" />
                </Box>

                <Box
                  sx={{
                    textAlign: "center ",
                    marginTop: "1.3rem",
                    marginBottom: "1.3rem",
                  }}
                >
                  Delete This Room ?
                  <Typography variant="caption" display="block" gutterBottom>
                    are you sure you want to delete this item ? if you are sure
                    just click on delete it{" "}
                  </Typography>
                </Box>
              </Typography>
              <Button onClick={handleDeleteConfirmed}>Delete</Button>
              <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            </Box>
          </Modal>
        </Box>
      </Container>

      {/* view */}

      <Modal open={viewModalOpen} onClose={() => setViewModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 400,
          }}
        >
          {selectedRoomData && (
            <>
              <Typography
                sx={{ textAlign: "center", color: "#01579b" }}
                variant="h6"
                gutterBottom
              >
                Room Details
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Room Number: {selectedRoomData.roomNumber}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Price: {selectedRoomData.price}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Discount: {selectedRoomData.discount}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Capacity: {selectedRoomData.capacity}
              </Typography>
              {/* Add more details as needed */}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
