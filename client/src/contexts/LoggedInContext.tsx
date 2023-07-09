import React from "react";
import { LoginPage } from "../pages/LoginPage";
import { useUser } from "./UserContext";

const AuthedContext = React.createContext({});

export const useAuth = () => {
  const context = React.useContext(AuthedContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthedContextProvider`);
  }
  return context;
};

export const LoggedInContextProvider = ({ children }: any) => {
  const [isAuthed, setIsAuthed] = React.useState<boolean>(false);

  const [user] = useUser();

  React.useEffect(() => {
    if (!user) setIsAuthed(false);
    else setIsAuthed(true);
  }, [user]);

  return (
    <AuthedContext.Provider value={{ isAuthed, setIsAuthed }}>
      {isAuthed ? children : <LoginPage />}
    </AuthedContext.Provider>
  );
};
