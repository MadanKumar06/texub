import React, { useState } from "react";
import MUITable from '../../../Components/MUITable'
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import "./styles.scss";
import Vieworders from '../MyOrders/Vieworders'

function Index() {
  const [tableData, setTableData] = useState([]);
  const ordertype = [
    { name: "All Orders" },
    { name: "Open Invoice" },
    { name: "On-Going Orders" },
    { name: "Dispatched Orders" },
    { name: "Full-Filled Orders" },
  ];

  const [type, settype] = useState();

  const selectorder = (value) => {
    settype(value);
  };
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const [isVieworders, setisVieworders] = useState(false)
  const orders = () => {
    setisVieworders(true)
    setisOrders(false)
  }
  const [isOrders, setisOrders] = useState(true)

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
          return <div className="myorders__orderid">{value}</div>;
        },
      },
    },
    { name: "date", label: "Date" },
    {
      name: "sellercode",
      label: "Seller Code",
      options: {
        customBodyRender: (value) => {
          return <div className="myorders__sellercode">{value}</div>;
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
            <div className="myorders__ordertotal">
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
                    ${value === "Pending" && "myorders__pending"}
                    ${value === "Confirm" && "myorders__confirm"}
                    ${value === "Delivered" && "myorders__delivered"}
                    ${value === "Dispatched" && "myorders__dispatched"}
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
          return <div className="myorders__action" onClick={orders}>{value}</div>;
        },
      },
    },
  ];

  return (

    <div className="myorders">


      {isOrders &&
        <>
          <div className="myorders__buttons">
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
          <MUITable columns={columns} table={tableData} options={options} className="myorders__table" />
          <Pagination
            PaginateData={PaginateDataSplit}
            DataList={table}
            PagePerRow={10}
          />
        </>

      }
      {isVieworders && <Vieworders />}

      <div className="my_orders__footer">
        <div className="my_orders__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>


  );
}

export default Index;
