import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const contextBooking = createContext<{
  getBooking: () => Promise<void>;
  ListBooking: any[];
}>({ getBooking: () => Promise.resolve(), ListBooking: [] });

export function RoomBooking({ children }: React.PropsWithChildren<{}>) {
  const [ListBooking, setListBooking] = useState([]);
  const [loading, setLoading] = useState(false);

const getBooking = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/booking?page=1&size=10`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
        },
      }
    );
    setListBooking(response?.data?.data);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

  useEffect(() => {
    getBooking();

  }, []);

  useEffect(() => {
    console.log(ListBooking);
  }, [ListBooking]);

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
