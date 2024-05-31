import { useValidateToken } from "@/services/queries";
import { useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";

type AppContextType = {
  isLoggedIn: boolean | undefined;
  setLoggedIn: (loggedIn: boolean) => void;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const querClient = useQueryClient();
  const { data, isLoading, error } = useValidateToken();
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && !error) {
      setLoggedIn(data?.verified);
    }
  }, [data, isLoading, error]);

  const handleSetLoggedIn = (loggedIn: boolean) => {
    setLoggedIn(loggedIn);
    querClient.invalidateQueries({ queryKey: ["validateToken"] });
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: loggedIn,
        setLoggedIn: handleSetLoggedIn,
      }}
    >
      {!isLoading && children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
