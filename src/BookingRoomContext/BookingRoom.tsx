import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const contextBooking = createContext<{
  getBooking: () => Promise<void>;
  ListBooking: any[];
}>({ getBooking: () => Promise.resolve(), ListBooking: [] });

export function RoomBooking({ children }: React.PropsWithChildren<{}>) {
  const [ListBooking, setListBooking] = useState([]);
  // const [loading, setLoading] = useState(false);

const getBooking = async () => {
  const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
  
  try {
    const response = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/booking?page=1&size=10`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response);
    
    setListBooking(response?.data?.data);
   
  } catch (error) {
   
    console.log(error);
  }
};

  useEffect(() => {
    getBooking();

  }, []);

  return (
    <contextBooking.Provider
      value={{
        getBooking,
        ListBooking,
      }}
    >
      {children}
    </contextBooking.Provider>
  );
}
