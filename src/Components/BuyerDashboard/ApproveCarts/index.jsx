import React, { useState } from "react";
import "./styles.scss";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import MUITable from "../../../Components/Common/MUITable";
import { useStateValue } from "../../../store/state";

function ApproveCart() {
  const [{geo}, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);

  const handleViewChange = () => {
    dispatch({
      type: "SET_MINICART_OPEN_CLOSE",
      value: true,
      open: true,
    });
  };
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
          return <div className="approve__cart__order_id">{value}</div>;
        },
      },
    },
    { name: "hub", label: "HUB" },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return <div className="approve__cart__date">{value}</div>;
        },
      },
    },
    { name: "item_qty", label: "Items Qty" },
    {
      name: "sub_total",
      label: "Subtotal",
      options: {
        customBodyRender: (value) => {
          return <div className="approve__cart__subtotal">{value}</div>;
        },
      },
    },
    {
      name: "sub_total",
      label: "Items",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className="approve__cart__item"
              onClick={() => handleViewChange()}
            >
              View
            </div>
          );
        },
      },
    },
    {
      name: "sub_total",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="approve__cart__action_main">
              <div className="approve__cart__action">Approve</div>
              <div className="approve__cart__action delete">Delete</div>
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
    <div className="approve__cart">
      <div className="approve__cart__footer">
        <div className="approve__cart__container">
          <Link to={`/:${geo?.country_name}/buyerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <div className="approve__cart_button">
            <Button className="approve__cart_btn">Approve</Button>
            <Button className="Delete_btn">Delete</Button>
          </div>
        </div>
      </div>
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="approve__cart__table"
      />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />
    </div>
  );
}

export default ApproveCart;
