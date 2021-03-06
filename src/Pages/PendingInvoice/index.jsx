import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Components/Common/MUITable";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Checkout_Texub_logo from "../../Assets/CheckoutPage/checkout_texub_logo.png";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";
import { SessionExpiredLogout } from "../../utilities";
import Divider from "@mui/material/Divider";
import { useParams, useNavigate } from "react-router-dom";
var moment = require("moment");

function Index() {
  const [{ geo, customnostore, currency }, dispatch] = useStateValue();
  const { qid } = useParams();
  const [pendingInvoiceList, setPendingInvoiceList] = useState([]);
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
    pagination: false,
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
                    title={brand_name}
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

  const navigate = useNavigate();
  const handleProceedtoCheckout = () => {
    navigate(
      `/${customnostore ? customnostore : geo?.country_name}/checkout/${
        pendingInvoiceList?.invoice?.quote_id
      }`
    );
  };
  let permissions = JSON.parse(localStorage.getItem("permissions"));
  let placeorder =
    permissions?.length === 0
      ? false
      : permissions?.some(
          (per) =>
            per?.value === "can-place-order" && per?.permission_value === 0
        );
  const [pendinginvoicestatus, setpendinginvoicestatus] = useState(false);
  useEffect(() => {
    if (!pendingInvoiceList) return;
    if (pendingInvoiceList?.invoice?.invoice_status > "3") {
      setpendinginvoicestatus(true);
    } else {
      setpendinginvoicestatus(false);
    }
  }, [pendingInvoiceList]);
  return (
    <div className="pendinginvoice" id="pendinginvoice">
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
                <span className="orderinfo_value">
                  {pendingInvoiceList?.invoice?.status}
                </span>
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
              <a
                href={`/${
                  customnostore ? customnostore : geo?.country_name
                }/pendinginvoice-download/${qid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                    <g
                      id="Icon-2"
                      data-name="Icon"
                      transform="translate(4.5 4.5)"
                    >
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
              </a>
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
              <span>{pendingInvoiceList?.bill_to_city}</span>
              <span>
                {pendingInvoiceList?.bill_to_state} {"-"}{" "}
                {pendingInvoiceList?.bill_to_pincode}
              </span>
              <span>{pendingInvoiceList?.bill_to_country}</span>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className="address__pickup">
            <h4>PICK UP ADDRESS</h4>
            <p className="name">{pendingInvoiceList?.pick_up_name}</p>
            <div className="content">
              <span>{pendingInvoiceList?.pick_up_address1},</span>
              <span>{pendingInvoiceList?.pick_up_address2}</span>

              <span>{pendingInvoiceList?.pick_up_city}</span>
              <span>
                {pendingInvoiceList?.pick_up_state} {"-"}{" "}
                {pendingInvoiceList?.pick_up_pincode}
              </span>
              <span>{pendingInvoiceList?.pick_up_country}</span>
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
        <div className="bottom__buttons">
          <Button
            className="button__cancel"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          {!placeorder && !pendinginvoicestatus && (
            <Button
              className="button__checkout"
              onClick={() => handleProceedtoCheckout()}
            >
              Proceed To Checkout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
