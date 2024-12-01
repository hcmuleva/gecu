import { useList } from '@refinedev/core';
import React from 'react'
import JobsTable from './JobTable';
import UsersTable from './UsersTable';

export default function JobList() {

  const { data: userdata, isLoading, isFetching } = useList({
    resource: "users",
    filters: [
        {
            field: "org",
            operator: "eq",
            value: "GECU",
        },
    ],
    

    meta: {
      populate: ["photo","jobs","jobs.address"],
    },
  
  });
  console.log("loading",isLoading, " is featc", isFetching)
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isFetching) {
    return <h1>Fetching...</h1>;
  }
  console.log("Users List  ", userdata.data)
  return (
    <div>
        <UsersTable userData={userdata?.data} />
        {/* <UsersTable userData={userdata.data} />  */}
    {/* <JobsTable jobs={userdata.data}/> */}
    </div>
  )
}
