import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  CircularProgress,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styleRooms from "./Rooms.module.css";
import axios from "axios";
import { contextRoom } from "../ContextForRooms/AllRooms";
import NoImg from "../Img/NoImg.png";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import MenuItem from "@mui/material/MenuItem";
// import { DropDownMenu } from "material-ui";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { dark } from "@mui/material/styles/createPalette";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";


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
  roomNumber: string;
  images: string[]; 
    price: number;
  discount: string;
  capacity: string;
  updatedAt: string;
}

function createData(
  roomNumber: string,
  images: string[],
    price: number,
  discount: string,
  capacity: string,
  updatedAt: string 
): Data {
  return { roomNumber, images, price, discount, capacity, updatedAt };
}

//=============================================== Rooms=========================================
export default function Rooms() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { listDataRooms ,getRooms} = useContext(contextRoom);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  // navigate
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
  

  // DropDownMenu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);



  useEffect(() => {
    setLoading(true); // Set loading state to true before fetching data
    getRooms(1, 10)
      .then(() => setLoading(false)) // Set loading state to false after fetching data
      .catch(() => setLoading(false)); // Set loading state to false if there's an error
  }, []);


  return (
    <>
      <div className="container">
        <div className="row d-flex">
          <div className="col-md-6">
            <Typography variant="h6" component="h2">
              Rooms Table Details
            </Typography>
            <p>You can check all details</p>
          </div>

          <div className="col-md-6 text-end">
            <Button
              onClick={goNewRoom}
              className={`${styleRooms.btnAdd} px-5`}
              variant="contained"
            >
              Add New Room
            </Button>
          </div>
        </div>

        <form className=" mt-3 row ">
          <div className=" col-md-6">
            <Paper
              className={`${styleRooms.sameHightForSelect}`}
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by number ..."
                inputProps={{ "aria-label": "search google maps" }}
                type="text"
              />
            </Paper>
          </div>
          <div className=" col-md-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // options={top100Films}
              renderInput={(params) => <TextField {...params} label="Tag" />}
            />
          </div>

          <div className=" col-md-3">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              // options={top100Films}
              renderInput={(params) => (
                <TextField {...params} label="Facilities" />
              )}
            />
          </div>

          {/* Table */}
          <div>
            <Paper className=" mt-5" sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                          
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {loading ? (
                      
                      <div className="position-absolute top-25 start-50 translate-middle">
                         <CircularProgress  color="inherit" />
                    </div>
                      ) : (
                  <TableBody>
                    {listDataRooms
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

                          {/* Dropdown */}
                          <TableCell align="left">
                            <Button
                              aria-controls="menu"
                              aria-haspopup="true"
                              onClick={(event) =>
                                setAnchorEl(event.currentTarget)
                              }
                            >
                              <MoreHorizIcon
                                className={`${styleRooms.iconDropdown}`}
                              />
                            </Button>
                            <Popover
                              id="menu"
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={() => setAnchorEl(null)}
                            >
                              <MenuItem
                                className="  "
                                onClick={createHandleMenuClick(
                                  "RemoveRedEyeIcon"
                                )}
                              >
                                <RemoveRedEyeIcon
                                  className={`${styleRooms.iconsAction} me-1`}
                                />
                                View
                              </MenuItem>
                              {/*  */}
                              <MenuItem
                                onClick={createHandleMenuClick(
                                  "Language settings"
                                )}
                              >
                                <BorderColorIcon
                                  className={`${styleRooms.iconsAction} me-1`}
                                />
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={createHandleMenuClick("Log out")}
                              >
                                <DeleteOutlineIcon
                                  className={`${styleRooms.iconsAction} me-1`}
                                />
                                Delete
                              </MenuItem>
                            </Popover>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>

)}

                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={listDataRooms.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </form>
      </div>
    </>
  );
}
