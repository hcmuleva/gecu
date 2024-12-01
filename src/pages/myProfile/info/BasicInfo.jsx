import { Card,Row, Col, List, Typography } from 'antd'
import React from 'react'
const { Title, Text, Paragraph } = Typography;

export default function BasicInfo({profileInfo}) {
  return (
    <div>
         <Col xs={24} lg={12}>
                      <Card title="Info" bordered={false}>
                        <List
                          itemLayout="horizontal"
                          split={false}
                          dataSource={[
                            { label: 'Full Name', value: profileInfo?.fullName },
                            { label: 'Mobile', value: profileInfo?.mobile },
                            { label: 'E-mail', value: profileInfo?.email },
                            { label: 'Location', value: profileInfo?.location }
                          ]}
                          renderItem={item => (
                            <List.Item>
                              <Row style={{ width: '100%' }}>
                                <Col span={8}>
                                  <Text type="secondary">{item.label} :</Text>
                                </Col>
                                <Col span={16}>
                                  <Text>{item.value}</Text>
                                </Col>
                              </Row>
                            </List.Item>
                          )}
                        />
                      </Card>
                    </Col>
    </div>
  )
}
