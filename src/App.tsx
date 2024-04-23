import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPassword from "./AuthModule/Components/ForgotPassword/ForgotPassword";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import ADS from "./DshboardModule/Components/ADS/ADS";
import Booking from "./DshboardModule/Components/Booking/Booking";
import Dashboard from "./DshboardModule/Components/Dashboard/Dashboard";
import FacilitiesList from "./DshboardModule/Components/FacilitiesList/FacilitiesList";
import UserList from "./DshboardModule/Components/Users/UserList";
import AuthLayout from "./ShareModule/Components/AuthLayout/AuthLayout";
import Layout from "./ShareModule/Components/Layout/Layout";
import MasterLayout from "./ShareModule/Components/MasterLayout/MasterLayout";
import NotFound from "./ShareModule/Components/NotFound/NotFound";
import PortectedRoute from "./ShareModule/Components/PortectedRoute/PortectedRoute";

// import UserLayout from './userLayout/UserLayout';
import Landing from './userLayout/Landing';

import UserLayout from './userLayout/UserLayout';
import ExplorePage from "./userLayout/ExplorePage/ExplorePage";
import Favorites from "./userLayout/Favorites/Favorites";





function App() {
  const routes = createBrowserRouter([

 

    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Layout /> },
        { path: "layout", element: <Layout /> },
        { path: "login", element: <Login /> },
        { path: "reset-Pass", element: <ResetPassword /> },
        { path: "register", element: <Register /> },
        { path: "forgot-Pass", element: <ForgotPassword /> },
     

      ],
    },
    {
      path: "dashboard",
      element: (
        <PortectedRoute>
          <MasterLayout />
        </PortectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "facilitiesList", element: <FacilitiesList /> },
        { path: "UserList", element: <UserList /> },
        { path: "ADS", element: <ADS /> },
        { path: "Booking", element: <Booking /> },
     
      ],
    },
    {
      path: '/user',
      element: (<UserLayout />),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Landing /> },
        { path: 'landing', element: <Landing /> },
        { path: 'explore', element: <ExplorePage/> },
        { path: 'Favorites', element: <Favorites/> },
      ],
    },

 



  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
