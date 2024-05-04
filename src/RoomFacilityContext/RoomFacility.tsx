import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const contextFacility = createContext<{
  getFacility: () => Promise<void>;
  ListFacility: any[];
}>({ getFacility: () => Promise.resolve(), ListFacility: [] });

export function RoomFacility({ children }: React.PropsWithChildren<{}>) {
  const [ListFacility, setListFacility] = useState([]);
  // const [loading, setLoading] = useState(false);

const getFacility = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }
 
  try {
    const response = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities?pageSize=10&pageNumber=1`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setListFacility(response?.data?.data?.facilities);
    console.log (response);
  
  } catch (error) {
   
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
