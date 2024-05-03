/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography, Button } from "@mui/material";
import {
  CardElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/Components/AuthContext";
import { useLocation, useNavigate, useParams} from "react-router-dom";


const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  console.log(bookingDetails)
  const { id } = useParams<{ id: string }>();
  interface State {
    range?: any;
    // range?: [Date, Date];
  }

  const location = useLocation();
  const state = (location.state as State) || {};
  const totalPrice = state.id;
 
  const handleSubmit = async (event: any) => {
    try {
      // Prevent default form submission
      event.preventDefault();
  
      // Check if Stripe.js has loaded
      if (!stripe || !elements) {
        return;
      }
      // Get the card element
      const cardElement = elements?.getElement(CardElement);
      // Check if card element exists
      if (!cardElement) {
        console.error("Card element not found");
        return;
      }
      // Create token using Stripe
      const { error, token } = await stripe.createToken(cardElement);
      const tokenId = token?.id;
      // Pay booking with token
      if (error) {
        toast.error(error?.message, {
        
        });
      } else {
         payBooking(id, tokenId);
         toast.success("Booking paid successfully");
         navigate("/");
      }
  
      // If payment is successful, navigate to homepage

    } catch (error) {
      // Handle any errors during payment
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      }
      console.error(error);
    }
  };
  
  
  // Function to handle payment
  const payBooking = async (id: string, tokenId: string | undefined) => {
    try {
      // Make POST request to pay booking
      const response = await axios.post(
        `${baseUrl}/v0/portal/booking/${id}/pay`,
        { token: tokenId },
        {
          headers: {
            Authorization: `Bearer ${loginData}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      // Throw error for catch block in handleSubmit to handle
      throw error;
    }
  };
  // get room details 

  
  
  //  get booking details =>
    useEffect(() => {
      const getBookingDetails = async () => {
       
        try {
          const response = await axios.get(
            `${baseUrl}/v0/portal/booking/${id}`,
            {
              headers: {
                Authorization: `Bearer ${loginData}`,
              },
            }
          );
          setBookingDetails(response);
          console.log(response)
        } catch (error) {
          console.error("Error fetching booking details:");
       
        }
      };
  
      if (id) {
        getBookingDetails();
      }
    }, [id]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl, loginData } = authContext;

  return (
    <>
      <Typography sx={{ textAlign: "center" }} variant="h3" color="initial">
        Payment
      </Typography>
      <Typography
        sx={{ textAlign: "center", color: "gray" }}
        variant="h6"
        color="initial"
      >
        Kindly follow the instructions below
      </Typography>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" , alignItems:"center" }}>
        <Grid
          container
          sx={{
            justifyContent: "center",
            my: "10rem",
            width: "100%",
            textAlign: "center",
          }}
          lg={12}
        >
          <Grid  item xs={10} sm={10} md={10}  lg={5}>
            <Typography variant="h4" color="initial">
              Transfer Pembayaran:
            </Typography>
            <Typography  sx={{mt :"1rem" ,color :'gray'} }  variant="h4" color="initial">
            Total: {totalPrice} $
            </Typography>

          </Grid>

          <Grid  sx={{ mt: { xs: '1rem', sm: '1rem', lg: '1rem' ,xl :"0" } }}item xs={10} sm={10}  md={10} lg={3}>
            <form onSubmit={handleSubmit} >
              <AddressElement options={{ mode: "billing" }} />

              <CardElement />
              <Button  type="submit" sx={{width :"100%" , mt :"1rem"} } disabled={!stripe} variant="contained" color="primary">
              Submit
              </Button>
            </form>
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
