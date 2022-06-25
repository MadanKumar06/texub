import React from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import payment_type from "../../../Assets/buyerdashboard/paymentMethods/visa (1).png";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../store/state";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

function PaymentMethod() {
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
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
          return (
            <div>
              <img src={value} alt="" />
            </div>
          );
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
    pagination: false,
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: (
          <div className="no_data_found">
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  return (
    <div className="payment_method">
      <div className="payment_method__footer">
        <div className="payment_method__container">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/buyerdashboard/dashboard`}
          >
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <Button className="payment_method_btn">Add New Payment Method</Button>
        </div>
      </div>
      <MUITable
        title={"STORED PAYMENT METHODS"}
        options={options}
        columns={columns}
        table={table}
        className="payment_method__table"
      />
    </div>
  );
}

export default PaymentMethod;
