import { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Row,
  Col,
  Card,
  Space,
  Input,
  Checkbox,
  Button,
} from "antd";
import { ColumnsType } from "antd/es/table";
import data from "../mock/GeneratedPeopleData.json";
import PageWrapper from "../components/PageWrapper";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface DataType {
  _id: string;
  isActive: boolean;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  registered: string;
}

const Dashboard = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<boolean>(true);
  const [filteredData, setFilteredData] = useState<DataType[]>(data);

  const navigate = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      filters: [
        {
          text: "Male",
          value: "male",
        },
        {
          text: "Female",
          value: "female",
        },
      ],
      filterMultiple: true,
      onFilter: (value, r) => {
        return r.gender === value;
      },
      ellipsis: true,
      responsive: ["sm"],
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      ellipsis: true,
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      responsive: ["sm"],
    },
    {
      title: "",
      render: (r) => {
        return (
          <Button
            icon={<EllipsisOutlined />}
            onClick={() => handleViewDetail(r._id)}
          ></Button>
        );
      },
      width: 50,
    },
  ];

  const handleActiveFilterChange = () => {
    setActiveFilter(!activeFilter);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchAndFilter = () => {
    let filtered = data;

    if (searchText) {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (activeFilter) {
      filtered = filtered.filter((user) => user.isActive);
    }

    setFilteredData(filtered);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/user/${id}`);
  };

  useEffect(() => {
    handleSearchAndFilter();
  }, [searchText, activeFilter]);

  return (
    <PageWrapper>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2} style={{ textAlign: "center" }}>
            User Dashboard
          </Title>
        </Col>

        <Col span={24}>
          <Card>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Space style={{ marginBottom: "1rem" }}>
                <Input
                  placeholder="Search name"
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={handleSearchChange}
                  allowClear
                />
                <Checkbox
                  checked={activeFilter}
                  onChange={handleActiveFilterChange}
                >
                  Active Users
                </Checkbox>
              </Space>
              <Table
                dataSource={filteredData}
                columns={columns}
                pagination={{ pageSize: 10, showSizeChanger: false }}
                rowKey="_id"
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default Dashboard;
