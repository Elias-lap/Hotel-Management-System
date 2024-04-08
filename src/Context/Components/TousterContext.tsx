import React, { ReactNode, createContext } from "react";
import { toast } from "react-toastify";

interface IToastTypes {
  showToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void ;
}

const Toast = createContext<IToastTypes | undefined>(undefined);

const ToastContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define functions to show different types of toast notifications
  const showToast = (message: string) => {
    toast(message);
  };

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  // Define the context value
  const contextValue: IToastTypes = {
    showToast,
    showSuccessToast,
    showErrorToast,
  };

  return (
    <Toast.Provider value={contextValue}>
      {children}
    </Toast.Provider>
  );
};


export { ToastContextProvider, Toast };
