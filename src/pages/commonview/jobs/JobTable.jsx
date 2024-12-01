import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const JobsTable = ({ jobs }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchTextInput, setSearchTextInput] = useState('');
 console.log("JONS",jobs)
  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleSearchInput = (value) => {
    setSearchText(value);
    const searchTerms = value.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filtered = jobs.filter((job) => {
      return searchTerms.every(term => 
        (job?.organization?.toLowerCase() ?? '').includes(term) ||
        (job?.post?.toLowerCase() ?? '').includes(term) ||
        (job?.type?.toLowerCase() ?? '').includes(term) ||
        (job?.address?.district?.toLowerCase() ?? '').includes(term) ||
        (job?.address?.state?.toLowerCase() ?? '').includes(term) ||
        (job?.skills && Array.isArray(job.skills) && job.skills.some(skill => (skill?.toLowerCase() ?? '').includes(term)))
      );
    });
    
    setFilteredJobs(filtered);
  };
  
  

  const handleSearch = (
    selectedKeys,
    confirm,
    dataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value).toLowerCase()) ?? false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
      ...getColumnSearchProps('organization'),
    },
    {
      title: 'Post',
      dataIndex: 'post',
      key: 'post',
      ...getColumnSearchProps('post'),
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      key: 'experience',
      sorter: (a, b) => a.experience - b.experience,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Private', value: 'PRIVATE' },
        { text: 'Public', value: 'PUBLIC' },
        { text: 'Semi-Private', value: 'SEMIPRIVATE' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      sorter: (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      sorter: (a, b) => new Date(a.to).getTime() - new Date(b.to).getTime(),
    },
    {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
        render: (skills) => (
          <>
            {(skills || []).map((skill) => (
              <Tag color="blue" key={skill}>
                {skill}
              </Tag>
            ))}
          </>
        ),
      },
    {
      title: 'Location',
      dataIndex: ['address', 'district'],
      key: 'location',
      ...getColumnSearchProps('address.district'),
      render: (_, record) => `${record?.address?.district}, ${record?.address?.state}`,
    },
    {
        title: 'User',
        dataIndex: ['user', 'firstname'],
        key: 'user',
        render: (_, record) => `${record?.user?.firstname}, ${record?.user?.lastname}`,
      },
  ];

  return (
  <>
   <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '16px',
        gap: '16px'
      }}>
        <Input
          placeholder="Search jobs..."
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{ maxWidth: '400px' }}
          value={searchText}
          onChange={(e) => handleSearchInput(e.target.value)}
          aria-label="Search jobs"
        />
        <Button icon={<FilterOutlined />} aria-label="Filter jobs" />
      </div>
  <Table columns={columns} dataSource={filteredJobs} rowKey="id" />;
  </>
  )
  
};

export default JobsTable;

