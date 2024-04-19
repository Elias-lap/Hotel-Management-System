<<<<<<< HEAD
=======

>>>>>>> LandingPage-StartBooking

import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/Components/AuthContext';


const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {

  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { loginData } = authContext;
  
  if (loginData == null && localStorage.getItem("token") == null) {
    return <Navigate to="/login" />;
  } else {
    return children; // Return the children directly
  }
};

export default ProtectedRoute;
