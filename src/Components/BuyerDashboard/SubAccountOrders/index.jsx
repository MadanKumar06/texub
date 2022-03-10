import React, { useState } from "react";
import "./styles.scss";
import MUITable from '../../MUITable'
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
function SubAccountOrders() {
  const [tableData, setTableData] = useState([]);
  const table = [
    {
      user_name: "Srikant Verma",
      order_id: "000000006",
      date: "02/04/2022",
      sub_total: "₹ 3200.0",
      hub: "Delhi",
      item_qty: 60,
      status: "Delivered",
      action: "View Order",
    },
    {
      user_name: "Ravi Malhotra",
      order_id: "000000006",
      date: "05/05/2022",
      sub_total: "₹ 3200.0",
      hub: "Pune",
      item_qty: 30,
      ordertotal: 75112,
      status: "Confirm",
      action: "View Order",
    },
    {
      user_name: "Ranga",
      order_id: "000000006",
      date: "02/04/2022",
      sub_total: " ₹ 3200.0",
      hub: "Delhi",
      item_qty: 60,
      status: "Pending",
      action: "View Order",
    },
  ];

  const columns = [
    { name: "user_name", label: "User Name" },
    {
      name: "order_id",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="subaccount__orders__order_id">{value}</div>;
        },
      },
    },
    { name: "hub", label: "HUB" },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return <div className="subaccount__orders__date">{value}</div>;
        },
      },
    },
    { name: "item_qty", label: "Items Qty" },
    {
      name: "sub_total",
      label: "Subtotal",
      options: {
        customBodyRender: (value) => {
          return <div className="subaccount__orders__subtotal">{value}</div>;
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
              className={`${
                (value === "Pending" && "subaccount__orders__pending") ||
                (value === "Delivered" && "subaccount__orders__delivered")
              } ${value === "Confirm" && "subaccount__orders__confirmed"}`}
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
          return <div className="subaccount__orders__action">{value}</div>;
        },
      },
    },
  ];
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
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  return (
    <div className="subaccount__orders">
      <MUITable columns={columns} table={tableData} className="subaccount__orders__table" />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />

      <div className="subaccount__orders__back">
        <Link to="/buyerdashboard/dashboard">
          <ArrowBackIosNew />
          <span>Back</span>
        </Link>
      </div>
    </div>
  );
}

export default SubAccountOrders;
