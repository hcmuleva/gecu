
import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Table, Input, Button, Space, Tag } from 'antd';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

export default function UsersTable({ userData }) {
    const columnDefs = useMemo(() => [
        { headerName: "ID", field: "id", width: 80 },
        // {
        //     headerName: "Profile",
        //     field: "photo",
        //     cellRenderer: (params) => {
        //       const url =
        //         params.value?.formats?.thumbnail?.url || params.value?.url || null;
        //       return url ? (
        //         <img
        //           src={url}
        //           alt=""
        //           style={{
        //             width: "50px",
        //             height: "50px",
        //             borderRadius: "50%",
        //             objectFit: "cover",
        //           }}
        //         />
        //       ) : (
        //         ""
        //       );
        //     },
        //     width: 100,
        //   },
        { headerName: "FirstName", field: "firstname", width: 200 },
        { headerName: "Lastname", field: "lastname", width: 200 },
        { headerName: "Branch", field: "branch", width: 200 },
        { headerName: "Passout", field: "passout", width: 200 },
        { headerName: "Role", field: "myrole", width: 150 },
        { headerName: "Profession", field: "profession", width: 150 },
        { headerName: "Organization", field: "org", width: 150 },
        {
          headerName: "Jobs",
          field: "jobs",
          cellRenderer: (params) => {
            if (!params.value) return "";
            return params.value
              .map(
                (job) =>
                  `${job.organization} (${job.post}, ${job.from} - ${job.to})`
              )
              .join("; ");
          },
          autoHeight: true,
        },
        {
          headerName: "Job Address",
          field: "jobs",
          cellRenderer: (params) => {
            if (!params.value || !params.value[0]?.address) return "N/A";
            const { tehsil, village, district, state, pincode } = params.value[0].address;
            return `${village}, ${tehsil}, ${district}, ${state} - ${pincode}`;
          },
        },
      ], []);
    
      return (
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={userData}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
          />
        </div>
      );
    };
    
