import { BankOutlined, EnvironmentOutlined, GlobalOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useOne, useUpdate } from '@refinedev/core';
import { Avatar, Button, Card, Col, Progress, Row, Space, Tabs, Tag, Typography, Upload } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BasicInfo from './info/BasicInfo';
import JobManager from './profession/JobManager';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const API_URL = import.meta.env.VITE_SERVER_URL;

const ProfilePage = () => {
  const { mutate } = useUpdate();
  const [loading, setLoading] = useState(false);

  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const {data, isLoading} = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["photo", "job", "jobs.address"],
    },
  })
  const user = data?.data;
  if (isLoading){
    return <p>Loading...</p>;
  }
  function getLatestJob(jobs) {
    if(!jobs|| jobs==='undefined') return null
    if (!Array.isArray(jobs) || jobs.length === 0) {
      return null; // Return null if the input is not a valid array or is empty
    }
  
    return jobs.reduce((latest, current) => {
      const latestFrom = new Date(latest.from);
      const currentFrom = new Date(current.from);
  
      return currentFrom > latestFrom ? current : latest;
    });
  }
  const latestJob = getLatestJob(user?.jobs);
  console.log("latestJob",latestJob)
 
const profileInfo = {
  name: user?.username ?? "-",
  title: latestJob?.post ?? "Not Available",
  location: latestJob
    ? `${latestJob?.address?.tehsil ?? "-"}, ${latestJob?.address?.district ?? "-"}, ${latestJob?.address?.state ?? "-"}, ${latestJob?.address?.country ?? "-"}`
    : "Location Not Available",
  company: latestJob?.organization ?? "Not Available",
  about: latestJob?.aboutme ? `AboutME: ${latestJob.aboutme}` : "No information available",
  fullName: user?.firstname ? `${user.firstname} ${user.lastname ?? ""}` : "-",
  mobile: user?.mobile ?? "-",
  email: user?.email ?? "-",
};
const handlePhotoUpload = async (file) => {
  setLoading(true);

  const formData = new FormData();
  formData.append('files', file);

  try {
    // Assuming you have an API endpoint for file upload
    const response = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt-token')}`, // Add your Bearer token here
      },
    });
    const data = await response.json();

    if (data?.[0]?.url) {
      // Update the user's photo field using Refine's `useUpdate`
      mutate(
        {
          resource: 'users',
          id: user?.id,
          values: { photo: data[0].id },
        },
        {
          onSuccess: () => {
            message.success('Photo updated successfully!');
          },
          onError: () => {
            message.error('Failed to update photo.');
          },
        }
      );
    }
  } catch (error) {
    message.error('Upload failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
console.log("USER JOB LIST", user);

  return (
    <div style={{ background: '#f0f2f5', minHeight: '100vh', padding: '1px' }}>
      
      <div style={{ 
        background: 'linear-gradient(to bottom, #4863A0 50%, #f0f2f5 50%)',
        padding: '1px',
        borderRadius: '1px'
      }}>
        <Card bordered={false}>
         <Space><Button color='danger' variant='dashed' onClick={()=>navigate("/dashboard")}>BackToList</Button>
         <Button color='danger' variant='dashed' 
         onClick={()=>{
          localStorage.clear()
          navigate('/login');
         }}
         >Logout</Button>
          </Space> 
          <Row gutter={[24, 24]}>

</Row>
<Row gutter={[24, 24]}>

</Row>
<Row gutter={[24, 24]}>

</Row>
         <br/>
        
          <Row gutter={[24, 24]}>
            {/* Profile Header */}
            <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
      {user?.photo?.formats?.thumbnail?.url ? (
        <>
          <Avatar
            size={120}
            src={user.photo.formats.thumbnail.url}
            style={{ marginBottom: '16px' }}
          />
          <Button
            style={{ marginTop: '8px' }}
            icon={<UploadOutlined />}
            onClick={() => document.getElementById('photoUploadInput').click()}
          >
            Change Photo
          </Button>
        </>
      ) : (
        <>
          <Avatar size={120} icon={<UploadOutlined />} style={{ marginBottom: '16px' }} />
          <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          handlePhotoUpload(file);
          return false; // Prevent auto-upload by Ant Design
        }}
      >
        <Button
          style={{ marginTop: '8px' }}
          icon={<UploadOutlined />}
          loading={loading}
        >
          {loading ? 'Uploading...' : 'Change Photo'}
        </Button>
      </Upload>
        </>
      )}
      <Title level={4} style={{ marginBottom: '4px' }}>
        {profileInfo.name}
      </Title>
      <Text type="secondary">{profileInfo.title}</Text>
      <div style={{ marginTop: '1px' }}>
        <Text type="secondary">
          <EnvironmentOutlined /> {profileInfo.location}
        </Text>
        <br />
        <Text type="secondary">
          <BankOutlined /> {profileInfo.company}
        </Text>
      </div>
    </div>
            </Col>

            {/* Main Content */}
            <Col xs={24} md={16}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                {/* <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ marginBottom: '0' }}>{profileInfo.followers}</Title>
                  <Text type="secondary">Followers</Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ marginBottom: '0' }}>{profileInfo.following}</Title>
                  <Text type="secondary">Following</Text>
                </div> */}
                {/* <Button type="primary" icon={<EditOutlined />} onClick={() => navigate(`/myprofile/${userid}`)}>
                  Edit Profile
                </Button> */}
              </div>

              <Tabs defaultActiveKey="1">
                <TabPane tab="Overview" key="1">
                      {/* Info Card */}
                  <Row gutter={[24, 24]}>
                    {/* Complete Profile Card */}
                    <Col xs={24} lg={12}>
                      <Card 
                        title="Complete Your Profile" 
                        extra={<Tag color="blue">30%</Tag>}
                        bordered={false}
                      >
                        <Progress percent={30} showInfo={false} strokeColor="#4863A0" />
                        <BasicInfo profileInfo={profileInfo} />
                      </Card>
                    </Col>

                    {/* About Card   */}
                    <Col span={24}>
                      <Card title="About" bordered={false}>
                       
                        <Paragraph style={{ marginBottom: 0 }}>
                          {profileInfo.about}
                        </Paragraph>
                      </Card>
                    </Col>

                    {/* Designation & Website */}
                    <Col span={24}>
                      <Card bordered={false}>
                        <Row gutter={24}>
                          <Col xs={24} sm={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <UserOutlined />
                              <div>
                                <Text type="secondary">Designation :</Text>
                                <div>{profileInfo.designation}</div>
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} sm={12}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <GlobalOutlined />
                              <div>
                                <Text type="secondary">Website :</Text>
                                <div>{profileInfo.website}</div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    </Col>

                    {/* Recent Activity */}
                    {/* <Col span={24}>
                      <Card 
                        title="Recent Activity"
                        extra={
                          <div>
                            <Button type="text">Today</Button>
                            <Button type="text">Weekly</Button>
                            <Button type="text">Monthly</Button>
                          </div>
                        }
                        bordered={false}
                      >
                        <List
                          itemLayout="horizontal"
                          dataSource={[{
                            avatar: '/placeholder.svg?height=40&width=40',
                            title: 'Jacqueline Steve',
                            description: 'We has changed 2 attributes on 05:16PM'
                          }]}
                          renderItem={item => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.title}
                                description={item.description}
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col> */}
                  </Row>
                </TabPane>
               
                <TabPane tab="Professional" key="2">
                  <Card bordered={false}>
                   <JobManager userjobList={user?.jobs}/>
                  </Card>
                </TabPane>
                {/* <TabPane tab="Projects" key="3">
                  <Card bordered={false}>
                    <Text type="secondary">Projects content</Text>
                  </Card>
                </TabPane>
                <TabPane tab="Address" key="4">
                  <Card bordered={false}>
                    <Text type="secondary">Address</Text>
                    <AddressDetails/>
                  </Card>
                </TabPane>
                <TabPane tab="Activities" key="5">
                  <Card bordered={false}>
                    <Text type="secondary">Activities content</Text>
                  </Card>
                </TabPane>
                <TabPane tab="Subscriptions" key="6">
                  <Card bordered={false}>
                    <Text type="secondary">Subscriptions</Text>
                  </Card>
                </TabPane> */}
               
              </Tabs>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;

