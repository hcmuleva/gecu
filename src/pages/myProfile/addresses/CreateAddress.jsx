import { Button, Form, notification, Select } from 'antd'
import React from 'react'
import AddressComponent from '../../../components/address/AddressComponent';

export default function CreateAddress({setType}) {
  const [form] = Form.useForm();
  const onFinish =  (values) => {
    try {
      console.log(values)
      setType("LIST")
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an issue updating your profile.",
      });
    }
  }
  return (
    <div>
       <Form form={form} onFinish={onFinish} layout="vertical">
       <Form.Item
      name="addressType"
      label="Address Type"
      rules={[{ required: true, message: 'Please select an address type' }]}
    >
      <Select placeholder="Select address type">
        <Option value="CURRENT">CURRENT</Option>
        <Option value="PERMANENT">PERMANENT</Option>
        <Option value="BUSINESS">BUSINESS</Option>
        <Option value="ORIGINAL">ORIGINAL</Option>
      </Select>
    </Form.Item>
        <AddressComponent form={form} />
        <Form.Item>
        <Button htmlType='submit' >
          Create Address
          </Button>
        </Form.Item>
       </Form>
    </div>
  )
}
