import React, { useState, useEffect } from "react";
import MUITable from "../../../Components/Common/MUITable";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
// import Vieworders from '../../Common/Vieworders'

function Index() {
  const [tableData, setTableData] = useState([]);

  const PaginateDataSplit = (event) => {
    setTableData(event);
  };

  const [isVieworders, setisVieworders] = useState(false);
  const orders = () => {
    setisVieworders(true);
    setisOrders(false);
  };
  const [isOrders, setisOrders] = useState(true);

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
      orderid: "000069",
      date: "11/09/22",
      sellercode: "220012",
      hub: "Mumbai",
      ordertotal: "78999",
      status: "Pending",
      action: "View Order",
    },
    {
      orderid: "000088",
      date: "26/05/22",
      sellercode: "344598",
      hub: "Chennai",
      ordertotal: "67999",
      status: "Confirm",
      action: "View Order",
    },
    {
      orderid: "000088",
      date: "26/05/22",
      sellercode: "344598",
      hub: "Chennai",
      ordertotal: "67999",
      status: "Delivered",
      action: "View Order",
    },
    {
      orderid: "000088",
      date: "26/05/22",
      sellercode: "344598",
      hub: "Chennai",
      ordertotal: "67999",
      status: "Dispatched",
      action: "View Order",
    },
  ];

  const columns = [
    {
      name: "orderid",
      label: "Order ID",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__orderid">{value}</div>;
        },
      },
    },
    { name: "date", label: "Date" },
    {
      name: "sellercode",
      label: "Seller Code",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__sellercode">{value}</div>;
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
            <div className="want_tobuy__ordertotal">
              <span className="currency">INR </span>
              <span className="price">{value}</span>
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
                    ${value === "Pending" && "want_tobuy__pending"}
                    ${value === "Confirm" && "want_tobuy__confirm"}
                    ${value === "Delivered" && "want_tobuy__delivered"}
                    ${value === "Dispatched" && "want_tobuy__dispatched"}
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
          return (
            <div className="want_tobuy__action" onClick={orders}>
              {value}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="want_tobuy">
      <div className="want_tobuy__footer">
        <div className="want_tobuy__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
      {isOrders && (
        <>
          <MUITable
            columns={columns}
            table={tableData}
            options={options}
            className="want_tobuy__table"
          />
          <Pagination
            PaginateData={PaginateDataSplit}
            DataList={table}
            PagePerRow={10}
          />
        </>
      )}
      {/* {isVieworders && <Vieworders />} */}
    </div>
  );
}

export default Index;
