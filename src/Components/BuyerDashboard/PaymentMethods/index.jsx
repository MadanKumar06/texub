import React from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import payment_type from "../../../Assets/buyerdashboard/paymentMethods/visa (1).png";
import { Link } from "react-router-dom";

function PaymentMethod() {
  const table = [
    {
      card_number: "Ending with….1789",
      expire_date: "11/28",
      payment_type: payment_type,
    },
    {
      card_number: "Ending with….5789",
      expire_date: "11/38",
      payment_type: payment_type,
    },
    {
      card_number: "Ending with….6719",
      expire_date: "11/23",
      payment_type: payment_type,
    },
  ];

  const columns = [
    { name: "card_number", label: "Card Number" },
    { name: "expire_date", label: "Expiration Date" },
    {
      name: "payment_type",
      label: "Type",
      options: {
        customBodyRender: (value) => {
          return <img src={value} alt="" />;
        },
      },
    },
    {
      name: "card_number",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return <div className="payment_method__action">Delete</div>;
        },
      },
    },
  ];
  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: false,
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

  return (
    <div className="payment_method">
      {/* <MUIDataTable
        title={"STORED PAYMENT METHODS"}
        data={table}
        columns={columns}
        options={options}
        className="payment_method__table"
      /> */}
      <MUITable
        title={"STORED PAYMENT METHODS"}
        options={options}
        columns={columns}
        table={table}
        className="payment_method__table"
      />

      <div className="payment_method__footer">
        <div className="payment_method__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <Button className="payment_method_btn">Add New Payment Method</Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
