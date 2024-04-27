import axios from "axios";
import { createContext, useEffect, useState } from "react";




export const contextDashBoard = createContext<{
  dataDashboard: number[];
  numberForFacilities: number[];
  numberForRooms: number[];
  numberForAds: number[];
  userData: number[];
  adminData: number[];
  pendingBookings: number[];
  completedBookings: number[];
}>({
  dataDashboard: [],
  numberForFacilities: [],
  numberForRooms: [],
  numberForAds: [],
  userData: [],
  adminData: [],
  pendingBookings: [],
  completedBookings: [],
});

export function DashBoardRoom({ children }: React.PropsWithChildren<{}>) {
  const [dataDashboard, setDataDashboard] = useState<number[]>([]);
  const [numberForRooms, setnumberForRooms] = useState<number[]>([]);
  const [numberForFacilities, setnumberForFacilities] = useState<number[]>([]);
  const [numberForAds, setnumberForAds] = useState<number[]>([]);
  const [userData, setUserData] = useState<number[]>([]);
  const [adminData, setAdminData] = useState<number[]>([]);
  const [pendingBookings, setpendingBookings] = useState<number[]>([]);
  const [completedBookings, setcompletedBookings] = useState<number[]>([]);


  const getDashboard = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/dashboard`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZThkNDZlYmJiZWZiYzE5ZWUyNmIiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxMzcxMTEyMCwiZXhwIjoxNzE0OTIwNzIwfQ.LuBp9Ozojer7JYXXlw5xmiKu4iyoAL7IXS8crsYPVN0",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDataDashboard(response.data.data);
      setnumberForRooms(response.data.data.rooms);
      setnumberForFacilities(response.data.data.facilities);
      setnumberForAds(response.data.data.ads);
      setUserData(response.data.data.users.user)
      setAdminData(response.data.data.users.admin)
      setpendingBookings(response.data.data.bookings.pending)
      setcompletedBookings(response.data.data.bookings.completed)


      console.log(dataDashboard);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDashboard()
  }, []);

  useEffect(() => {
    console.log(dataDashboard);
  }, [dataDashboard]);

  return (
    <contextDashBoard.Provider
      value={{
        dataDashboard,
        numberForFacilities,
        numberForRooms,
        numberForAds,
        userData,
        adminData,
        pendingBookings,
        completedBookings

      }}
    >
      {children}
    </contextDashBoard.Provider>
  );
}
