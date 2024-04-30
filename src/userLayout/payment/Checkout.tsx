/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography } from "@mui/material";
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
import { useNavigate} from "react-router-dom";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  console.log(bookingDetails)
  // const { id } = useParams();
  const id ='65a9968ea5d9953dd42d11aa'
  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements?.getElement(CardElement);
    console.log(cardElement);
    if (!cardElement) {
      console.error("Card element not found");
      return;
    }
    const { error, token } = await stripe.createToken(cardElement);
    console.log(token);
    const tokenId = token?.id;

    const payBooking = async (id: string) => {
      await axios
        .post(
          `${baseUrl}/v0/portal/booking/${id}/pay`,
          { token: tokenId },
          {
            headers: {
              Authorization: `Bearer ${loginData}`,
            },
          }
        )
        .then((response) => {
          console.log(response);

          toast.success("Booking paid successfully");
          navigate("/");
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            toast.error(error.response.data.message);
          }
          console.log(error);
        });
    };
    payBooking("65a9968ea5d9953dd42d11aa");
    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(error.message);
    }
  };
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

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
          <Grid item lg={5}>
            <Typography variant="h4" color="initial">
              Transfer Pembayaran:
            </Typography>
          </Grid>

          <Grid item lg={5}>
            <form onSubmit={handleSubmit} style={{ width: "50%" }}>
              <AddressElement options={{ mode: "billing" }} />

              <CardElement />
              <button disabled={!stripe}>Submit</button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
