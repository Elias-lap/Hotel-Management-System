import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacilitiesList from './DshboardModule/Components/FacilitiesList/FacilitiesList';
import UserList from './DshboardModule/Components/Users/UserList';
import ADS from './DshboardModule/Components/ADS/ADS';
import Booking from './DshboardModule/Components/Booking/Booking';
import ForgotPassword from './AuthModule/Components/ForgotPassword/ForgotPassword';
import Register from './AuthModule/Components/Register/Register';
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword';
import UserLayout from './userLayout/UserLayout';
import Landing from "./userLayout/Landing";
import AuthLayout from "./ShareModule/Components/AuthLayout/AuthLayout";
import NotFound from "./ShareModule/Components/NotFound/NotFound";
import Layout from "./ShareModule/Components/Layout/Layout";
import Login from "./AuthModule/Components/Login/Login";
import MasterLayout from "./ShareModule/Components/MasterLayout/MasterLayout";
import Favorites from "./userLayout/Favorites/Favorites";

import ExplorePage from "./userLayout/ExplorePage/ExplorePage";


import Home from './Home/Home';
import { DashBoardRoom } from './DashBoardRoomContext/DashBoardRoom';
import RoomDetails from "./userLayout/RoomDetails/RoomDetails";



function App() {
  const routes = createBrowserRouter([

    {
      path: '/',
      element: (<UserLayout />),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Landing /> },
        { path: 'landing', element: <Landing /> },
        { path: 'explor/:state', element: <Landing /> },
        { path: 'explore', element: <ExplorePage/> },
        { path: 'Favorites', element: <Favorites/> },
        { path: 'RoomDetails/:id', element: <RoomDetails/> },
      ],
    },

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Layout/> },
        { path: 'layout', element: <Layout  /> },
        { path: 'login', element: <Login  /> },
        { path: 'reset-Pass', element: <ResetPassword/> },
        { path: 'register', element: <Register/> },
        {path:"forgot-Pass",element:<ForgotPassword/>},

      ],
    },
    {
      path: "dashboard",
      element: (
    
          <MasterLayout />
       
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'facilitiesList', element: <FacilitiesList /> },
        { path: 'UserList', element: <UserList/> },
        { path: 'ADS', element: <ADS/> },
        { path: 'Booking', element: <Booking/> },
        { path: "home", element: <Home /> },


        
        
        
      ],
    },
   

 



  ]);

  return (
    <>
     <DashBoardRoom>
      <ToastContainer />
     < RouterProvider router={routes} /> 
     </DashBoardRoom>
    </>
  );
}

export default App;
