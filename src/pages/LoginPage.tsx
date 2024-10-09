import { createContext, useState, type ReactElement } from "react";
import LoginComponent from "../components/LoginComponent";
import { RegisterModal } from "../components/RegisterModal";

export interface LoginPageContextType {
  openRegister: boolean;
  setOpenRegister: (value: boolean) => void;
}

export const LoginPageContext = createContext<LoginPageContextType | null>(
  null
);

export default function LoginPage(): ReactElement {
  const [openRegister, setOpenRegister] = useState<boolean>(false);

  return (
    <div className="login-page">
      <LoginPageContext.Provider value={{ openRegister, setOpenRegister }}>
        <LoginComponent />
        <RegisterModal open={openRegister} />
      </LoginPageContext.Provider>
    </div>
  );
}
