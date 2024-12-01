import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, Typography } from 'antd';
import moment from 'moment';
import AddressComponent from '../../../components/address/AddressComponent';

import styled from '@emotion/styled';
import { useCreate } from '@refinedev/core';
const { Title } = Typography;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
  overflow: hidden;
`;

const Decoration = styled.div`
  flex: 1;
  height: 2px;
  background: linear-gradient(to var(--direction, right), #001529, transparent);
`;

const StyledTitle = styled(Title)`
  margin: 0 16px !important;
  white-space: nowrap;
`;
const { Option } = Select;

const children = [];
const DecorativeTitle = ({ title, level = 3 }) => {
    return (
      <TitleContainer>
        <Decoration style={{ '--direction': 'right' } } />
        <StyledTitle level={level}>{title}</StyledTitle>
        <Decoration style={{ '--direction': 'left' } } />
      </TitleContainer>
    );
  };
  
const JobForm = ({userid, job,setIsModalVisible}) => {
    console.log("JOB FORM userid", userid)
    const [form] = Form.useForm();
    const { mutate: createAddress } = useCreate();
    const { mutate: createJobs } = useCreate();
    const onFinish = (values) => {
        values['user'] =userid
        values["addresstype"]="JOB"
        console.log("values",values)
        const data = createAddress(
            {
              resource: "addresses",
              values: {
                addresstype: values.addresstype,
                district: values.district,
                housename: values.housename,
                landmark: values.landmark,
                lat: values.lat,
                lng: values.lng,
                pincode: values.pincode,
                state: values.state,
                tehsil: values.tehsil,
                village: values.village,
              },
            },
            {
              onSuccess: (data, variables, context) => {
                const payload ={
                    address: data.data.data.id,
                    user:userid,
                    type: values.type,
                    organization: values.organization,
                    jobtype: values.jobtype,
                    post: values.post,
                    experience: values.experience,
                    skills: values.skills,
                    from: values.from,
                    to: values.to,
                }
            
               
                createJobs(
                  {
                    resource: "jobs",
                    values: payload,
                  },
                  {
                    onError: (error) => {},
                    onSuccess: (data) => {
                        setIsModalVisible(false)
                    },
                  }
                );
              },
            }
          );
        const jobData = {
            type: values.type,
            organization: values.organization,
            jobtype: values.jobtype,
            post: values.post,
            experience: values.experience,
            skills: values.skills,
            from: values.from,
            to: values.to,
          };
          
          const addressData = {
            //job_id: createdJob.id,
            pincode: values.pincode,
            housename: values.housename,
            landmark: values.landmark,
            village: values.village,
            tehsil: values.tehsil,
            district: values.district,
            state: values.state,
            lat: values.lat,
            lng: values.lng,
            addresstype: values.addresstype,
          };
    };

    React.useEffect(() => {
        if (job) {
            form.setFieldsValue({
                ...job,
                from: moment(job.from),
                to: moment(job.to),
            });
        }
    }, [job, form]);

    function handleChange(values) {       
        console.log(`selected ${values}`);
    }
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                <Select>
                    <Option value="PRIVATE">Private</Option>
                    <Option value="PUBLIC">Public</Option>
                    <Option value="GOVT">Govt</Option>
                    <Option value="SEMIPRIVATE">SemiPrivare</Option>
                    <Option value="PUBLICSECTOR">PublicSector</Option>
                    <Option value="ADMINISTRATIVE">Administrative</Option>
                    <Option value="OTHER">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item name="orgtype" label="OrganizationType(E.G. HARDWARE/SOFWARE" >
                <Input />
            </Form.Item>
            <Form.Item name="organization" label="Organization NAME" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="jobtype" label="Job Type" >
                <Select>
                    <Option value="PERMANENT">Permanent</Option>
                    <Option value="PARTTIME">Parttime</Option>
                    <Option value="CONTRACT">Contract</Option>
                    <Option value="OTHER">Other</Option>
                </Select>
            </Form.Item>
            <Form.Item name="post" label="Post" >
                <Input />
            </Form.Item>
            <Form.Item name="experience" label="Experience (years)" >
                <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item name="skills" label="Skills">
                <Select mode="tags" style={{ width: '100%' }} onChange={handleChange} tokenSeparators={[',']}>
                    {children}
                </Select>
            </Form.Item>
            <Form.Item name="from" label="From" >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="to" label="To" >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
         
            <DecorativeTitle title="Job Address" level={4} />
            <AddressComponent form={form} />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default JobForm;

