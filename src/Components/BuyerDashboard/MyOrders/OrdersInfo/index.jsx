import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Button, IconButton, Typography, Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Ratingpopup from "./Rating";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import MUITable from "../../../Common/MUITable";
import image from "../../../../Assets/buyerdashboard/auctions/hp.png";
import download from "../../../../Assets/buyerdashboard/orders/download.png"
import track from "../../../../Assets/buyerdashboard/orders/trackorder.png"
import rating from "../../../../Assets/buyerdashboard/orders/rating.png"


import {
  shippingaddress,
  billingaddress,
  total,
  totalamount,
  transaction_info,
} from "../../../Common/Vieworders/viewordersjson";

const Index = ({ setisVieworders, setisOrders }) => {

     const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

        const [isUopup, setisUopup] = useState(false);
      const Popup = (event) => {
        
        setisUopup(event);
      };


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
    productname: {
      modal: "Pavilion Model14-Dv0054Tu 12333",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
    },
    sku: "SK-3102",
    quantity: "50",
    seller_code: "INDS20118",
    hub: "Mumbai",
    eta: "2",
    warranty: "5",
    unitprice: "66,999/",
    subtotal: "33,44,950/",
  },
];
const columns = [
  {
    name: "productname",
    label: "Product Name",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="productname">
            <img src={image} alt="" className="image"></img>
            <div className="product">
              <span className="modal_name">{value?.modal}</span>
              <span className="modal_content">{value?.content}</span>
              <div className="serial_number">
                <span onClick={() =>
                                handleOpen()
                              } >Show Serial Numbers</span>
            </div>
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
        return <div className="vieworders_quantity">{value}</div>;
      },
    },
  },
  {
    name: "seller_code",
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
            return <div className="vieworders_eta">{value}</div>;
            },
        },
    },
    {
        name: "warranty",
        label: "Warranty",
        options: {
            customBodyRender: (value) => {
            return <div className="vieworders_warranty">{value}</div>;
            },
        },
    },
  {
    name: "unitprice",
    label: "UNIT PRICE",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="vieworders_price">
            <span className="inr">INR</span>
            <span className="price"> {value} </span>
          </div>
        );
      },
    },
  },
  {
    name: "subtotal",
    label: "SUB-TOTAL",
    options: {
      customBodyRender: (value) => {
        return (
          <div className="vieworders_total">
            <span className="inr">INR</span>
            <span className="price"> {value} </span>
          </div>
        );
      },
    },
  },
];

// serial number popup id here
 const serialNumbers = [
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
    { number: "Hp0000006" },
  ];

  return (
    <>
    <div className="vieworders_main">
      <div className="vieworders_heading_section">
          <div className="order_info_section1">
                <div className="username">
                    <span className="id_heading">Order Date #</span>
                    <span className="id">03/05/21</span>
                </div>
                <div className="username">
                    <span className="id_heading">Order ID #</span>
                    <span className="id">000000021</span>
                    <span className="status">Confirm</span>
                </div>
                <div className="username">
                    <span className="id_heading">Transaction ID #</span>
                    <span className="id">000000021</span>
                    <span className="status">Completed</span>
                </div>
            </div>
            <div className="order_info_section2">
                <div className="order_track_info">
                    <div className="order_invoice_download common-btn invoice-btn">
                        <img src={download} alt="" className="download"></img>
                        <span className="download_text">Download Invoice</span>
                    </div>
                    <div className="order_track btn-secondary common-btn" >
                        <img src={track} alt="" className="track"></img>
                        <span className="track_text">Track Orer</span>
                    </div>
                    <div className="order_rating_info btn-primary common-btn" onClick={() => setisUopup(true)}>
                        <img src={rating} alt="" className="rating"></img>
                        <span className="rate_text">Rate Us</span>
                       
                    </div>
                </div>
                <div className="order_user_info">
                    <div className="username">
                        <span className="id_heading">Order ID #</span>
                        <span className="id">000000021</span>
                    </div>
                     <div className="username">
                        <span className="id_heading">Order ID #</span>
                        <span className="id">000000021</span>
                    </div>
                </div>
            </div>
      </div>
      <MUITable
        columns={columns}
        table={table}
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
                        <p className="payment_type">Flat Rate-Fixed</p>
                    </div>
                   
                </div>

                <div className="vieworders_shippingaddress_section">
                  <div className="vieworders_shippingaddress">
                    {shippingaddress.map((item) => (
                      <li key={item.id} className="vieworders_list">
                        <span className="heading">{item.heading}</span>
                        <span className="name"> {item.name}</span>
                        <span className="address">{item.address}</span>
                      </li>
                    ))}
                  </div>
                   <div className="vieworders_shippingaddress">
                    {billingaddress.map((item) => (
                      <li key={item.id} className="vieworders_list">
                        <span className="heading">{item.heading}</span>
                        <span className="name"> {item.name}</span>
                        <span className="address">{item.address}</span>
                      </li>
                    ))}
                  </div>
                 
                </div>
                <div className="vieworders_shippingaddress_section pay_transaction_block">
                  <div className="vieworders_payment_section payment_block">
                    <p className="payment_heading">Payment Method</p>
                    <p className="payment_type">Check (Off-Line)</p>
                  </div>
                  <div className="vieworders_payment_section transaction_block">
                    {transaction_info.map((item) => (
                      <div className="vieworders_list">
                        <span className="block_title">Transaction Refernece Number : <span className="value">{item.referencenumber}</span></span>
                        <span className="block_title">Transaction Amount : <span className="value">{item.symbol}</span> <span>{item.price}</span></span>
                        <span className="block_title date_time">Date & Time : 
                            <span className="value"> {item.date}</span>      
                            <Divider orientation="vertical" />
                            <span className="value_price"> {item.time}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="vieworders_total">
                {total.map((item) => (
                  <li key={item.id} className="vieworders_list">
                    <span className="total_heading"> {item.subtotal}</span>
                    <span className="total_amount">
                      <span className="currency">INR</span> {item.amount}
                    </span>
                  </li>
                ))}
                <hr className="hr"></hr>
                {totalamount.map((item) => (
                  <li key={item.id} className="vieworders_list">
                    <div className="taxes">
                      <span className="total_amount_heading">
                        {" "}
                        {item.subtotal}{" "}
                      </span>
                      <span className="gst">(incl.GST)</span>
                    </div>
                    <span className="total_amount">
                      <span className="currency">INR</span> {item.amount}
                    </span>
                  </li>
                ))}

              </div>
            </div>
            <div className="download_document">
                <img src={download} alt="" className="download"></img>
                <span className="document_text">Download Handover Documents</span>
            </div>
          </div>
        </div>
      </div>
      <div className="invoices__footer">
        <div
          className="invoices__container"
          onClick={() => {
            setisVieworders(false);
            setisOrders(true);
          }}
        >
          <ArrowBackIosNew />
          <span>Back</span>
        </div>
      </div>
      <div>
    <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="serial_number_popup"
          >
            <div className="serial_popup_main">
                 <Clear
                        className="clear_btn serial_popup_clear_btn"
                        onClick={() => handleClose()}
                    />
                <div className="serial_popup_block">
                   <div className="serial_number_block">
                    {serialNumbers.map((item) => (
                        <div className="serial_number_block">
                            <span className="heading">{item.number}</span>
                        </div>
                    ))}
                </div>
                </div>
                
              </div>
        </Modal>
        </div>
    </div>
   {isUopup && <Ratingpopup Popup={setisUopup} />}
</>
  );
   
};
export default Index;
