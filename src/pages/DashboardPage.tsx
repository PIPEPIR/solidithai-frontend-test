import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import SideBar from "../components/SideBar";

const DashboardPage = () => {
  return (
    <SideBar>
      <Content style={{ padding: 25, margin: 0, minHeight: 280 }}>
        <h1>Dashboard Page</h1>
      </Content>
    </SideBar>
  );
};

export default DashboardPage;
