import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface ContextRoom {
  getRooms: (page: number, size: number) => Promise<any>;
  listDataRooms: any[];
  pagesArray:number[],
}
export const contextRoom = createContext<ContextRoom>({
  getRooms: async () => {},
  listDataRooms: [],
  pagesArray:[],

});




export function AllRooms({ children }: React.PropsWithChildren<{}>) {
  const [listDataRooms, setlistDataRooms] = useState([]);
  const [pagesArray, setPagesArray] = useState<any>();

  const getRooms = async (page: number, size: number ) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/rooms",{   headers: {
          Authorization: token,
        },
          params: {
            page: page,
            size: size,
          },
        } );

      // console.log(response?.data.data.rooms);
      const responseData = response?.data?.data?.rooms;
      const totalPages = response?.data?.totalNumberOfPages;
      const pagesArray = Array.from(Array(totalPages).keys()).map(
        (num) => num + 1
      );
      setlistDataRooms(responseData);
      setPagesArray(pagesArray);
      return responseData;
    } catch (error) {
      console.error("Error rooms:", error);
    }
  };
  useEffect(() => {
    getRooms(1, 10);
  }, []);

  // useEffect(() => {
  //   console.log(listDataRooms);
  // }, [listDataRooms]);


  return (
    <contextRoom.Provider
      value={{
        getRooms,
        listDataRooms,
        pagesArray
      }}
    >
      {children}
    </contextRoom.Provider>
  );
}
