import React, { useEffect, useState } from "react";
import { Divider, Button } from "@mui/material";
import "./styles.scss";
import { useStateValue } from "../../../../../store/state";
import MUITable from "../../../../Common/MUITable";

import image from "../../../../../Assets/buyerdashboard/auctions/hp.png";
import logo from "../../../../../Assets/Homepage Assets/Group.png";
import {
  totalamount,
  transaction_info,
} from "../../../../Common/Vieworders/viewordersjson";
import axios from "axios";
import Constant from "../../../../../Constant";
import NodataFound from "../../../../../Assets/CommonImage/NodataFound.webp.png";

import moment from "moment";
import { useParams } from "react-router-dom";
import { SessionExpiredLogout } from "../../../../../utilities";

const Index = ({ orders }) => {
  const { order_id } = useParams();
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  const [{}, dispatch] = useStateValue();

  const [detailsorder, setdetailsorder] = useState([]);

  useEffect(async () => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const orderdetails = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/getBuyerOrderDetails`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          orderId: order_id,
          customerId: user?.id,
        },
      });
      setdetailsorder(orderdetails?.data ? orderdetails?.data : []);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
    }
  }, [order_id]);

  const options = {
    filter: false,
    filterType: "dropdown",
    pagination: false,
    responsive: "vertical",
    selectableRows: "none",
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
  const columns = [
    {
      name: "productname",
      label: "Product Name",
      options: {
        customBodyRender: (value, tablemeta) => {
          let name = tablemeta?.rowData[9];
          let discription = tablemeta?.rowData[10];
          return (
            <div className="productname">
              <img src={image} alt="" className="image"></img>
              <div className="product">
                <span className="modal_name">{name}</span>
                <span className="modal_content">{discription}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "sku",
      label: "SKU",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworers_sky">{value}</div>;
        },
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworders_quantity">{parseInt(value)}</div>;
        },
      },
    },
    {
      name: "sellercode",
      label: "seller Code",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworders_seller_code">{value}</div>;
        },
      },
    },
    {
      name: "hub",
      label: "Hub",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworders_hub">{value}</div>;
        },
      },
    },
    {
      name: "eta",
      label: "ETA",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworders_eta">{value} Days</div>;
        },
      },
    },
    {
      name: "warranty",
      label: "Warranty",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworders_warranty">{value} Days</div>;
        },
      },
    },
    {
      name: "unit_price",
      label: "UNIT PRICE",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData[12];
          return (
            <div className="vieworders_price">
              <span className="inr"> {currency}</span>
              <span className="price">
                {" "}
                {formatToCurrency(parseInt(value))}{" "}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "sub_total",
      label: "SUB-TOTAL",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData[12];
          return (
            <div className="vieworders_total">
              <span className="inr"> {currency}</span>
              <span className="price">
                {" "}
                {formatToCurrency(parseInt(value))}{" "}
              </span>
            </div>
          );
        },
      },
    },
    {
      name: "name",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "description",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "serialNumbers",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "currency",
      label: " ",
      options: {
        display: false,
      },
    },
  ];
  useEffect(() => {
    document
      .getElementById("Header-header_main-2")
      .classList.remove("Header-header_main-2");
    document
      .getElementById("Header-header_main-2")
      .classList.add("Header-header_main-2_no_display");

    document
      .getElementById("user_details_main_container")
      .classList.remove("user_details_main_container");
    document
      .getElementById("user_details_main_container")
      .classList.add("user_details_main_container_no_display");
  }, []);

  //   document
  //   .getElementById("Header-header_main-2")
  //   .classList.remove("btn_invoice_no_display");
  // document
  //   .getElementById("Header-header_main-2_no_display")
  //   .classList.add("Header-header_main-2");

  // document
  //   .getElementById("user_details_main_container")
  //   .classList.remove("user_details_main_container_no_display");
  // document
  //   .getElementById("user_details_main_container")
  //   .classList.add("user_details_main_container");

  const handleChange = () => {
    window.onbeforeprint = function (event) {
      document.getElementById("print_btn").classList.remove("print_btn");
      document
        .getElementById("print_btn")
        .classList.add("print_btn_no_display");
    };
    window.onafterprint = function (event) {
      document
        .getElementById("print_btn")
        .classList.remove("print_btn_no_display");
      document.getElementById("print_btn").classList.add("print_btn");
    };
    window.print();
  };
  return (
    <>
      <div className="vieworders_main_invoice" id="vieworders_main">
        <div className="logo">
          <img src={logo} alt="texub logo" />
        </div>
        <div className="vieworders_heading_section">
          <div className="order_info_section1">
            <div className="username">
              <span className="id_heading">Order Date :</span>
              <span className="id">
                {moment(
                  detailsorder?.[0]?.order_details?.[0]?.created_at
                ).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="username">
              <span className="id_heading">Order ID :</span>
              <span className="id">{order_id}</span>
              <span className="status">
                {detailsorder?.[0]?.order_details?.[0]?.order_status == 1
                  ? "Pending"
                  : detailsorder?.[0]?.order_details?.[0]?.order_status == 2
                  ? "Confrim"
                  : detailsorder?.[0]?.order_details?.[0]?.order_status == 3
                  ? "Dispatch"
                  : detailsorder?.[0]?.order_details?.[0]?.order_status == 4
                  ? "Deliverd"
                  : ""}
              </span>
            </div>
            <div className="username">
              <span className="id_heading">Transaction ID :</span>
              <span className="id">
                {detailsorder?.[0]?.order_details?.[0]?.transaction_number}
              </span>
              <span className="status">
                {detailsorder?.[0]?.order_details?.[0]?.payment_status == 1
                  ? "Pending"
                  : detailsorder?.[0]?.order_details?.[0]?.payment_status == 2
                  ? "Completed"
                  : detailsorder?.[0]?.order_details?.[0]?.payment_status == 3
                  ? "Failed"
                  : ""}
              </span>
            </div>
          </div>
          <div className="order_info_section2">
            <div className="order_user_info">
              <div className="username">
                <span className="id_heading">Order ID :</span>
                <span className="id">{order_id}</span>
              </div>
              {detailsorder?.[0]?.order_details?.[0]?.approved_by === "--" ? (
                ""
              ) : (
                <div className="username">
                  <span className="id_heading">Approved By</span>
                  <span className="id">
                    {detailsorder?.[0]?.order_details?.[0]?.approved_by}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <MUITable
          columns={columns}
          table={
            detailsorder?.[0]?.productdetails
              ? detailsorder?.[0]?.productdetails
              : []
          }
          options={options}
          className="vieworders__table"
        />
        <div className="vieworders__detailscontainer">
          <p className="vieworders__bg"></p>
          <div className="vieworders_detail_section">
            <p className="heading">Order Details</p>
            <div className="details">
              <div className="hr_line">
                <hr></hr>
              </div>
              <div className="vieworder_address">
                <div className="address_section">
                  <div className="vieworders_shippingaddress_section">
                    <div className="vieworders_payment_section">
                      <p className="payment_heading">Shipping Method</p>
                      <p className="payment_type">TEXUB Shipping</p>
                    </div>
                  </div>

                  <div className="vieworders_shippingaddress_section">
                    <div className="vieworders_shippingaddress">
                      <li className="vieworders_list">
                        <span className="heading address_heading">
                          Shipping Address
                          {/* {detailsorder?.[0]?.order_details?.[0]?.shipping_name} */}
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.firstname
                          }{" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.lastname
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.Street?.[0]
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.Street?.[1]
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.city
                          }
                          {" - "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.country_id
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.shipping_address?.[0]?.postcode
                          }
                        </span>
                      </li>
                    </div>
                    <div className="vieworders_shippingaddress">
                      <li className="vieworders_list">
                        <span className="heading address_heading">
                          Billing Address
                          {/* {detailsorder?.[0]?.order_details?.[0]?.billing_name} */}
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.firstname
                          }{" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.lastname
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.Street?.[0]
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.Street?.[1]
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.city
                          }
                          {" - "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.country_id
                          }
                        </span>
                        <span className="name">
                          {" "}
                          {
                            detailsorder?.[0]?.order_details?.[0]
                              ?.billing_address?.[0]?.postcode
                          }
                        </span>
                      </li>
                    </div>
                  </div>
                  <div className="vieworders_shippingaddress_section pay_transaction_block">
                    <div className="vieworders_payment_section payment_block">
                      <p className="payment_heading">Payment Method</p>
                      <p className="payment_type">
                        {" "}
                        {detailsorder?.[0]?.order_details?.[0]?.payment_method}
                      </p>
                    </div>
                    <div className="vieworders_payment_section transaction_block">
                      {detailsorder?.[0]?.order_details?.[0]
                        ?.transaction_date ? (
                        <div className="vieworders_list">
                          <span className="block_title">
                            Transaction Refernece Number :{" "}
                            <span className="value">
                              {
                                detailsorder?.[0]?.order_details?.[0]
                                  ?.transaction_number
                              }
                            </span>
                          </span>
                          <span className="block_title">
                            Transaction Amount :{" "}
                            <span className="value">
                              {
                                detailsorder?.[0]?.order_details?.[0]
                                  ?.transaction_currency
                              }
                            </span>{" "}
                            <span>
                              {formatToCurrency(
                                parseInt(
                                  detailsorder?.[0]?.order_details?.[0]
                                    ?.transaction_amount
                                )
                              )}
                            </span>
                          </span>
                          <span className="block_title date_time">
                            Date & Time :
                            <span className="value">
                              {" "}
                              {moment(
                                detailsorder?.[0]?.order_details?.[0]
                                  ?.transaction_date
                              ).format("DD/MM/YYYY")}
                            </span>
                            <Divider orientation="vertical" />
                            <span className="value_price">
                              {" "}
                              {moment(
                                detailsorder?.[0]?.order_details?.[0]
                                  ?.transaction_date
                              ).format("HH:mm:ss")}
                            </span>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="vieworders_total">
                  <li className="vieworders_list">
                    <span className="total_heading"> Sub-Total</span>
                    <span className="total_amount">
                      <span className="currency">
                        {" "}
                        {detailsorder?.[0]?.order_details?.[0]?.order_currency}
                      </span>{" "}
                      {formatToCurrency(
                        parseInt(detailsorder?.[0]?.order_details[0]?.subtotal)
                      )}
                    </span>
                  </li>
                  <li className="vieworders_list">
                    <span className="total_heading"> Shipping Charge</span>
                    <span className="total_amount">
                      <span className="currency">
                        {" "}
                        {detailsorder?.[0]?.order_details?.[0]?.order_currency}
                      </span>{" "}
                      {formatToCurrency(
                        parseInt(
                          detailsorder?.[0]?.order_details[0]?.shipping_charge
                        )
                      )}
                    </span>
                  </li>
                  <li className="vieworders_list">
                    <span className="total_heading"> Discount Price</span>
                    <span className="total_amount">
                      <span className="currency">
                        {" "}
                        {detailsorder?.[0]?.order_details?.[0]?.order_currency}
                      </span>{" "}
                      0.00
                    </span>
                  </li>
                  <hr className="hr"></hr>
                  {totalamount?.length &&
                    totalamount?.map((item) => (
                      <li key={item.id} className="vieworders_list">
                        <div className="taxes">
                          <span className="total_amount_heading">
                            Total Amount
                          </span>
                          <span className="gst">(incl.GST)</span>
                        </div>
                        <span className="total_amount">
                          <span className="currency">
                            {" "}
                            {
                              detailsorder?.[0]?.order_details?.[0]
                                ?.order_currency
                            }
                          </span>{" "}
                          {formatToCurrency(
                            parseInt(
                              detailsorder?.[0]?.order_details[0]?.grand_total
                            )
                          )}
                        </span>
                      </li>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="print_btn" id="print_btn">
          <Button
            className="button-text btn-secondary"
            onClick={() => handleChange()}
          >
            Print
          </Button>
        </div>
      </div>
    </>
  );
};
export default Index;
