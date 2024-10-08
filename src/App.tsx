import { ReactElement, useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Footer } from "antd/es/layout/layout";

function App(): ReactElement {
  const [isLoggedin, setIsLoggedin] = useState<Boolean>(false);

  return <>{!isLoggedin ? <LoginPage /> : <HomePage />}</>;
}

export default App;
