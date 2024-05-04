import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface ContextRoom {
  getRooms: (page: number, size: number) => Promise<any>;
  listDataRooms: any[];
}
export const contextRoom = createContext<ContextRoom>({
  getRooms: async (page, size) => {},
  listDataRooms: [],
});

export function AllRooms({ children }: React.PropsWithChildren<{}>) {
  const [listDataRooms, setlistDataRooms] = useState([]);
  const [pagesArray, setPagesArray] = useState<number[]>([]);

  const getRooms = async (page: number, size: number ) => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/rooms",
        {
          headers: {
            // Authorization: localStorage.getItem("Token"),
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzA0NzAyMiwiZXhwIjoxNzE0MjU2NjIyfQ.jvK-YQkaJxctH0fureUXfXfqoQv5Oft3WORMVWJFJAQ",
          },
          params: {
            page: page,
            size: size,

          },
        }
      );
    //   console.log(response.data.data.rooms);
      const responseData = response.data.data.rooms;
      const totalPages = response.data.totalNumberOfPages;
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
