import { useList } from "@refinedev/core";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { Avatar } from "antd";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// Avatar Image Component
const AvatarImage = ({ src }) => {
  return <Avatar src={src} size={64} />;
};

// Image Cell Renderer Component
const ImageCellRenderer = (props) => {
  const navigate = useNavigate();
  const images = props?.value; // Ensure value is defined
  const firstImageUrl = images?.url || "/Person.png"; // Use the image from public folder

  return (
    <div className="flex items-center gap-2">
      <AvatarImage key="image" src={firstImageUrl} />
    </div>
  );
};

export default function UserDashboard() {
  const gridRef = useRef(null);

  const { data: usersData, isLoading, isFetching } = useList({
    resource: "users",
    meta: {
      populate: ["profilePicture", "vyaapars"],
    },
    // filters: [{ field: "org", operator: "eq", value: "SEERVI" }],
    // sort: {
    //   field: "id", 
    //   order: "desc", 
    // },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isFetching) {
    return <h1>Fetching...</h1>;
  }
  console.log("userslist", usersData.data)

  // Transform `usersData?.data` if necessary
  const rowData = usersData?.data?.map((user) => ({
    id: user.id,
    profilePicture: user.profilePicture, // Ensure this matches your API structure
    FirstName: user.firstname,
    FatherName: user.father,
    VyaaparType: user?.vyaapars[0]?.type,
    State: user.State,
    Country:user.Country,
    City:user.City,
    WorkingCity: user.WorkingCity,
  }));

  const columnDefs = [
    {
      headerName: "Pictures",
      field: "profilePicture",
      cellRenderer: ImageCellRenderer,
      width: 90,
      autoHeight: true,
      cellStyle: { display: "flex", alignItems: "center", padding: "5px" },
    },
    { headerName: "ID", field: "id", width: 120 },
    { headerName: "First Name", field: "FirstName", width: 150 },
    { headerName: "Father Name", field: "FatherName", width: 150 },
    { headerName: "Vyaapar Type", field: "VyaaparType", width: 150 },
    { headerName: "Working City", field: "WorkingCity", width: 150 },
    { headerName: "Country", field: "Country", width: 150 },
    { headerName: "State", field: "State", width: 150 },
    { headerName: "City", field: "City", width: 150 },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true, // Enable filtering
    resizable: true,
    suppressSizeToFit: true,
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
     
      <AgGridReact
        rowData={rowData}
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        domLayout="autoHeight"
        rowHeight={50}
      />
    </div>
  );
}
