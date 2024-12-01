import React from 'react';
import { Form, Input, InputNumber, Select, Button,Row,Col } from 'antd';
import fetchGeoData from '../../utils/geoLocation';
 
const AddressComponent = ({ form }) => {
  const handlePinCode = async (value) => {
    if (value.toString().length < 6) {
      return;
    }
    try {
      const response = await fetchGeoData(value.toString());
      const data = response.data[0]?.attributes;
      console.log("data", data);

      // Explicitly map data fields to form field names
      form.setFieldsValue({

        village: data?.localityname ?? "",
        tehsil: data?.officeName ?? "", // Update based on your data structure
        district: data?.districtName ?? "",
        state: data?.stateName ?? "",
      });
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        form.setFieldsValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  return (<div>
        <Row gutter={16}>
        <Col xs={24} sm={12}>
      <Form.Item
        name="pincode"
        label="Pin Code"
        rules={[
          { required: true },
          { pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pincode' },
        ]}
      >
        <InputNumber onChange={handlePinCode} />
      </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
      <Form.Item name="housename" label="House Name">
        <Input maxLength={50} />
      </Form.Item>
        </Col>
        </Row>
        <Row gutter={16}>
        <Col xs={24} sm={12}>
      <Form.Item name="landmark" label="Landmark">
        <Input maxLength={50} />
      </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
      <Form.Item name="village" label="Village">
        <Input maxLength={30} />
      </Form.Item>
      </Col>
      </Row>
      <Row gutter={16}>
      <Col xs={24} sm={12}>
      <Form.Item name="tehsil" label="Tehsil">
        <Input maxLength={30} />
      </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
      <Form.Item name="district" label="District">
        <Input maxLength={30} />
      </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
      <Form.Item name="state" label="State">
        <Input maxLength={30} />
      </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
      
      </Col>
      </Row>
      <Form.Item>
        <Button onClick={getCurrentLocation}>Use Current Location</Button>
      </Form.Item>
      <Row gutter={16}>
      <Col xs={24} sm={12}>
      <Form.Item name="lat" label="Latitude">
        <Input maxLength={30} />
      </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
      <Form.Item name="lng" label="Longitude">
        <Input maxLength={30} />
      </Form.Item>
      </Col>

      </Row>
    </div>
  );
};

export default AddressComponent;
