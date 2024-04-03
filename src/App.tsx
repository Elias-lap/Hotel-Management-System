import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import ForgotPassword from './AuthModule/Components/ForgotPassword/ForgotPassword';
import Login from './AuthModule/Components/Login/Login';
import Register from './AuthModule/Components/Register/Register';
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword';
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount';
import Dashboard from './DshboardModule/Components/Dashboard/Dashboard';
import AuthLayout from './ShareModule/Components/AuthLayout/AuthLayout';
import MasterLayout from './ShareModule/Components/MasterLayout/MasterLayout';
import NotFound from './ShareModule/Components/NotFound/NotFound';
import Layout from './ShareModule/Components/Layout/Layout';



function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element:  <AuthLayout/>,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Layout  /> },
        { path: 'login', element: <Login  /> },
        { path: 'forgot-Pass', element: <ForgotPassword /> },
        { path: 'reset-Pass', element: <ResetPassword/> },
        { path: 'register', element: <Register/> },
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

        
        
        
      ],
    },
  ]);

  return (
    <>
     < RouterProvider router={routes} /> 
    </>
  )
}

export default App
