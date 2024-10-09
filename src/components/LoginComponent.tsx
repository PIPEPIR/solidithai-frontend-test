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
import Link from "antd/es/typography/Link";
import {
  ContextType,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginPageContext, LoginPageContextType } from "../pages/LoginPage";

const users = [
  {
    username: "test123",
    password: "123",
  },
];

interface PersonName {
  firstName: string;
  lastName: string;
}

interface User {
  username: string;
  password: string;
}

export interface UserData extends User {
  name: PersonName;
  email: string;
}

const LoginComponent = (): ReactElement => {
  const { setOpenRegister } = useContext(
    LoginPageContext
  ) as LoginPageContextType;
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ username: "", password: "" });

  useEffect(() => {
    if (user.password && user.username) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [user]);

  return (
    <Card>
      <Form layout="vertical">
        <Form.Item label="Username" name="username">
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            allowClear
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
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
            <Tooltip title={!isFilled && "Please fill the form"}>
              <Button type="primary" htmlType="submit" disabled={!isFilled}>
                Login
              </Button>
            </Tooltip>
          </Flex>
        </Form.Item>
      </Form>
      <Divider />
      <Typography.Text>
        Do not have an account ?{" "}
        <Link onClick={() => setOpenRegister(true)}>Register</Link>
      </Typography.Text>
    </Card>
  );
};

export default LoginComponent;
