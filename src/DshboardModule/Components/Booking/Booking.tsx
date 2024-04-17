
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/Components/AuthContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Visibility } from "@mui/icons-material";
import { CircularProgress,  IconButton,  Typography } from "@mui/material";
import './Booking.css'

interface IUser {
  _id: string;
  room: {
    roomNumber: string;
    _id : string
  };
  status:string
  totalPrice: number;
  startDate: string; // Adjust the type according to the actual data type
  endDate: string;   // Adjust the type according to the actual data type
  user: {
    userName: string;
  };
  createdAt: string;
  role: string;
}

export default function Booking() {
  const [loading, setLoading] = useState(false); // Add the loading state variable
  const [booking, setbooking] = useState<IUser[]>([]);
  const [bookingStatus, setbookingStatus] = useState<string>();
  // const [UserListDetails, setUserListDetails] = useState<IUserDetails>({
  //   createdAt: "",
  //   role: "",

  
  
  // handel user detail
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&": {
      borderBottom: "none",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));



// fetching All Data 
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setLoading(true)
    try {
      const response = await axios.get(
        `${baseUrl}/v0/admin/booking?page=1&size=10`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setbooking(response.data.data.booking);
    } catch (error) {
      console.log("ssssssssss");
    }finally{
      setLoading(false)
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        
        </DialogTitle>
        <DialogContent>
        <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "30px",
              textAlign: "center",
              color: theme.palette.primary.dark,
            }}
          >
            Booking Status 👀 is {bookingStatus}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{ color: theme.palette.primary.dark }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <div className="Booking">
          <Typography
            variant="body1"
            color="initial"
            sx={{ fontSize: "20px", fontWeight: "bolder"  , margin :2}}
          >
            ADS Table Details{" "}
          </Typography>
          <Typography variant="body1" color="initial">
            You can check all details{" "}
          </Typography>
        </div>
      {loading ? ( // Display the spinner while loading is true
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </div>
    ) : (
      <TableContainer component={Paper} sx={{ paddingX: 2, width: "100%" }}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>room Number</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date </StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>
                {" "}
                <Visibility />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booking?.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {user.room?.roomNumber}
                </StyledTableCell>
                <StyledTableCell>{user.totalPrice}</StyledTableCell>
                <StyledTableCell>{new Date(user.startDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>{new Date(user.endDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>{user.user.userName}</StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <IconButton
                    onClick={() => {
                      handleClickOpen(),
                        
                        setbookingStatus (user.status)
                    }}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <Visibility />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
    
    </>
  );
}
