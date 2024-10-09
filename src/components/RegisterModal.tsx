import { Form, Input, Modal, Space, Tooltip, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { LoginPageContext, LoginPageContextType } from "../pages/LoginPage";
import { useForm, useWatch } from "antd/es/form/Form";
import { UserData } from "./LoginComponent";

interface RegisterModalProps {
  open: boolean;
}

export const RegisterModal = ({ open }: RegisterModalProps) => {
  const { setOpenRegister } = useContext(
    LoginPageContext
  ) as LoginPageContextType;
  const [form] = useForm();
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const userData: UserData | null = {
    username: useWatch("username", form),
    password: useWatch("password", form),
    name: {
      firstName: useWatch("firstName", form),
      lastName: useWatch("lastName", form),
    },
    email: useWatch("email", form),
  };

  useEffect(() => {
    if (
      userData.email &&
      userData.name.firstName &&
      userData.name.lastName &&
      userData.password &&
      userData.username
    ) {
      setIsFilled(true);
    } else [setIsFilled(false)];
  }, [userData]);

  const onRegister = () => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", "[]");
    }
    const users: UserData[] | null = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users") ?? "")
      : [];
    if (users?.some((user) => user?.username === userData.username)) {
      return alert("The username is taken");
    }
    users?.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    setOpenRegister(false);
  };
  return (
    <Modal
      open={open}
      onCancel={() => setOpenRegister(false)}
      okText={"Register"}
      onOk={onRegister}
      destroyOnClose
      okButtonProps={{ disabled: !isFilled, htmlType: "submit" }}
    >
      <div style={{ padding: "1rem", marginTop: "2rem" }}>
        <Space direction="vertical" size={"middle"}>
          <Typography.Text strong>Please Fill in the form</Typography.Text>
          <Form
            form={form}
            onFinish={() => setOpenRegister(false)}
            clearOnDestroy
          >
            <Form.Item label={"Username"} name={"username"} required>
              <Input placeholder="johndoe123" />
            </Form.Item>
            <Form.Item label={"Password"} name={"password"} required>
              <Input.Password />
            </Form.Item>

            <Space>
              <Form.Item label={"First Name"} name={"firstName"} required>
                <Input placeholder="John" />
              </Form.Item>
              <Form.Item label={"Last Name"} name={"lastName"} required>
                <Input placeholder="Doe" />
              </Form.Item>
            </Space>
            <Form.Item
              label={"Email"}
              required
              name={"email"}
              rules={[
                {
                  warningOnly: true,
                  type: "email",
                  message: "Your email is not in valid format",
                },
              ]}
            >
              <Input placeholder="johndoe1@example.com" />
            </Form.Item>
          </Form>
        </Space>
      </div>
    </Modal>
  );
};
