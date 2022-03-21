import React, { useState } from "react";
import "./styles.scss";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import MUITable from "../../../Components/Common/MUITable";

function MergeCarts() {
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
    },
    {
      user_name: "Ranga",
      order_id: "000000006",
      date: "02/04/2022",
      sub_total: " ₹ 3200.0",
      hub: "Delhi",
      item_qty: 60,
      status: "Pending",
    },
  ];

  const columns = [
    { name: "user_name", label: "User Name" },
    {
      name: "order_id",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="mergecarts__order_id">{value}</div>;
        },
      },
    },
    { name: "hub", label: "HUB" },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return <div className="mergecarts__date">{value}</div>;
        },
      },
    },
    { name: "item_qty", label: "Items Qty" },
    {
      name: "sub_total",
      label: "Subtotal",
      options: {
        customBodyRender: (value) => {
          return <div className="mergecarts__subtotal">{value}</div>;
        },
      },
    },
    {
      name: "sub_total",
      label: "Items",
      options: {
        customBodyRender: (value) => {
          return <div className="mergecarts__item">View</div>;
        },
      },
    },
    {
      name: "sub_total",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="mergecart__action_main">
              <div className="mergecarts__action">Merge</div>
              <div className="mergecarts__action delete">Delete</div>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: true,
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
    <div className="mergecarts">
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="sellerprofile__table"
      />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />

      <div className="mergecarts__footer">
        <div className="mergecarts__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <div className="merge__cart_button">
            <Button className="merge_btn">Merge</Button>
            <Button className="Delete_btn">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MergeCarts;
