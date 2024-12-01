import React, { useState } from 'react';
import { Table, Input, Button, Space, Dropdown, Tag, Avatar, Typography } from 'antd';
import { SearchOutlined, PlusOutlined, FilterOutlined, MoreOutlined, CheckCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

const UserTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Sample data
  const data = [
    {
      key: '1',
      name: 'Adam Trantow',
      company: 'Mohr, Langworth and Hills',
      role: 'UI Designer',
      verified: true,
      status: 'Active',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      key: '2',
      name: 'Angel Rolfson-Kulas',
      company: 'Koch and Sons',
      role: 'UI Designer',
      verified: true,
      status: 'Active',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      key: '3',
      name: 'Betty Hammes',
      company: 'Waelchi - VonRueden',
      role: 'UI Designer',
      verified: true,
      status: 'Active',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      key: '4',
      name: 'Billy Braun',
      company: 'White, Cassin and Goldner',
      role: 'UI Designer',
      verified: false,
      status: 'Banned',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      key: '5',
      name: 'Billy Stoltenberg',
      company: 'Medhurst, Moore and Franey',
      role: 'Leader',
      verified: true,
      status: 'Banned',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'company',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Verified',
      dataIndex: 'verified',
      render: (verified) => (
        verified ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : '-'
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Dropdown menu={{ items: actionItems }} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const actionItems = [
    {
      key: '1',
      label: 'Edit',
    },
    {
      key: '2',
      label: 'Delete',
      danger: true,
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleTableChange= (pagination, filters, sorter) => {
    console.log('Table params:', { pagination, filters, sorter });
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <Title level={2} style={{ margin: 0 }}>Users</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          New user
        </Button>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        gap: '16px'
      }}>
        <Input
          placeholder="Search user..."
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{ maxWidth: '400px' }}
        />
        <Button icon={<FilterOutlined />} />
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={{
          total: 24,
          pageSize: 5,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
        }}
      />
    </div>
  );
};

export default UserTable;

