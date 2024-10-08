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
import { useEffect, useState } from "react";

const users = [
  {
    username: "test123",
    password: "123",
  },
];

interface User {
  username: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [user, setUser] = useState<User>({ username: "", password: "" });

  useEffect(() => {}, [isFilled]);

  useEffect(() => {
    console.log(user, isFilled);

    if (user.password && user.username) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }, [user]);

  return (
    <Card>
      <Form layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          validateFirst={true}
          required
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            allowClear
            value={user?.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
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
        <Link onClick={() => alert("not implemented")}>Create account</Link>
      </Typography.Text>
    </Card>
  );
};

export default LoginComponent;
