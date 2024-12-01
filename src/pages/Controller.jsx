import React,{useState} from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { Menu } from "antd";
import Header from "./Header";
import Item from "antd/lib/list/Item";
import UserTable from "./HCMTableView";
import JobList from "./commonview/jobs/JobList";
import JobsTable from "./commonview/jobs/JobTable";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export default function Controller() {
    console.log("Controller called ")
    const navigate = useNavigate();
    const userState = localStorage.getItem("userstatus");
    const userRole = localStorage.getItem("emeelanrole");
    const token = localStorage.getItem(TOKEN_KEY);
    const userid = localStorage.getItem('userid')
    const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
    const items = [
        {
          label: 'subscription',
          key: 'SUBSCRIPTION',
          icon: <AppstoreOutlined />,
        },
        {
          label: 'Profession',
          key: 'PROFESSIONS',
          icon: <MailOutlined />,
        },
        {
          label: 'Jobs',
          key: 'JOBS',
          icon: <MailOutlined />,
        },
        // {
        //   label: 'Navigation Three - Submenu',
        //   key: 'SubMenu',
        //   icon: <SettingOutlined />,
        //   children: [
        //     {
        //       type: 'group',
        //       label: 'Item 1',
        //       children: [
        //         {
        //           label: 'Option 1',
        //           key: 'setting:1',
        //         },
        //         {
        //           label: 'Option 2',
        //           key: 'setting:2',
        //         },
        //       ],
        //     },
        //     {
        //       type: 'group',
        //       label: 'Item 2',
        //       children: [
        //         {
        //           label: 'Option 3',
        //           key: 'setting:3',
        //         },
        //         {
        //           label: 'Option 4',
        //           key: 'setting:4',
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   label: (
        //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        //       Navigation Four - Link
        //     </a>
        //   ),
        //   key: 'alipay',
        // },
      ];
    
      console.log("item",current)
      const getComponent=()=>{
        switch(current){
          case "SUBSCRIPTION":
            return <h1>Subscription</h1>
          case "PROFESSIONS":
            return  <UserDashboard/>
          case "JOBS":
            return <JobList/>
        }
      }
    return (
        <>
       <JobList/>
        {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
       {getComponent()} */}
        </>
    )
    
  
}
