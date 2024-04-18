import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './AuthModule/Components/Login/Login';
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount';
import Dashboard from './DshboardModule/Components/Dashboard/Dashboard';
import AuthLayout from './ShareModule/Components/AuthLayout/AuthLayout';
import MasterLayout from './ShareModule/Components/MasterLayout/MasterLayout';
import NotFound from './ShareModule/Components/NotFound/NotFound';
import Layout from './ShareModule/Components/Layout/Layout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacilitiesList from './DshboardModule/Components/FacilitiesList/FacilitiesList';
import UserList from './DshboardModule/Components/Users/UserList';
import ADS from './DshboardModule/Components/ADS/ADS';
import Booking from './DshboardModule/Components/Booking/Booking';
import ForgotPassword from './AuthModule/Components/ForgotPassword/ForgotPassword';
import Register from './AuthModule/Components/Register/Register';
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword';




function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element:  <AuthLayout/>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Layout /> },
        { path: 'layout', element: <Layout  /> },
        { path: 'login', element: <Login  /> },
        { path: 'reset-Pass', element: <ResetPassword/> },
        { path: 'register', element: <Register/> },
        {path:"forgot-Pass",element:<ForgotPassword/>},
        { path: 'verifyAccount', element: <VerifyAccount /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        
          <MasterLayout />
       
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'facilitiesList', element: <FacilitiesList /> },
        

        { path: 'UserList', element: <UserList/> },
        { path: 'ADS', element: <ADS/> },
        { path: 'Booking', element: <Booking/> },
        
        
        
      ],
    },
  ]);

  return (
    <>
     < RouterProvider router={routes} /> 
     <ToastContainer/>

    </>
  )
}

export default App
