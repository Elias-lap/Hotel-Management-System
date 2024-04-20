import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./AuthModule/Components/ForgotPassword/ForgotPassword";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount";
import Dashboard from "./DshboardModule/Components/Dashboard/Dashboard";
import AuthLayout from "./ShareModule/Components/AuthLayout/AuthLayout";
import MasterLayout from "./ShareModule/Components/MasterLayout/MasterLayout";
import NotFound from "./ShareModule/Components/NotFound/NotFound";
import Layout from "./ShareModule/Components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rooms from "./Rooms/Rooms";
import { AllRooms } from "./ContextForRooms/AllRooms";
import RoomsData from "./Rooms/RoomsData";
import { RoomFacility } from "./RoomFacilityContext/RoomFacility";
import UpdateRoom from "./Rooms/UpdateRoom";
import { RoomBooking } from "./BookingRoomContext/BookingRoom";
 
function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Layout /> },
        { path: "login", element: <Login /> },
        { path: "forgot-Pass", element: <ForgotPassword /> },
        { path: "reset-Pass", element: <ResetPassword /> },
        { path: "register", element: <Register /> },
        { path: "verifyAccount", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
      { index: true, element: <Dashboard />},
      { path: "rooms", element: <Rooms/> },
      { path: "roomsData", element: <RoomsData/> },

      { path: "updateRoom/:id?", element: <UpdateRoom/> },

    
    
  
      

    ],
    },
  ]);

  return (
    <>
    <RoomBooking>
    <RoomFacility>
     <AllRooms>


     <RouterProvider router={routes} />
      <ToastContainer />
     </AllRooms>
     </RoomFacility>
     </RoomBooking>

    </>
  );
}

export default App;
