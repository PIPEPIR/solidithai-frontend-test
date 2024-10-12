import { createContext, ReactElement, useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { UserData } from "./components/LoginComponent";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import PersonDetailedPage from "./pages/PersonDetailedPage";

export interface AppContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loggedInUser: UserData | undefined;
  setLoggedInUser: (value: UserData) => void;
}
export const AppContext = createContext<AppContextType | null>(null);

const CheckAuthentication = () => {
  const loggedIn = !!localStorage.getItem("user");
  return loggedIn;
};

function App(): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<UserData>();

  useEffect(() => {}, [isLoggedIn]);

  return (
    <>
      <AppContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser }}
      >
        {!CheckAuthentication() ? (
          <LoginPage />
        ) : (
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="user">
              <Route path=":id" element={<PersonDetailedPage />} />
            </Route>
          </Routes>
        )}
      </AppContext.Provider>
    </>
  );
}

export default App;
