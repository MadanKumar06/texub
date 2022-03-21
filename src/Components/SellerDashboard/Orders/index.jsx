import React, { useState } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import { ArrowBackIosNew } from "@mui/icons-material";
import ViewOrder from '../../Common/Vieworders'
function Index() {
  const [tableData, setTableData] = useState([]);
  const ordertype = [
    { name: "All Orders" },
    { name: "Purchase Orders" },
    { name: "Full-Filled Orders" },
    { name: "Cancelled Orders" },
  ];

  const [type, settype] = useState(0);

  const selectorder = (value) => {
    settype(value);
  };
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const [vieworder, setvieworder] = useState(false)
  const showorder = () => {
    setvieworder(true)
  }

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  const table = [
    {
      order: "#000000006",
      date: "02/04/2022",
      buyercode: 220120,
      hub: "Delhi",
      ordertotal: 67999,
      status: "Dispatched",
      action: "View Order",
    },
    {
      order: "#000000007",
      date: "05/05/2022",
      buyercode: 220145,
      hub: "Pune",
      ordertotal: 75112,
      status: "Confirm",
      action: "View Order",
    },
    {
      order: "#000000006",
      date: "02/04/2022",
      buyercode: 220120,
      hub: "Delhi",
      ordertotal: 67999,
      status: "Pending",
      action: "View Order",
    },
    {
      order: "#000000007",
      date: "05/05/2022",
      buyercode: 220145,
      hub: "Pune",
      ordertotal: 75112,
      status: "Delivered",
      action: "View Order",
    },
  ];

  const columns = [
    {
      name: "order",
      label: "Order #",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__code">{value}</div>;
        },
      },
    },
    { name: "date", label: "Date" },
    {
      name: "buyercode",
      label: "Buyer Code",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__buyercode">{value}</div>;
        },
      },
    },
    { name: "hub", label: "HUB" },
    {
      name: "ordertotal",
      label: "Order Total",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="orders__ordertotal">
              <span className="label">INR</span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className={`
              ${value === "Pending" && "orders__pending"}
              ${value === "Confirm" && "orders__confirmed"}
              ${value === "Delivered" && "orders__delivered"}
              ${value === "Dispatched" && "orders__dispatched"}
              `}
            >
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return <div className="orders__action" onClick={showorder}>{value}</div>;
        },
      },
    },
  ];

  return (
    <div className="orders">
      {!vieworder ? <>
        <div className="orders__back__footer">
          <div className="orders__back__container">
            <Link to="/buyerdashboard/dashboard">
              <ArrowBackIosNew />
              <span>Back</span>
            </Link>
          </div>
        </div>
        
        <div className="orders__buttons">
          {ordertype.map((data, i) => (
            <p
              className={`ordertypes ${type === i && "ordertype__selected"}`}
              key={i}
              onClick={() => selectorder(i)}
            >
              {data.name}
            </p>
          ))}
        </div>

        <MUITable
          columns={columns}
          table={tableData}
          options={options}
          className="orders__table"
        />

        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={table}
          PagePerRow={10}
        />

        </> : <ViewOrder />}
      
    </div>
  );
}

export default Index;
