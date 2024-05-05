import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/Components/AuthContext";



export const contextFacility = createContext<{
  getFacility: () => Promise<void>;
  ListFacility: any[];
}>({ getFacility: () => Promise.resolve(), ListFacility: [] });

export function RoomFacility({ children }: React.PropsWithChildren<{}>) {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    // Handle the case where AuthContext is null
    return null;
  }
  const { baseUrl, requestHeaders } = authContext;

  const [ListFacility, setListFacility] = useState([]);
  const [loading, setLoading] = useState(false);

const getFacility = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities?pageSize=10&pageNumber=1`,
      {
        headers: requestHeaders,

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
    ListFacility

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
