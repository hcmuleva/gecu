import React, { useState } from "react";
import { Card, Avatar, Button, Form, Input, Tabs, Typography, Space, notification } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { useUpdate } from "@refinedev/core";
import ChangePassword from "./ChangePassword"; // Import ChangePassword component
import './editprofile.css';

const { TabPane } = Tabs;
const { Text } = Typography;

export default function EditProfile({ user , setIsEditProfile}) {
  const { mutate: updateUser } = useUpdate();
  const [form] = Form.useForm();
  const [view, setView] = useState("editProfile"); // State to manage views
  

  const onFinish = async (values) => {
    try {
      await updateUser(
        {
          resource: "users",
          id: user.id,
          values: values,
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "Your profile has been successfully updated.",
            });
            form.resetFields();
          },
        }
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an issue updating your profile.",
      });
    }
  };

  return (
    <Card style={{ width: 600 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {view === "editProfile" ? (
          <>
            {/* Profile Header */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <Avatar src={user?.profilePicture?.formats?.thumbnail?.url} size={64} />
              <div style={{ flex: 1, marginLeft: 16 }}>
                <Space direction="vertical">
                  <div>
                    <Text strong style={{ fontSize: 18 }}>{user?.firstname}</Text>
                    <br />
                    <Text type="secondary">( Profession)</Text>
                    {/* {user.isdivyang && <Text strong> (Divyang)</Text>} */}
                  </div>
                  <Space>
                    {/* <Button icon={<EditOutlined />} type="link">Edit</Button> */}
                    <Button
                      icon={<SettingOutlined />}
                      type="link"
                      onClick={() => setView("changePassword")} // Switch to ChangePassword view
                    >
                      Change Password
                    </Button>
                  </Space>
                </Space>
              </div>
            </div>

            {/* Form with Tabs */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={user}
            >
              <Tabs defaultActiveKey="personalInfo" >
                {/* Personal Info Tab */}
                <TabPane tab="Personal Info" key="personalInfo" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="firstname" label="First Name">
                      <Input placeholder="Enter First Name"/>
                    </Form.Item>
                    <Form.Item name="LastName" label="Last Name">
                      <Input placeholder="Enter Last Name" />
                    </Form.Item>
                    <Form.Item name="DOB" label="Date of Birth">
                      <Input placeholder="Enter Date of Birth" />
                    </Form.Item>
                    <Form.Item name="Sex" label="Sex">
                      <Input placeholder="Enter Sex" />
                    </Form.Item>
                    <Form.Item name="birth_time" label="Birth Time">
                      <Input placeholder="Enter Birth Time" />
                    </Form.Item>
                    <Form.Item name="birth_place" label="Birth Place">
                      <Input placeholder="Enter Birth Place" />
                    </Form.Item>
                    <Form.Item name="Height" label="Height">
                      <Input placeholder="Enter Height" />
                    </Form.Item>
                    <Form.Item name="have_child" label="Have Children">
                      <Input placeholder="Have Children" />
                    </Form.Item>
                    <Form.Item name="MeritalStatus" label="Marital Status">
                      <Input placeholder="Enter Marital Status" />
                    </Form.Item>
                  </Space>
                </TabPane>

                {/* Contact Info Tab */}
                <TabPane tab="Contact Info" key="contactInfo" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="MobileNumber" label="Mobile Number">
                      <Input placeholder="Enter Mobile Number" />
                    </Form.Item>
                    <Form.Item name="FatherMobileNumber" label="Father's Mobile">
                      <Input placeholder="Enter Father's Mobile Number" />
                    </Form.Item>
                    <Form.Item name="MamajiMobileNumber" label="Mamaji's Mobile">
                      <Input placeholder="Enter Mamaji's Mobile Number" />
                    </Form.Item>
                  </Space>
                </TabPane>

                {/* Family Details Tab */}
                <TabPane tab="Family Details" key="familyDetails" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="FatherName" label="Father's Name">
                      <Input placeholder="Enter Father's Name" />
                    </Form.Item>
                    <Form.Item name="MotherName" label="Mother's Name">
                      <Input placeholder="Enter Mother's Name" />
                    </Form.Item>
                    <Form.Item name="father_occupation" label="Father's Occupation">
                      <Input placeholder="Enter Father's Occupation" />
                    </Form.Item>
                    <Form.Item name="Gotra" label="Gotra">
                      <Input placeholder="Enter Gotra" />
                    </Form.Item>
                    <Form.Item name="MaternalGotra" label="Maternal Gotra">
                      <Input placeholder="Enter Maternal Gotra" />
                    </Form.Item>
                    <Form.Item name="GrandFatherName" label="Grandfather's Name">
                      <Input placeholder="Enter Grandfather's Name" />
                    </Form.Item>
                    <Form.Item name="myrelative" label="Sibling">
                      <Input placeholder="Enter Number of myrelative" />
                    </Form.Item>
                    <Form.Item name="NanajiName" label="Nanaji's Name">
                      <Input placeholder="Enter Nanaji's Name" />
                    </Form.Item>
                    <Form.Item name="NanijiName" label="Naniji's Name">
                      <Input placeholder="Enter Naniji's Name" />
                    </Form.Item>
                    <Form.Item name="MamajiName" label="Mamaji's Name">
                      <Input placeholder="Enter Mamaji's Name" />
                    </Form.Item>
                  </Space>
                </TabPane>

                {/* Address Tab */}
                <TabPane tab="Address" key="addressInfo" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="Address" label="Home Address">
                      <Input placeholder="Enter Home Address" />
                    </Form.Item>
                    <Form.Item name="City" label="City">
                      <Input placeholder="Enter City" />
                    </Form.Item>
                    <Form.Item name="State" label="State">
                      <Input placeholder="Enter State" />
                    </Form.Item>
                    <Form.Item name="Country" label="Country">
                      <Input placeholder="Enter Country" />
                    </Form.Item>
                    <Form.Item name="postalcode" label="Postal Code">
                      <Input placeholder="Enter Postal Code" />
                    </Form.Item>
                  </Space>
                </TabPane>

                {/* Education Tab */}
                <TabPane tab="Education" key="educationInfo" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="education_level" label="Education Level">
                      <Input placeholder="Enter Education Level" />
                    </Form.Item>
                    <Form.Item name="HighestDegree" label="Highest Degree">
                      <Input placeholder="Enter Highest Degree" />
                    </Form.Item>
                    <Form.Item name="AdditionalQualification" label="Additional Qualification">
                      <Input placeholder="Enter Additional Qualification" />
                    </Form.Item>
                    <Form.Item name="LastCollege" label="Last College">
                      <Input placeholder="Enter Last College" />
                    </Form.Item>
                  </Space>
                </TabPane>

                {/* Professional Tab */}
                <TabPane tab="Professional" key="professionalInfo" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="Profession" label="Profession">
                      <Input placeholder="Enter Profession" />
                    </Form.Item>
                    <Form.Item name="CompanyName" label="Company Name">
                      <Input placeholder="Enter Company Name" />
                    </Form.Item>
                    <Form.Item name="Designation" label="Designation">
                      <Input placeholder="Enter Designation" />
                    </Form.Item>
                    <Form.Item name="WorkingCity" label="Working City">
                      <Input placeholder="Enter Working City" />
                    </Form.Item>
                    <Form.Item name="Income" label="Income">
                      <Input placeholder="Enter Income" />
                    </Form.Item>
                    <Form.Item name="PreProfession" label="Previous Profession">
                      <Input placeholder="Enter Previous Profession" />
                    </Form.Item>
                  </Space>
                </TabPane>

                {/* Lifestyle Tab */}
                <TabPane tab="Lifestyle" key="lifestyle" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="LifeStyle" label="Lifestyle">
                      <Input placeholder="Enter Lifestyle" />
                    </Form.Item>
                    <Form.Item name="Horoscope" label="Horoscope">
                      <Input placeholder="Enter Horoscope" />
                    </Form.Item>
                    <Form.Item name="Hobbies" label="Hobbies">
                      <Input placeholder="Enter Horoscope" />
                    </Form.Item>
                  </Space>
                </TabPane>

                <TabPane tab="Preference" key="preference" className="tabpane">
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <Form.Item name="PreMinAge" label="Preferred Min Age">
                      <Input placeholder="Enter Lifestyle" />
                    </Form.Item>
                    <Form.Item name="PreMaxAge" label="Preferred Max Age">
                      <Input placeholder="Enter Food Preference" />
                    </Form.Item>
                    <Form.Item name="PreMinHeight" label="Preferred Min Height">
                      <Input placeholder="Enter Food Preference" />
                    </Form.Item>
                    <Form.Item name="PreMaxHeight" label="Preferred Max Height">
                      <Input placeholder="Enter Food Preference" />
                    </Form.Item>
                    <Form.Item name="PreDescription" label="Preferred Description">
                      <Input placeholder="Enter Food Preference" />
                    </Form.Item>
                  </Space>
                </TabPane>
              </Tabs>

              <Form.Item style={{ display:"flex",justifyContent:"space-between", marginTop: 16 }}>
              <Space style={{ display: "flex", justifyContent: "space-between" }}>
                <Button type="primary" htmlType="submit" block>
                  Update Profile
                </Button>
                <Button type="default" onClick={() => setIsEditProfile(false)}>
                    Close
                </Button>
                </Space>
              </Form.Item>
            </Form>
          </>
        ) : (
          <ChangePassword /> // Render ChangePassword component when view is "changePassword"
        )}
      </Space>
    </Card>
  );
}