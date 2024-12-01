import React from 'react';
import { Card, Avatar, Typography, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;


export default function Profession({ profession }) {
  
    
  //const { title="", description="", skills = [], yearsOfExperience="" } = profession;

  return (
    <Card 
      hoverable 
      style={{ width: 300, margin: '20px' }}
      cover={
        <div style={{ background: '#f0f2f5', padding: '20px', textAlign: 'center' }}>
          <Avatar size={64} icon={<UserOutlined />} />
        </div>
      }
    >
      <Card.Meta
        title={<Title level={4}>{profession?.title}</Title>}
        description={
          <>
            {profession?.description && <Text>{profession?.description}</Text>}
            {profession?.skills.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <Text strong>Skills:</Text>
                <div>
                  {skills.map((skill, index) => (
                    <Tag color="blue" key={index} style={{ margin: '5px 5px 0 0' }}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
            {profession?.yearsOfExperience !== undefined && (
              <Text strong style={{ display: 'block', marginTop: '10px' }}>
                Years of Experience: {profession?.yearsOfExperience}
              </Text>
            )}
          </>
        }
      />
    </Card>
  );
}

