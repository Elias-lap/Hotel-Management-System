import { jwtDecode } from "jwt-decode";
import { ReactNode, createContext, useEffect, useState } from "react";

// Define the authentication data//
export interface IAuth {
  loginData: DecodedTokenType | null;
  savLoginData: () => void;
  userRole: string | null;
  requestHeaders: { Authorization:string},
  baseUrl: string;
  // updateUserData: () => void;
  // setUserRole: () => void;
}

interface DecodedTokenType {
  role: string;
}

<<<<<<< HEAD
export let AuthContext = createContext<IAuth | null>(null);
=======
export const AuthContext = createContext<IAuth |null >(null);
>>>>>>> 7eaf27871fefda29014ec51687af394031456aff

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [loginData, setloginData] = useState<DecodedTokenType | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const baseUrl="https://upskilling-egypt.com:3000/api";
  const requestHeaders = {
    Authorization: ` ${localStorage.getItem("userToken")}`,
  };

  const savLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    const decodedToken = jwtDecode(encodedToken!) as DecodedTokenType;
    setloginData(decodedToken);
    setUserRole(decodedToken.role);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      savLoginData();
    }
  }, []);

<<<<<<< HEAD
  const contextValue: IAuth | null = {
=======
  const contextValue: IAuth |null= {
>>>>>>> 7eaf27871fefda29014ec51687af394031456aff
    loginData,
    userRole,
    savLoginData,
    baseUrl,
    requestHeaders,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
