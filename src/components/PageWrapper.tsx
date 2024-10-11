import { Layout } from "antd";
import { ReactNode } from "react";
import SideBar from "./SideBar";
import { Content } from "antd/es/layout/layout";

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <SideBar />
      <Content style={{ padding: "2rem" }}>{children}</Content>
    </Layout>
  );
};

export default PageWrapper;
