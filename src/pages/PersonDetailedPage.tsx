import { useNavigate, useParams } from "react-router-dom";
import { Typography, Card, Space, Row, Col, Button } from "antd";
import PageWrapper from "../components/PageWrapper";
import data from "../mock/GeneratedPeopleData.json";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Title } = Typography;

const PersonDetailedPage = () => {
  const { id } = useParams();
  const user = data.find((user) => user._id === id);
  const navigate = useNavigate();

  if (!user) {
    return (
      <PageWrapper>
        <Title>Error 404: User not found</Title>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Row justify="center" style={{ marginTop: "2rem" }}>
        <Col xs={24} sm={24} md={12}>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{ marginBottom: "1rem" }}
          >
            Back
          </Button>
          <Card title="User Details" bordered>
            <Space direction="vertical" size="middle">
              <Text strong>Name: </Text>
              <Text>{user.name}</Text>

              <Text strong>Age: </Text>
              <Text>{user.age}</Text>

              <Text strong>Gender: </Text>
              <Text>{user.gender}</Text>

              <Text strong>Company: </Text>
              <Text>{user.company}</Text>

              <Text strong>Email: </Text>
              <Text>{user.email}</Text>

              <Text strong>Phone: </Text>
              <Text>{user.phone}</Text>

              <Text strong>Address: </Text>
              <Text>{user.address}</Text>

              <Text strong>Registered: </Text>
              <Text>{dayjs(user.registered).format("DD-MM-YYYY HH:mm")}</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default PersonDetailedPage;
