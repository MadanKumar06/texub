import React, { useState, useEffect } from "react";
import "./styles.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MUITable from "../../Components/Common/MUITable";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button, IconButton, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Checkout_Texub_logo from "../../Assets/CheckoutPage/checkout_texub_logo.png";
import image from "../../Assets/buyerdashboard/auctions/hp.png";
import minicart_new from "../../Assets/Minicart/minicart_new.png";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";
import Divider from "@mui/material/Divider";
import { useParams, useNavigate } from "react-router-dom";
var moment = require("moment");

function Index() {
  const [{ geo, customstore, customnostore, currency }, dispatch] =
    useStateValue();
  const { qid } = useParams();
  const [pendingInvoiceList, setPendingInvoiceList] = useState([]);
  console.log(qid);
  var currency_id = JSON.parse(localStorage.getItem("currency"));

  let buyerCode = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_code"
  );
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
      console.log(data?.data[0]);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
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
        setPendingInvoiceList(res?.data?.[0]);
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
      });
  }, [currency]);

  console.log(pendingInvoiceList);

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
          return (
            <div className="productname">
              <img src={`${Constant.imageBaseUrl()}${product_barnd}`} alt="" />
              <span className="product_name_new">
                {/* <img src={minicart_new} alt="" /> */}
              </span>
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
  ];

  function formatToCurrency(amount) {
    return amount
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  const navigate = useNavigate();
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let placeorder =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-place-order" && per?.permission_value === 0
        );
  return (
    <div className="pendinginvoice">
      <div className="pendinginvoice__top">
        <div className="top__header">
          <div className="checkout_info_list">
            <div className="checkout_back_toggle">
              <p
                onClick={() => navigate(-1)}
                style={{ color: "white", cursor: "pointer" }}
              >
                <ArrowBackIosNew />
              </p>
            </div>
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
                <span className="orderinfo_value">Pending</span>
              </div>
            </div>
            <div className="order_apply_btns">
            <div className="order_apply-btn">
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/products`}
                style={{ textDecoration: "none" }}
              >
                <Button className="button-text btn-primary clear checkout-apply-btn">
                  Continue Shopping
                </Button>
              </Link>
            </div>
            <div className="checkoutlist__download">
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
            </div>
          </div>
          {/* <ArrowBackIosIcon />
          <span>
            <p className='label'>Order ID</p>
            <p className='value'>28739822</p>
          </span>
          <span>
            <p className='label'>Total Amount</p>
            <p className='value'> 10,729,830</p>
          </span>
          <span>
            <p className='label'>Order Status</p>
            <p className='value'>Pending</p>
          </span>
          <p>Continue Shopping</p> */}
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
            <p>
              <span className="label">Pending Invoice No.</span>
              <Divider orientation="vertical" />
              <span className="value">
                {" "}
                {pendingInvoiceList?.invoice?.pending_invoice_id}
              </span>
            </p>
            <p>
              <span className="label">Date</span>
              <Divider orientation="vertical" />
              <span className="value">
                {" "}
                {moment(pendingInvoiceList?.invoice?.date).format("DD/MM/YYYY")}
              </span>
            </p>
            <p>
              <span className="label">Due Date</span>
              <Divider orientation="vertical" />
              <span className="value">
                {" "}
                {moment(pendingInvoiceList?.invoice?.due_date).format(
                  "DD/MM/YYYY"
                )}
              </span>
            </p>
            <p>
              <span className="label">Buyer ID</span>
              <Divider orientation="vertical" />
              <span className="value">{buyerCode?.[0]?.value}</span>
            </p>
          </div>
        </div>

        <div className="top__address">
          <div className="address__bill">
            <h4>BILL TO</h4>
            <p className="name">{pendingInvoiceList?.bill_to_name}</p>
            <div className="content">
              <span>
                {pendingInvoiceList?.bill_to_address1},
                {pendingInvoiceList?.bill_to_address2}
              </span>

              <span>
                {pendingInvoiceList?.bill_to_city}-
                {pendingInvoiceList?.bill_to_country}
              </span>
              <span>{pendingInvoiceList?.bill_to_pincode}</span>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="address__pickup">
            <h4>PICK UP ADDRESS</h4>
            <p className="name">{pendingInvoiceList?.pick_up_name}</p>
            <div className="content">
              <span>
                {pendingInvoiceList?.pick_up_address1},
                {pendingInvoiceList?.pick_up_address2}
              </span>

              <span>
                {pendingInvoiceList?.pick_up_city}-
                {pendingInvoiceList?.pick_up_country}
              </span>
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
            {/* <div className="content">
              <span className="label">Bank Name : </span>
              <span className="value">India Overseas Bank</span>
            </div>
            <div className="content">
              <span className="label">Bank Address : </span>
              <span className="value">
                61/234, HRBR Layout Bangalore - 560043
              </span>
            </div>
            <div className="content">
              <span className="label">Account Routing (ABA) : </span>
              <span className="value">001234587</span>
            </div>
            <div className="content">
              <span className="label">ACH : </span>
              <span className="value">001234587</span>
            </div>
            <div className="content">
              <span className="label">SWIFT/BIC CODE : </span>
              <span className="value">CNBFUS3M</span>
            </div>
            <div className="content">
              <span className="label">ACCOUNT NUMBER : </span>
              <span className="value">32170023400</span>
            </div>
            <span className="title">BENIFICIARY COMPANY</span>
            <div className="content">
              <span className="label">BENIFICIARY NAME : </span>
              <span className="value">TEXUB LLC</span>
            </div>
            <div className="content">
              <span className="label">BENIFICIARY ADDRESS : </span>
              <span className="value">
                61/234, HRBR LAYOUT BANGALORE - 560043
              </span>
            </div> */}
          </div>
          <div className="tableinfo__orderdata">
            <p>
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
            </p>
            <p>
              <span className="label">Tax</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {" "}
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>{" "}
                {formatToCurrency(parseInt(pendingInvoiceList?.invoice?.tax))}{" "}
              </span>
            </p>
            <p>
              <span className="label">Freight</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>
                    {formatToCurrency(parseInt(pendingInvoiceList?.invoice?.shipping_amount))}{" "}

              </span>
            </p>
            <p>
              <span className="label">Payment Processing Charge</span>
              <Divider orientation="vertical" />
              <span className="value">
                <span className="value_symobol">
                  {pendingInvoiceList?.invoice?.quote_currency}
                </span>
                00.00
              </span>
            </p>
             {/* <p className="total_value_section_block" style={{position:"relative",
                      paddingTop:"10px",
                      paddingBottom:"10px",
                      alignIteems:" center",
                      marginTop: "10px",
                 }}>
               <div className="total_value_additional"></div>
               <span className="total label">Total Order value</span>
                <Divider
                  style={{ visibility: "hidden" }}
                  orientation="vertical"
                />
                <span className="value">
                  <span className="value_symobol">
                    {" "}
                    {currency_id?.currency_code}{" "}
                  </span>
                  {formatToCurrency(
                    parseInt(pendingInvoiceList?.invoice?.grand_total)
                  )}{" "}
                </span>
            </p> */}
               <p
              className="total_value_block"
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
            </p>

            {/* <p
              className="total_value_block"
              style={{
                alignItems: "center",
                marginTop: "10px",
              }}
            >
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
            </p> */}
            {/* <p className="total_value">
              <div className="total_value_block">
                <span className="label">Total Order value</span>
                <span className="value">
                  <span className="value_symobol">
                    {" "}
                    {currency_id?.currency_code}{" "}
                  </span>
                  {formatToCurrency(
                    parseInt(pendingInvoiceList?.invoice?.grand_total)
                  )}{" "}
                </span>
              </div>
            </p> */}
          </div>
        </div>
      </div>
      <div className="pendinginvoice__bottom">
        <div className="bottom__terms">
          <h4>TERMS & CONDITIONS*</h4>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr,
          </p>
          <p>
            sed diam nonumy eirmod temp or invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
            sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
        <div className="remark_block">
          <span className="remark_title">Remarks</span>
          <p className="remark_content">{pendingInvoiceList?.remarks}</p>
        </div>
        <div className="bottom__buttons">
          <Button className="button__cancel" onClick={()=> window.history.back()}>Cancel</Button>
          {!placeorder && (
            <Button className="button__checkout">
              <Link
                to={`/${
                  customnostore ? customnostore : geo?.country_name
                }/checkout/${pendingInvoiceList?.invoice?.quote_id}`}
              >
                Proceed To Checkout
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
