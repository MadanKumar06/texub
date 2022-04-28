import React, { useState, useEffect } from "react";
import checkoutmark from "../../../../../Assets/CheckoutPage/check-mark.png";
import { Link } from "react-router-dom";
import { ArrowBackIosNew } from "@mui/icons-material";
import MUITable from "../../../../../Components/Common/MUITable";
import minicart_new from "../../../../../Assets/Minicart/minicart_new.png";


import "./styles.scss";

function Index() {

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

      const tableData = [
        {
          orderno: "28890823",
          invoiceno: "000000027",
          amount_paid: "5,042,799",
          date: "26/04/21",
          payment_method: "WIRE TRANSFER",
          reference_number: "INV/2022/0013/13",
        },
        {
          orderno: "28890823",
          invoiceno: "000000027",
          amount_paid: "5,042,799",
          date: "26/04/21",
          payment_method: "WIRE TRANSFER",
          reference_number: "INV/2022/0013/13",
        },
      ];
        const columns = [
          {
            name: "orderno",
            label: "Order No.",
            options: {
              customBodyRender: (value) => {
                return <div className="table__orderno">{value}</div>;
              },
            },
          },
          {
            name: "invoiceno",
            label: "Invoice No.",
            options: {
              customBodyRender: (value) => {
                return <div className="table__invoiceno">{value}</div>;
              },
            },
          },
          {
            name: "amount_paid",
            label: "Amount Paid",
            options: {
              customBodyRender: (value) => {
                return (
                  <div className="table__price ">
                    <span className="symbol">INR</span>
                    <span className="price"> {value} </span>
                  </div>
                );
              },
            },
          },

          {
            name: "date",
            label: "Date",
            options: {
              customBodyRender: (value) => {
                return <div className="table__date">{value}</div>;
              },
            },
          },
          {
            name: "payment_method",
            label: "Payment Method",
            options: {
              customBodyRender: (value) => {
                return <div className="table_payment_method">{value}</div>;
              },
            },
          },
          {
            name: "reference_number",
            label: "Reference Number",
            options: {
              customBodyRender: (value) => {
                return <div className="table_reference_number">{value}</div>;
              },
            },
          },
        ];


    return (
      <div className="order_info_top_section">
        <div className="order_info_top">
          <div className="order_thanks_info">
            <div className="report_image">
              <img src={checkoutmark} alt="" />
            </div>
            <span className="thanks_text">Thank You For Your Order</span>
          </div>
          <div className="order_info_download">
            <div className="checklist__download">
              <svg
                id="Icon"
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 40 40"
              >
                <rect
                  id="Area"
                  width="40"
                  height="40"
                  fill="#fff"
                  opacity="0"
                />
                <g id="Icon-2" data-name="Icon" transform="translate(4.5 4.5)">
                  <path
                    id="Path"
                    d="M35.5,22.5v6a3.245,3.245,0,0,1-3.444,3H7.944a3.245,3.245,0,0,1-3.444-3v-6"
                    transform="translate(-4.5 -0.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <path
                    id="Path-2"
                    data-name="Path"
                    d="M10.5,15,20,22.5,29.5,15"
                    transform="translate(-4.5 -2.346)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                  <line
                    id="Line"
                    y1="18"
                    transform="translate(15.5)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />{" "}
                </g>
              </svg>
            </div>
            <Link to={"/"}>
              <span className="download">Download PDF</span>
            </Link>
          </div>
        </div>

        <div className="order_info_middle">
          <div className="table_title">
            <span>Order Details</span>
          </div>
          <div className="order_table_info">
            <MUITable
              columns={columns}
              table={tableData}
              options={options}
              className="order_info_list"
            />
          </div>
        </div>
      </div>
    );


};

export default Index;
