import { Button, Card, Col, Row, Statistic, Typography } from "antd";
import { TeamOutlined, DashboardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import data from "../mock/GeneratedPeopleData.json";

const { Text, Title } = Typography;

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div
        style={{
          backgroundColor: "#001529",
          color: "#fff",
          padding: "4rem",
          borderRadius: "12px",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <Title style={{ color: "#fff", fontSize: "3rem" }}>
          Welcome to People Management Platform
        </Title>
        <Text style={{ color: "#fff", fontSize: "1.2rem" }}>
          Simple to manage your team or organization !
        </Text>
        <br />
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<DashboardOutlined />}
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/dashboard")}
        >
          Get Started
        </Button>
      </div>
      <Row
        gutter={16}
        style={{
          marginBottom: "2rem",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Users"
              value={data.length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#616a6b" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={data.filter((user) => user.isActive).length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Inactive Users"
              value={data.filter((user) => !user.isActive).length}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#e74c3c" }}
            />
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
}
