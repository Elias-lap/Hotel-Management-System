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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dashboardData, setDashboardData] = useState<{
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

      setDashboardData({
        dataDashboard: response.data.data,
        numberForRooms: response.data.data.rooms,
        numberForFacilities: response.data.data.facilities,
        numberForAds: response.data.data.ads,
        userData: response.data.data.users.user,
        adminData: response.data.data.users.admin,
        pendingBookings: response.data.data.bookings.pending,
        completedBookings: response.data.data.bookings.completed,
      });
      setLoading(false);
    } catch (error) {
      setError("Error fetching dashboard data");
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard()
  }, []);

  useEffect(() => {
    // console.log(dashboardData);
  }, [dashboardData]);

  return (
    <contextDashBoard.Provider
      value={{
        ...dashboardData,
        // loading,
        // error,
      }}
    >
      {children}
    </contextDashBoard.Provider>
  );
};