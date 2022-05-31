import React, { useEffect, useState } from "react";
import { Modal, Backdrop, Divider } from "@mui/material";
import { Clear, ArrowBackIosNew } from "@mui/icons-material";
import Ratingpopup from "./Rating";
import TrackOrderpopup from "./TrackOrder";
import TransactionPopup from "./TransactionInfo";
import "./styles.scss";
import { useStateValue } from "../../../../store/state";
import MUITable from "../../../Common/MUITable";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import image from "../../../../Assets/buyerdashboard/auctions/hp.png";
import download from "../../../../Assets/buyerdashboard/orders/download.png";
import track from "../../../../Assets/buyerdashboard/orders/trackorder.png";
import rating from "../../../../Assets/buyerdashboard/orders/rating.png";
import {
  totalamount,
  transaction_info,
} from "../../../Common/Vieworders/viewordersjson";
import NodataFound from "../../../../Assets/CommonImage/NodataFound.webp.png";

import axios from "axios";
import Constant from "../../../../Constant";
import moment from "moment";
import swal from "sweetalert2";
const Index = ({ currentorder, orders, setisVieworders, setisOrders }) => {
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }
  const [{ customnostore, geo }, dispatch] = useStateValue();
  // const currentorder = window.localStorage.getItem("orderinfoCurrentorder");
  const [open, setOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState([]);
  const handleOpen = (serialNumbers) => {
    setOpen(true);
    setSerialNumber(serialNumbers);
  };
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setOpen(false);
      dispatch({
        type: "SET_PDP_POPUP_OPEN_CLOSE",
        value: false,
      });
    }
  };
  const [detailsorder, setdetailsorder] = useState([]);
  const [entity_id, setentity_id] = useState();
  const [update_transaction_details, setupdate_transaction_details] =
    useState(false);
  const [isUopup, setisUopup] = useState(false);
  const Popup = (event) => {
    setisUopup(event);
  };
  useEffect(() => {
    setentity_id(detailsorder?.[0]?.order_details?.[0]?.entity_id);
  }, [detailsorder]);

  const [TrackOrder, setisTrackOrder] = useState(false);
  const PopupTrack = (event) => {
    setisTrackOrder(event);
  };

  const [Transaction, setisTransaction] = useState(false);
  const PopupTransaction = (event) => {
    setisTransaction(event);
  };

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
          orderId: currentorder,
          customerId: user?.id,
        },
      });
      if (orderdetails?.data?.[0]?.status === false) {
        swal.fire({
          text: `${orderdetails.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
        setisVieworders(false);
        setisOrders(true);
      } else {
        setdetailsorder(orderdetails?.data ? orderdetails?.data : []);
      }
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
  }, [currentorder, update_transaction_details]);

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
          let serialNumbers = tablemeta?.rowData[11];
          return (
            <div className="productname">
              <img src={image} alt="" className="image"></img>
              <div className="product">
                <span className="modal_name">{name}</span>
                <span className="modal_content">{discription}</span>
                {serialNumbers?.length ? (
                  <div className="serial_number">
                    <span onClick={() => handleOpen(serialNumbers)}>
                      Show Serial Numbers <KeyboardArrowDownOutlinedIcon />
                    </span>
                  </div>
                ) : (
                  ""
                )}
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
  return (
    <>
      <div className="vieworders_main">
        <div className="vieworders_heading_section">
          <div className="order_info_section1">
            <div className="username">
              <span className="id_heading">Order Date #</span>
              <span className="id">
                {moment(
                  detailsorder?.[0]?.order_details?.[0]?.created_at
                ).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="username">
              <span className="id_heading">Order ID #</span>
              <span className="id">{currentorder}</span>
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
              <span className="id_heading">Transaction ID #</span>
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
            <div className="order_track_info">
              <a
                href={`/${
                  customnostore ? customnostore : geo?.country_name
                }/buyerdashboard/myorder-invoice/${currentorder}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="order_invoice_download common-btn invoice-btn">
                  <img src={download} alt="" className="download"></img>
                  <span className="download_text">Download Invoice</span>
                </div>
              </a>
              {/* <div
                className="order_track btn-secondary common-btn"
                onClick={() => setisTrackOrder(true)}
              >
                <img src={track} alt="" className="track"></img>
                <span className="track_text">Track Order</span>
              </div> */}
              <div
                className="order_rating_info btn-primary common-btn"
                onClick={() => setisUopup(true)}
              >
                <img src={rating} alt="" className="rating"></img>
                <span className="rate_text">Rate Us</span>
              </div>
            </div>
            <div className="order_user_info">
              <div className="username">
                <span className="id_heading">Username #</span>
                <span className="id">
                  {detailsorder?.[0]?.order_details?.[0]?.customer_name}
                </span>
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
                              ?.shipping_address?.[0]?.company
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
                              ?.billing_address?.[0]?.company
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
                            <span className="value symbol_value">
                              {
                                detailsorder?.[0]?.order_details?.[0]
                                  ?.transaction_currency
                              }
                            </span>{" "}
                            <span className="price_value">
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
                        <span
                          className="update_transaction_block"
                          style={{ cursor: "pointer" }}
                          onClick={() => setisTransaction(true)}
                        >
                          {detailsorder?.[0]?.order_details?.[0]
                            ?.payment_method === "banktransfer" &&
                            "Update Transaction Details"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="vieworders_total">
                  <li className="vieworders_list">
                    <span className="total_heading"> Sub-Total</span>
                    <span className="total_amount1">
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
                    <span className="total_amount1">
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
                    <span className="total_heading"> Tax</span>
                    <span className="total_amount1">
                      <span className="currency">
                        {" "}
                        {detailsorder?.[0]?.order_details?.[0]?.order_currency}
                      </span>{" "}
                      {formatToCurrency(
                        parseInt(detailsorder?.[0]?.order_details[0]?.tax_price)
                      )}
                    </span>
                  </li>
                  <li className="vieworders_list">
                    <span className="total_heading"> Discount Price</span>
                    <span className="total_amount1">
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
                        <span className="total_amount1">
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
              <div className="download_document">
                <div className="vieworders_emtpy">
                  <span></span>
                </div>
                {detailsorder?.[0]?.order_details?.[0]?.delivery_doc && (
                  <div className="remart_block">
                    <div className="handover_document_section">
                      <img src={download} alt="" className="download"></img>
                      <span className="document_text">
                        <a
                          style={{ color: "inherit" }}
                          href={
                            detailsorder?.[0]?.order_details?.[0]?.delivery_doc
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download Handover Documents
                        </a>
                      </span>
                    </div>
                    <div className="remkark_section">
                      <span className="remark_title">Remarks :</span>
                      <span className="remark_content">
                        {detailsorder?.[0]?.order_details?.[0]?.Remarks}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="invoices__footer">
          <div className="invoices__container" onClick={() => orders()}>
            <ArrowBackIosNew />
            <span>Back</span>
          </div>
        </div> */}
        {serialNumber?.length ? (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              closeAfterTransition
              BackdropComponent={Backdrop}
              disableRestoreFocus={true}
              BackdropProps={{
                timeout: 500,
              }}
              className="serial_number_popup"
            >
              <div className="serial_popup_main" style={{ outline: "none" }}>
                <Clear
                  className="clear_btn serial_popup_clear_btn"
                  onClick={() => handleClose()}
                />
                <div className="serial_popup_block">
                  <div className="serial_number_block">
                    {serialNumber?.length &&
                      serialNumber?.map((item) => (
                        <div className="serial_number_block">
                          <span className="heading">{item}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          ""
        )}
      </div>
      {isUopup && (
        <Ratingpopup
          Popup={Popup}
          currentorder={currentorder}
          data={detailsorder?.[0]?.order_details?.[0]}
        />
      )}
      {TrackOrder && <TrackOrderpopup PopupTrack={PopupTrack} />}
      {Transaction && (
        <TransactionPopup
          PopupTransaction={PopupTransaction}
          product_id={entity_id}
          setupdate_transaction_details={setupdate_transaction_details}
        />
      )}
    </>
  );
};
export default Index;
