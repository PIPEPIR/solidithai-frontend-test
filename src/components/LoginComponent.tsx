import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Card,
  Divider,
  Form,
  Input,
  Button,
  Typography,
  Flex,
  Tooltip,
} from "antd";
import { ReactElement, useContext, useEffect, useState } from "react";
import { LoginPageContext, LoginPageContextType } from "../pages/LoginPage";
import { AppContext, AppContextType } from "../App";
import { useNavigate } from "react-router-dom";

const { Link, Text } = Typography;

interface PersonName {
  firstName: string;
  lastName: string;
}

interface User {
  username: string;
  password?: string;
}

export interface UserData extends User {
  name?: PersonName;
  email?: string;
}

export interface userToken {
  authorization: boolean;
  username: string;
}

const LoginComponent = (): ReactElement => {
  const { setOpenRegister } = useContext(
    LoginPageContext
  ) as LoginPageContextType;
  const { setIsLoggedIn } = useContext(AppContext) as AppContextType;

  const navigate = useNavigate();

  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isUsernameWrong, setIsUserNameWrong] = useState<boolean>(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ username: "", password: "" });

  const checkUser = (user: User) => {
    if (!!!localStorage.getItem("users")) {
      return alert("No user in The system. Please Register");
    } else {
      const users: UserData[] | null = JSON.parse(
        localStorage.getItem("users") ?? ""
      );
      if (!users?.some((x) => x.username === user.username)) {
        setIsUserNameWrong(true);
        return alert("Used does not exist ");
      } else {
        setIsUserNameWrong(false);
      }
      const FoundUser = users.find((x) => x.username === user.username);
      if (FoundUser?.password !== user.password) {
        setIsPasswordWrong(true);
        return alert("Wrong Password");
      }
      return true;
    }
  };

  const onLogin = () => {
    if (!checkUser(user)) {
      return;
    }
    /* this key shows that user is authorized through out the app access */
    const token: userToken = {
      authorization: true,
      username: user.username,
    };
    localStorage.setItem("user", JSON.stringify(token));
    setIsLoggedIn(true);
    navigate("/home");
  };

  useEffect(() => {
    if (user.password && user.username) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [user]);

  return (
    <Card>
      <Form layout="vertical" onFinish={onLogin}>
        <Form.Item
          label="Username"
          name="username"
          validateStatus={isUsernameWrong ? "error" : ""}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            allowClear
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          validateStatus={isPasswordWrong ? "error" : ""}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            allowClear
            value={user?.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="end">
            <Tooltip
              title={
                !isFilled &&
                ` Please Enter Your ${!user.username ? "Username" : ""} ${
                  !user.password ? "Password" : ""
                }`
              }
            >
              <Button type="primary" htmlType="submit" disabled={!isFilled}>
                Login
              </Button>
            </Tooltip>
          </Flex>
        </Form.Item>
      </Form>
      <Divider />
      <Text>
        Do not have an account ?{" "}
        <Link onClick={() => setOpenRegister(true)}>Register</Link>
      </Text>
    </Card>
  );
};

export default LoginComponent;
