import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { withStyles } from "@mui/styles";
import "./styles.scss";
import { Add } from "@mui/icons-material";
import { Button, IconButton, Typography, Box } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

//assets
import Edit_image from "../../Assets/CheckoutPage/Group 913.png";
import Devilvery_address_image_1 from "../../Assets/CheckoutPage/Group 911.png";
import Devilvery_address_image_2 from "../../Assets/CheckoutPage/Group 912.png";
import Payment_image_1 from "../../Assets/CheckoutPage/braintree-logo-black.png";
import Payment_image_2 from "../../Assets/CheckoutPage/paypal (1).png";
import checkout_mail from "../../Assets/CheckoutPage/checkout_mail.png";
import checkout_call from "../../Assets/CheckoutPage/telephone.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeliveryAddressJson = [
  {
    name: "Ayush Raj",
    address:
      "302/1160, Trinity enclave B- Block, HSR Layout Bangalore-Karanataka 560102",
  },
];
const DeliveryEmailJson = [
  {
    img: { checkout_mail },
    name: "Email Address",
    address: "info@texub.com",
  },
];
const DeliveryCallJson = [
  {
    img: { checkout_call },
    name: "Call Us",
    address: "+9714 2227300 / +9714 2227279",
  },
];
const Checkout = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div className="checkout_main_container">
      <div className="checkout_info_list">
        <div className="checkout_back_toggle">
          <Link to="/">
            <ArrowBackIosNew />
          </Link>
        </div>
        <div className="order_id_info">
          <div className="orderid_section">
            <span className="orderinfo_name">Order ID</span>
            <span className="orderinfo_value">28739822</span>
          </div>
        </div>
        <div className="order_total_info">
          <div className="ordertal_section">
            <span className="orderinfo_name">Total Amount</span>

            <span className="orderinfo_value">
              <span className="ordertotal_symbol">INR</span> 10,729,830
            </span>
          </div>
        </div>
        <div className="order_status_info">
          <div className="orderstatus_section">
            <span className="orderinfo_name">Order Status</span>
            <span className="orderinfo_value">Pending</span>
          </div>
        </div>
        <div className="order_apply-btn">
          <Button className="button-text btn-primary clear checkout-apply-btn">
            Continue Shopping
          </Button>
        </div>
        <div className="checkoutlist__download">
          <svg
            id="Icon"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 40 40"
          >
            <rect id="Area" width="40" height="40" fill="#fff" opacity="0" />
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

      <div className="checkout_order_info">
        <div className="checkout_order-infosection">
          <div className="checkout_logo_img">
            <div className="checklogo_svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="284.039"
                height="87.111"
                viewBox="0 0 310.039 87.111"
              >
                <g
                  id="Group_1457"
                  data-name="Group 1457"
                  transform="translate(3358.13 20621.301)"
                  opacity="0.251"
                >
                  <path
                    id="_Compound_Path_"
                    data-name="&lt;Compound Path&gt;"
                    d="M1399.7,368.25h45.667a10.809,10.809,0,0,1,5.357,1.394,14.445,14.445,0,0,1,4.369,3.745,18.651,18.651,0,0,1,2.954,5.545,21.708,21.708,0,0,1-.427,14.834,16.765,16.765,0,0,1-4.088,6.044,16.632,16.632,0,0,1,4.088,6.034,21.708,21.708,0,0,1,.427,14.834,18.65,18.65,0,0,1-2.954,5.545,14.445,14.445,0,0,1-4.369,3.745,10.809,10.809,0,0,1-5.357,1.394H1399.7Zm41.257,24.977a3.49,3.49,0,0,0,2.913-1.716,7.142,7.142,0,0,0,1.217-4.234,6.618,6.618,0,0,0-1.217-4.015,3.5,3.5,0,0,0-2.913-1.664h-27.192v11.63Zm4.13,19.2a6.991,6.991,0,0,0-1.217-4.151,3.5,3.5,0,0,0-2.913-1.706h-27.192v11.443h27.192a3.533,3.533,0,0,0,2.913-1.623A6.418,6.418,0,0,0,1445.086,412.43Z"
                    transform="translate(-4507.242 -20977.463)"
                    fill="#002d56"
                  />
                  <path
                    id="_Path_"
                    data-name="&lt;Path&gt;"
                    d="M1267.606,418.049l-9.393,13.44h-35.7a9.063,9.063,0,0,1-9.061-9.071V377a9.061,9.061,0,0,1,9.061-9.061h35.255l9.841,13.43h-40v11.713h31.478v13.44h-31.478v11.526Z"
                    transform="translate(-4514.74 -20977.477)"
                    fill="#002d56"
                  />
                  <path
                    id="_Path_2"
                    data-name="&lt;Path&gt;"
                    d="M1302.213,387.983l-39.072,55.758h-4.931l30.521-43.774L1266,368.52h22.73l13.544,19.37Zm0,0-39.072,55.758h-4.931l30.521-43.774L1266,368.52h22.73l13.544,19.37Zm42.8-31.135L1314.644,400.4l22.73,31.447h-22.73l-.031-.042L1301.1,412.482l.062-.094,39.083-55.758h4.92Zm-9.831-.218-62.145,87.111h-4.546l62.135-87.111Zm-22.459,13.69h2.268l-10.455,14.657-1.134-1.592Zm-21.856,60.5h-2.278l10.486-14.688,1.1,1.623Z"
                    transform="translate(-4512.938 -20977.932)"
                    fill="#ddb363"
                  />
                  <path
                    id="_Path_3"
                    data-name="&lt;Path&gt;"
                    d="M1348.155,362.65v48.726a7.681,7.681,0,0,0,1.6,4.92,4.787,4.787,0,0,0,3.88,2.039h25.455v-49.86h14.085V431.7h-42.671a13.136,13.136,0,0,1-6.408-1.633,17.039,17.039,0,0,1-5.232-4.463,22.123,22.123,0,0,1-3.516-6.647,25.231,25.231,0,0,1-1.28-8.124V382.789Z"
                    transform="translate(-4509.884 -20977.689)"
                    fill="#002d56"
                  />
                  <path
                    id="_Path_4"
                    data-name="&lt;Path&gt;"
                    d="M1209.46,367.94v13.388h-17.549v50.016h-14.106V381.328H1158.81V367.94Z"
                    transform="translate(-4516.94 -20977.477)"
                    fill="#002d56"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="checkout_order_basic_info">
            <div className="order_basic_info">
              <span className="order_basic_title">Order ID</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">123123</span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Date</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">123123</span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Order ID</span>
              <Divider orientation="vertical" />
              <span className="order_basic_value">123123</span>
            </div>
            <div className="order_basic_info">
              <span className="order_basic_title">Order ID</span>{" "}
              <Divider orientation="vertical" />
              <span className="order_basic_value">123123</span>
            </div>
          </div>
        </div>
      </div>
      <div className="section_left">
        <div className="section_left_info">
          <ul>
            <li className="block_A">
              <img
                className="delivery_address_img"
                src={Devilvery_address_image_1}
                alt=""
              />
              <p className="delivery_address_title">Select Delivery Methods</p>

              <div className="shipping_info">
                <div className="shipping_list_section">
                  <div className="shipping_list">
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={""}
                      // control={<Radio className="radio_button1" />}
                    />
                    <p className="shipping_title">Pick Up From The Hub</p>
                  </div>
                  <div className="shipping_list">
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label={""}
                      // control={<Radio className="radio_button" />}
                    />
                    <p className="shipping_title">Pick Up From The Hub</p>
                  </div>
                </div>
                <div className="shipping_charges_info">
                  <div className="shipping_charges_section">
                    <span className="shipping_text">Shipping Charges :</span>
                    <span className="shipping_price">
                      <span>INR</span> 10,729,830
                    </span>
                  </div>
                </div>
              </div>
              <div className="aside_block">
                <div className="aside_block_A">
                  <div className="delivery_address_section">
                    <div className="delivery_address_list">
                      {DeliveryAddressJson?.map((itm) => (
                        <div className="delivery_address_content">
                          <div className="billing_title">
                            <p>Default Billing Address</p>
                            <div className="edit_address">
                              <img src={Edit_image} alt="" />
                              <span>Edit</span>
                            </div>
                          </div>

                          <p className="user_name">{itm?.name}</p>
                          <p className="item_address">{itm?.address}</p>
                        </div>
                      ))}
                      <div className="aside_block_B">
                        <div className="delivery_address_add">
                          <Add className="add_icon" />
                          <span>Add New Address</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="delivery_customer_info">
                    <div className="delivery_email_info">
                      {DeliveryEmailJson?.map((itm) => (
                        <div className="delivery_email_content">
                          <div className="email_address">
                            <img src={checkout_mail} alt="" />
                            <span className="user_name">{itm?.name}</span>
                          </div>
                          <p className="item_address">{itm?.address}</p>
                        </div>
                      ))}
                    </div>
                    <div className="deliverycall_info">
                      {DeliveryCallJson?.map((itm) => (
                        <div className="delivery_call_content">
                          <div className="call_address">
                            <img src={checkout_call} alt="" />
                            <span className="user_name">{itm?.name}</span>
                          </div>
                          <p className="item_address">{itm?.address}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className="block_B">
              <img
                className="payment_image"
                src={Devilvery_address_image_2}
                alt=""
              />
              <p className="payment_title">Select Payment Method</p>
            </li>
          </ul>
          <div className="payment_info">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"1"}
              name="radio-buttons-group"
            >
              <div className="payment_footer_block_1">
                <div className="footer_main">
                  <div className="footer_content">
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={""}
                    />
                    <p className="footer_title">OFFLINE PAYMENT</p>
                  </div>
                </div>
                <div className="footer_main">
                  <div className="footer_content">
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label={""}
                    />
                    <img
                      className="footer_image"
                      src={Payment_image_2}
                      alt=""
                    />
                  </div>
                </div>
                <div className="footer_main">
                  <div className="footer_content">
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label={""}
                    />
                    <img
                      className="footer_image"
                      src={Payment_image_2}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="checkout_payment_section">
        <div className="order_details_main">
          <div className="checkout_order_basic_info">
            <div className="checkoutorder_basic_info">
              <span className="checkoutorder_info_title">Sub-Total</span>
              <Divider orientation="vertical" />
              <span className="orderinfo_value">
                <span className="ordertotal_symbol">INR</span> 10,729,830
              </span>
            </div>
            <div className="checkoutorder_basic_info">
              <span className="checkoutorder_info_title">Tax</span>
              <Divider orientation="vertical" />
              <span className="orderinfo_value">
                <span className="ordertotal_symbol">INR</span> 10,729,830
              </span>
            </div>
            <div className="checkoutorder_basic_info">
              <span className="checkoutorder_info_title">Freight</span>
              <Divider orientation="vertical" />
              <span className="orderinfo_value">
                <span className="ordertotal_symbol">INR</span> 10,729,830
              </span>
            </div>
            <div className="checkoutorder_basic_info">
              <span className="checkoutorder_info_title">
                Payment Processing Charge
              </span>
              <Divider orientation="vertical" />
              <span className="orderinfo_value">
                <span className="ordertotal_symbol">INR</span> 10,729,830
              </span>
            </div>
            <div className="checkout_total_order_section">
              <span className="checkout_total_order__info_title">
                Payment Processing Charge
              </span>
              <span className="checkout_total_order__price">
                <span className="checkout_total_orde_symbol">INR</span>
                10,729,830
              </span>
            </div>
          </div>
          <div className="checkout_placeorder_section">
            <div className="checkout_btns">
              <Button className="placeorder_btn">Place Your Order</Button>
              <Button className="placeorder_cancel_btn">Cancel</Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Checkout;
