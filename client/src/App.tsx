import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { SocketContextProvider } from "./contexts/SocketContext";
import { UserContextProvider } from "./contexts/UserContext";
import { LoggedInContextProvider } from "./contexts/LoggedInContext";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <UserContextProvider>
          <LoggedInContextProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <SocketContextProvider>
                      <HomePage />
                    </SocketContextProvider>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </BrowserRouter>
          </LoggedInContextProvider>
        </UserContextProvider>
      </div>
    </ChakraProvider>
  );
}

export default App;
