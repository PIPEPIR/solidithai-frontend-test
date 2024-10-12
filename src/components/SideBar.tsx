import {
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Button, Typography, Menu, MenuProps, Tooltip } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserData } from "./LoginComponent";
import { AppContext, AppContextType } from "../App";

const { Text } = Typography;

const SideBar = () => {
  const { setLoggedInUser, loggedInUser } = useContext(
    AppContext
  ) as AppContextType;
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const onLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const item: MenuProps["items"] = [
    {
      key: "/home",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home Page</Link>,
    },
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      danger: true,
      onClick: () => {
        onLogOut();
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
    <Sider breakpoint="lg">
      <Flex
        style={{
          backgroundColor: "white",
          alignItems: "center",
          gap: ".5rem",
          padding: "1rem",
        }}
        align="center"
        justify="center"
      >
        {loggedInUser && (
          <>
            <Tooltip
              title={`${loggedInUser.name?.firstName} ${loggedInUser.name?.lastName}`}
              placement={"right"}
            >
              <Button shape="circle" icon={<UserOutlined />} size="large" />
            </Tooltip>

            <Flex vertical className="profile">
              <Text>{`${loggedInUser?.name?.firstName} ${loggedInUser?.name?.lastName}`}</Text>
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
        defaultSelectedKeys={["/home"]}
      />
    </Sider>
  );
};

export default SideBar;
