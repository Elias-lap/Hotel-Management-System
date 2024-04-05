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

export let AuthContext = createContext<IAuth | any>(null);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  const contextValue: IAuth = {
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
