import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import JobList from './JobList';
import JobForm from './JobForm';

const JobManager = ({ userjobList }) => {
  console.log("userJOB LISt", userjobList)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobs, setJobs] = useState(userjobList && Array.isArray(userjobList) ? [...userjobList] : []);

  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
    setIsModalVisible(false); // Close the modal after adding a job
  };

  const handleEditJob = (editedJob) => {
    setJobs(jobs.map((job) => (job.id === editedJob.id ? editedJob : job)));
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: '16px' }}>
        Add Job
      </Button>

      <Modal
        title="Add Job"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <JobForm onAddJob={handleAddJob} />
      </Modal>

      {jobs && jobs.length > 0 && (
        <JobList
          jobs={jobs}
          onAddJob={handleAddJob}
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
        />
      )}
    </div>
  );
};

export default JobManager;
