import {
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Flex, Button, Typography, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { ReactNode, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserData } from "./LoginComponent";
import { AppContext, AppContextType } from "../App";

interface SideBarProps {
  children: ReactNode;
}

const SideBar = ({ children }: SideBarProps) => {
  const { setLoggedInUser, loggedInUser } = useContext(
    AppContext
  ) as AppContextType;

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const item: MenuProps["items"] = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home Page</Link>,
    },
    {
      key: "/dashboard",
      icon: <UnorderedListOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      danger: true,
      onClick: () => {
        localStorage.removeItem("user");
        navigate("/");
      },
    },
  ];
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") ?? "");
    const result = JSON.parse(localStorage.getItem("users") ?? "").find(
      (x: UserData) => x.username === user.username
    );
    setLoggedInUser(result);
  }, [setLoggedInUser]);
  return (
    <Layout style={{ backgroundColor: "#242424" }} hasSider>
      <Sider breakpoint="lg">
        <Flex
          style={{
            backgroundColor: "white",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem",
          }}
          align="center"
        >
          {loggedInUser && (
            <>
              <Button shape="circle" icon={<UserOutlined />} size="large" />
              <Flex vertical className="profile">
                <Typography.Text>{`${loggedInUser?.name?.firstName} ${loggedInUser?.name?.lastName}`}</Typography.Text>
                <span style={{ fontSize: "12px", color: "gray" }}>
                  {loggedInUser?.email}
                </span>
              </Flex>
            </>
          )}
        </Flex>
        <Menu
          items={item}
          style={{ height: "100vh" }}
          selectedKeys={[currentPath]}
        />
      </Sider>
      {children}
    </Layout>
  );
};

export default SideBar;
