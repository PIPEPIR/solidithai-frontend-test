import { Button, Flex, Layout, Menu, MenuProps, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType } from "../App";
import { Content, Header } from "antd/es/layout/layout";
import SideBar from "../components/SideBar";

export default function HomePage() {
  const { loggedInUser } = useContext(AppContext) as AppContextType;

  useEffect(() => {
    console.log(loggedInUser);
  }, []);

  return (
    <SideBar>
      <Content style={{ padding: 25, margin: 0, minHeight: 280 }}>
        <h1>Home Page</h1>
      </Content>
    </SideBar>
  );
}
