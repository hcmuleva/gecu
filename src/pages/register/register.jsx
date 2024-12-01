import {
  BookOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useCreate } from "@refinedev/core";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Layout,
  notification,
  Progress,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
} from "antd";
import { Country, State } from "country-state-city";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressComponent from "../../components/address/AddressComponent";
import "../../styles/register.css";
import gotra from "../../utils/gotra.json";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;

export const RegisterPage = ({ userrole, createdBy }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const { mutate: createUser } = useCreate();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      values["org"] = "GECU";
      values["username"] = values["email"];
      values["email"] = values["email"]
        ? values["email"]
        : `${values["MobileNumber"]}@hph.com`;
      values["role"] = 1;
      createUser(
        { resource: "users", values },
        {
          onSuccess: async () => {
            try {
              const res = await fetch(`${API_URL}/api/auth/local`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  identifier: values.email,
                  password: values.password,
                }),
              });

              if (res.ok) {
                const logindata = await res.json();
                localStorage.setItem(TOKEN_KEY, logindata.jwt);
                localStorage.setItem("userid", logindata.user.id);
                navigate("/dashboard");
              } else {
                const errorData = await res.json();
                notification.error({
                  message: "Login Failed",
                  description: errorData.message || "Error logging in.",
                });
              }
            } catch (error) {
              notification.error({
                message: "Error",
                description: "Something went wrong during login.",
              });
            }
          },
        }
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong during registration.",
      });
    }
  };

  const handleTabChange = (activeKey) => setCurrentStep(Number(activeKey));

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #2c3e50 0%, #34495e 99%, #34495e 100%)", // Dark blue gradient
      }}
    >
      <Content style={{ padding: "40px 0" }}>
        <Card
          style={{
            maxWidth: 800,
            margin: "0 auto",
            borderRadius: 15,
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Title
              level={2}
              style={{
                background:
                  "linear-gradient(135deg, #2c3e50 0%, #34495e 99%, #34495e 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent", // Transparent to show gradient
                marginBottom: 0,
              }}
            >
              EMEELAN
            </Title>
            <Text style={{ display: "block", fontSize: "1.2rem" }}>
              We bring Professionals Together
            </Text>
          </div>

          <Progress
            percent={(currentStep / 3) * 100}
            showInfo={false}
            strokeColor="linear-gradient(135deg, #2c3e50 0%, #34495e 99%, #34495e 100%)" // Match the background gradient
            style={{ marginBottom: "1rem" }}
          />

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs defaultActiveKey="1" onChange={handleTabChange}>
              {/* Personal Info Tab */}
              <Tabs.TabPane
                tab={
                  <span>
                    <UserOutlined />
                    Personal
                  </span>
                }
                key="1"
              >
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="firstname"
                      label="First Name"
                      rules={[
                        { required: true, message: "Enter your first name" },
                      ]}
                    >
                      <Input placeholder="Enter First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="lastname"
                      label="Last Name"
                     
                    >
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password",
                        },
                        {
                          min: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Enter Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("The two passwords do not match")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please enter a valid email",
                    },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Enter Email Address"
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                  <Form.Item
  label="Branch"
  name="branch"
  rules={[{ required: true, message: 'Please select a branch!' }]}
>
  <Select placeholder="Select a branch">
    <Select.Option value="Civil">Civil</Select.Option>
    <Select.Option value="Mechanical">Mechanical</Select.Option>
    <Select.Option value="Electrical">Electrical</Select.Option>
    <Select.Option value="Elx&TC">Elx&TC</Select.Option>
    <Select.Option value="Chemical">Chemical</Select.Option>
    <Select.Option value="CS">CS</Select.Option>
  </Select>
</Form.Item>

                  </Col>
                  <Col xs={24} sm={12}>
                  <Form.Item
                      name="passout"
                      label="PassoutYear"
                    >
                      <Input
                       
                        placeholder="Enter PassoutYear"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                      name="sex"
                      label="Gender"
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Select placeholder="Select Sex">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                <Form.Item name="mobile" label="Mobile Number"  rules={[{ required: true, message: 'Please enter your mobile number' }]}>
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
                <Form.Item name="profession" label="Profession" >
                  <Input placeholder="Enter Profession Name" />
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>

            <Form.Item>
                  <Space>
                  <Button htmlType="submit">
                    Register
                    </Button>

                    <Button  onClick={() => navigate("/login")}>
                    Back to Login
                    </Button>
            
                  </Space>
             
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};
