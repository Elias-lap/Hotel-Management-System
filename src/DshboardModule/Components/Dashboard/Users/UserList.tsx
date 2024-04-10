import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Context/Components/AuthContext";
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
import { CircularProgress, IconButton, Typography } from "@mui/material";

interface IUser {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  country: string;
  createdAt: string; 
  role : string
}
interface IUserDetails {
  createdAt: string;
  role: string;
}
export default function UserList() {
  const [loading, setLoading] = useState(false); // Add the loading state variable
  const [UserList, setUserList] = useState<IUser[]>([]);
  const [UserListDetails, setUserListDetails] = useState<IUserDetails>({
    createdAt: "",
    role: "",
  }); // Updated state declaration
  const dateTimeString = UserListDetails.createdAt;
  const dateTime = new Date(dateTimeString);

  const formattedDate = dateTime.toLocaleDateString(); // Format the date portion
  const formattedTime = dateTime.toLocaleTimeString(); // Format the time portion

  console.log("Formatted Date:", formattedDate);
  console.log("Formatted Time:", formattedTime);
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

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    setLoading(true)
    try {
      const response = await axios.get(
        `${baseUrl}/v0/admin/users?page=1&size=10`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data.data.users);
      setUserList(response.data.data.users);
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
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: "30px",
              textAlign: "center",
              color: theme.palette.primary.dark,
            }}
          >
            User Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ color: theme.palette.primary.dark }}
                    >
                      Created At:
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2" color="initial">
                      {formattedDate}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ color: theme.palette.primary.dark }}
                    >
                      Time:
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2" color="initial">
                      {formattedTime}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>
                    <Typography
                      variant="body2"
                      color="initial"
                      sx={{ color: theme.palette.primary.dark }}
                    >
                      UserRole:
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2" color="initial">
                      {UserListDetails.role}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
      {loading ? ( // Display the spinner while loading is true
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </div>
    ) : (
      <TableContainer component={Paper} sx={{ paddingX: 2, width: "100%" }}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>userName</StyledTableCell>
              <StyledTableCell>email</StyledTableCell>
              <StyledTableCell>phoneNumber</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell>
                {" "}
                <Visibility />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {UserList?.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  {user.userName}
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.phoneNumber}</StyledTableCell>
                <StyledTableCell>
                  {
                    <img
                      src={user.profileImage}
                      alt={user.userName}
                      style={{ width: "50px", height: "auto" }}
                    />
                  }
                </StyledTableCell>
                <StyledTableCell>{user.country}</StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <IconButton
                    onClick={() => {
                      handleClickOpen(),
                        setUserListDetails({
                          createdAt: user.createdAt,
                          role: user.role,
                        }); //
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
