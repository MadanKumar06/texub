import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../../Components/Common/MUITable";
import { Button } from "@mui/material";
import Checkout_Texub_logo from "../../../Assets/CheckoutPage/checkout_texub_logo.png";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { SessionExpiredLogout } from "../../../utilities";
var moment = require("moment");

function Index() {
  const [{ currency }, dispatch] = useStateValue();
  const { qid } = useParams();
  const [pendingInvoiceList, setPendingInvoiceList] = useState([]);
  var currency_id = JSON.parse(localStorage.getItem("currency"));

  let buyerCode = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_code"
  );
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
  useEffect(async () => {
    if (qid === undefined) return;
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const data = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/pendingInvoiceDetails`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          quote_id: parseInt(qid),
        },
      });
      setPendingInvoiceList(data?.data[0]);
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
  }, [qid]);

  useEffect(() => {
    if (qid !== undefined) return;
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    const user = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      data: {
        customer_id: user?.id,
        currency: currency_id?.currency_id,
        quote_id: qid,
      },
    };
    axios
      .post(Constant.baseUrl() + "/pendingInvoiceList", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        let length = res?.data?.length - 1;
        setPendingInvoiceList(res?.data?.[length]);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (error.response.status === 401) {
          SessionExpiredLogout();
        }
      });
  }, [currency]);

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    pagination: false,
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
      name: "seller_id",
      label: "SELLER ID",
      options: {
        customBodyRender: (value) => {
          return <div className="table__sellerid">{value}</div>;
        },
      },
    },
    {
      name: "description",
      label: "PRODUCT DESCRIPTION",
      options: {
        customBodyRender: (value, tablemeta) => {
          let product_name = tablemeta?.rowData?.[8];
          let product_barnd = tablemeta?.rowData?.[7];
          let brand_name = tablemeta?.rowData?.[9];
          return (
            <div className="productname">
              <div className="brand_info_section">
                {product_barnd ? (
                  <img
                    src={`${Constant.imageBaseUrl()}${product_barnd}`}
                    alt=""
                  />
                ) : (
                  <span className="brand_name_section">{brand_name}</span>
                )}
              </div>
              <div className="product">
                <span className="modal_name">{product_name}</span>
                <span className="modal_content">{value}</span>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "hub",
      label: "HUB",
      options: {
        customBodyRender: (value) => {
          return <div className="table__hub">{value}</div>;
        },
      },
    },

    {
      name: "price",
      label: "UNIT PRICE",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData?.[6];
          return (
            <div className="vieworders_price">
              <span className="symbol">{currency}</span>
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
      name: "qty",
      label: "QUANTITY",
      options: {
        customBodyRender: (value) => {
          return <div className="vieworders_quantity">{parseInt(value)}</div>;
        },
      },
    },
    {
      name: "row_total",
      label: "TOTAL PRICE",
      options: {
        customBodyRender: (value, tablemeta) => {
          let currency = tablemeta?.rowData?.[6];
          return (
            <div className="table__price ">
              <span className="symbol">{currency}</span>
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
      name: "currency",
      label: "",
      options: {
        display: false,
      },
    },
    {
      name: "brand",
      label: "",
      options: {
        display: false,
      },
    },

    {
      name: "product_name",
      label: "",
      options: {
        display: false,
      },
    },
    {
      name: "brand_name",
      label: "",
      options: {
        display: false,
      },
    },
  ];

  function formatToCurrency(amount) {
    return amount
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

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
    <div className="pendinginvoice_print" id="pendinginvoice">
      <div className="pendinginvoice__top">
        <div className="top__header">
          <div className="checkout_info_list">
            <div className="order_id_info">
              <div className="orderid_section">
                <span className="orderinfo_name">Pending Invoice No.</span>
                <span className="orderinfo_value">
                  {pendingInvoiceList?.invoice?.pending_invoice_id}
                </span>
              </div>
            </div>
            <div className="order_total_info">
              <div className="ordertal_section">
                <span className="orderinfo_name">Total Amount</span>

                <span className="orderinfo_value">
                  <span className="ordertotal_symbol">
                    {pendingInvoiceList?.invoice?.quote_currency}
                  </span>

                  {formatToCurrency(
                    parseInt(pendingInvoiceList?.invoice?.grand_total)
                  )}
                </span>
              </div>
            </div>
            <div className="order_status_info">
              <div className="orderstatus_section">
                <span className="orderinfo_name">Order Status</span>
                <span className="orderinfo_value">
                  {pendingInvoiceList?.invoice?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="top__orderinfo">
          <div className="orderingo__logo">
            <img
              className="checkout_texub_logo"
              src={Checkout_Texub_logo}
              alt=""
            />
          </div>
          <div className="orderinfo__data">
            <div className="order-invoice_info">
              <span className="label">Pending Invoice No.</span>
              <Divider orientation="vertical" />
              <span className="value">
                {" "}
                {pendingInvoiceList?.invoice?.pending_invoice_id}
              </span>
            </div>
            <div className="order-invoice_info">
              <span className="label">Date</span>
              <Divider orientation="vertical" />
              <span className="value">
                {" "}
                {moment(pendingInvoiceList?.invoice?.date).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="order-invoice_info">
              <span className="label">Due Date</span>
              <Divider orientation="vertical" />
              <span className="value">
                {" "}
                {moment(pendingInvoiceList?.invoice?.due_date).format(
                  "DD/MM/YYYY"
                )}
              </span>
            </div>
            <div className="order-invoice_info">
              <span className="label">Buyer ID</span>
              <Divider orientation="vertical" />
              <span className="value">{buyerCode?.[0]?.value}</span>
            </div>
          </div>
        </div>

        <div className="top__address">
          <div className="address__bill">
            <h4>BILL TO</h4>
            <p className="name">{pendingInvoiceList?.bill_to_name}</p>
            <div className="content">
              <span>{pendingInvoiceList?.bill_to_address1},</span>
              <span>{pendingInvoiceList?.bill_to_address2}</span>

              <span>
                {pendingInvoiceList?.bill_to_city}-
                {pendingInvoiceList?.bill_to_country}
              </span>
              <span>{pendingInvoiceList?.bill_to_state}</span>
              <span>{pendingInvoiceList?.bill_to_pincode}</span>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="address__pickup">
            <h4>PICK UP ADDRESS</h4>
            <p className="name">{pendingInvoiceList?.pick_up_name}</p>
            <div className="content">
              <span>{pendingInvoiceList?.pick_up_address1},</span>
              <span>{pendingInvoiceList?.pick_up_address2}</span>

              <span>
                {pendingInvoiceList?.pick_up_city}-
                {pendingInvoiceList?.pick_up_country}
              </span>
              <span>{pendingInvoiceList?.pick_up_state}</span>
              <span>{pendingInvoiceList?.pick_up_pincode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pendinginvoice__middle">
        <div className="middle__table">
          <MUITable
            columns={columns}
            table={pendingInvoiceList?.invoice_items}
            options={options}
            className="approve__cart__table"
          />
        </div>

        <div className="middle__tableinfo">
          <div className="tableinfo__details">
            <span className="title">Beneficiary Bank</span>
            <div
              className="payment_info_return"
              dangerouslySetInnerHTML={{
                __html: pendingInvoiceList?.beneficiary_bank,
              }}
            ></div>
          </div>
          <div className="tableinfo__orderdata">
            <div className="table_price_data">
              <span className="label">Sub-Total</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {" "}
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>{" "}
                {formatToCurrency(
                  parseInt(pendingInvoiceList?.invoice?.subtotal)
                )}{" "}
              </span>
            </div>
            <div className="table_price_data">
              <span className="label">Tax</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {" "}
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>{" "}
                {formatToCurrency(parseInt(pendingInvoiceList?.invoice?.tax))}{" "}
              </span>
            </div>
            <div className="table_price_data">
              <span className="label">Freight</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>
                {formatToCurrency(
                  parseInt(pendingInvoiceList?.invoice?.shipping_amount)
                )}{" "}
              </span>
            </div>
            <div className="table_price_data">
              <span className="label">Payment Processing Charge</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>
                00.00
              </span>
            </div>
            <div
              className="total_value_block table_price_data"
              style={{
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div className="total_value_section">
                <span className="total label">Total Order value</span>
                <Divider
                  style={{ visibility: "hidden" }}
                  orientation="vertical"
                />
                <span className="value">
                  <span className="value_symobol">
                    {" "}
                    {pendingInvoiceList?.invoice?.quote_currency}
                  </span>
                  {formatToCurrency(
                    parseInt(pendingInvoiceList?.invoice?.grand_total)
                  )}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pendinginvoice__bottom">
        <div className="bottom__terms">
          <h4>TERMS & CONDITIONS*</h4>
          <p>{pendingInvoiceList?.invoice_Tearms_condition}</p>
        </div>
        {pendingInvoiceList?.remarks ? (
          <div className="remark_block">
            <span className="remark_title">Remarks</span>
            <p className="remark_content">{pendingInvoiceList?.remarks}</p>
          </div>
        ) : (
          ""
        )}
        <div className="print_btn" id="print_btn">
          <Button
            className="button-text btn-secondary invoice_print"
            onClick={() => handleChange()}
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="30.000000pt"
              height="30.000000pt"
              viewBox="0 0 30.000000 30.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path
                  d="M60 245 c0 -12 17 -15 90 -15 73 0 90 3 90 15 0 12 -17 15 -90 15
-73 0 -90 -3 -90 -15z"
                />
                <path
                  d="M27 204 c-4 -4 -7 -32 -7 -62 0 -45 3 -55 20 -59 13 -3 20 -14 20
-29 0 -24 2 -24 90 -24 88 0 90 0 90 24 0 15 7 26 21 29 18 5 20 12 17 64 l-3
58 -121 3 c-66 1 -123 -1 -127 -4z m193 -104 l0 -50 -70 0 -70 0 0 50 0 50 70
0 70 0 0 -50z"
                />
              </g>
            </svg>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Index;
