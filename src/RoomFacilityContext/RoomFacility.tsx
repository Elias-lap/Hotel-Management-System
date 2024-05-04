import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const contextFacility = createContext<{
  getFacility: () => Promise<void>;
  ListFacility: any[];
}>({ getFacility: () => Promise.resolve(), ListFacility: [] });

export function RoomFacility({ children }: React.PropsWithChildren<{}>) {
  const [ListFacility, setListFacility] = useState([]);
  const [loading, setLoading] = useState(false);

const getFacility = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities?pageSize=10&pageNumber=1`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
        },
      }
    );
    setListFacility(response?.data?.data?.facilities);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
};

  useEffect(() => {
    getFacility();

  }, []);

  // useEffect(() => {
  //   console.log(ListFacility);
  // }, [ListFacility]);

  return (
    <contextFacility.Provider
      value={{
        getFacility,
        ListFacility,
      }}
    >
      {children}
    </contextFacility.Provider>
  );
}
