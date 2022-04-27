import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { withStyles } from "@mui/styles";
import "./styles.scss";
import { Add } from "@mui/icons-material";
import { Button, IconButton, Typography, Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { ArrowBackIosNew } from "@mui/icons-material";
import {
  RadioGroup,
  Radio,
  Autocomplete,
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";


//assets
import Edit_image from "../../Assets/CheckoutPage/Group 913.png";
import Devilvery_address_image_1 from "../../Assets/CheckoutPage/Group 911.png";
import Devilvery_address_image_2 from "../../Assets/CheckoutPage/Group 912.png";
import Checkout_Texub_logo from "../../Assets/CheckoutPage/checkout_texub_logo.png";
import Checkout_checkout_com from "../../Assets/CheckoutPage/checkoutcom.png";
import Checkout_razorpay_logo from "../../Assets/CheckoutPage/razorpay_logo.png";
import Payment_image_1 from "../../Assets/CheckoutPage/braintree-logo-black.png";
import Payment_image_2 from "../../Assets/CheckoutPage/paypal (1).png";
import checkout_mail from "../../Assets/CheckoutPage/checkout_mail.png";
import checkout_call from "../../Assets/CheckoutPage/telephone.png";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };



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
  
    const [shipping_method, setShipping_method] = useState("texub_shipping");

    // const radioHandler = (status) => {
    //   setStatus(status);
    // };

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
              <img
                className="checkout_texub_logo"
                src={Checkout_Texub_logo}
                alt=""
              />
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
            <li
              className={`block_A ${
                shipping_method === "texub_shipping" ? "block_A" : "additional"
              }`}
            >
              <img
                className="delivery_address_img"
                src={Devilvery_address_image_1}
                alt=""
              />
              <p className="delivery_address_title">Select Delivery Methods</p>

              <div className="shipping_info">
                <div className="shipping_list_section">
                  <div className="shipping_list">
                    <FormControl className="shipping_list">
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={"texub_shipping"}
                        // aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel
                          // value={shipping_method}
                          value="pick_up_from_hub"
                          control={<Radio />}
                          label="Pick Up From The Hub"
                          onClick={() => setShipping_method("pick_up_from_hub")}
                        />
                        <FormControlLabel
                          value="texub_shipping"
                          // value={shipping_method}
                          control={
                            <Radio
                              onClick={() =>
                                setShipping_method("texub_shipping")
                              }
                            />
                          }
                          label="Texub Shipping"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <div className="shipping_charges_info">
                  <div className="shipping_charges_section">
                    <span className="shipping_text">Shipping Charges :</span>
                    <span className="shipping_price">
                      <span>INR</span> 10,729,830
                    </span>
                  </div>
                  <div className="shipping_charges_section">
                    <span className="shipping_text">Shipping Charges :</span>
                    <span className="shipping_awit">Awaiting for Prices</span>
                  </div>
                </div>
              </div>

              <div className="aside_block">
                {shipping_method === "texub_shipping" ? (
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
                            <Add className="add_icon" onClick={handleOpen} />
                            <span onClick={handleOpen}>Add New Address</span>
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
                ) : (
                  <div className="aside_block_A">
                    <div className="delivery_address_section pickup_hub">
                      <div className="pickup_address_section">
                        <div className="address_fields">
                          <InputLabel>Business Name</InputLabel>
                          <TextField
                            id="bussiness_name"
                            placeholder="Business Name (As Per The Trade License)"
                            className="inputfield-box"
                            name="bussiness_name"
                            variant="outlined"
                          />
                        </div>
                        <div className="address_fields">
                          <InputLabel>Contact Person Name</InputLabel>
                          <TextField
                            id="contact_person"
                            placeholder="Contact Person Name"
                            className="inputfield-box"
                            name="contact_person"
                            variant="outlined"
                          />
                        </div>
                      </div>

                      <div className="pickup_address_section">
                        <div className="address_fields">
                          <InputLabel>E-Mail Address</InputLabel>
                          <TextField
                            id="email_address"
                            placeholder="E-Mail Address"
                            className="inputfield-box"
                            name="email_address"
                            variant="outlined"
                          />
                        </div>
                        <div className="address_fields">
                          <InputLabel>Mobile Number</InputLabel>
                          <TextField
                            id="mobile_number"
                            placeholder="9890985433"
                            className="inputfield-box"
                            name="mobile_number"
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
            {shipping_method === "pick_up_from_hub" ? (
              <li className="block_B">
                <img
                  className="payment_image"
                  src={Devilvery_address_image_2}
                  alt=""
                />
                <p className="payment_title">Select Payment Method</p>

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
                          <p className="footer_title">Wire Transfer</p>
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
                            src={Checkout_checkout_com}
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
                            src={Checkout_razorpay_logo}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </li>
            ) : (
              <p></p>
            )}
          </ul>
        </div>
      </div>
      <div className="checkout_payment_section">
        {shipping_method === "pick_up_from_hub" ? (
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
              <div className="remark_section">
                <span className="remart_title">Remarks :</span>
                <span className="remart_text">
                  Fwd & Pick Up / R&A International Logistics / 61/234, Hrbr
                  Layout Bangalore - 560043. Docs Needed. Provide Actual Dims /
                  Provide Copy Of The Invoice And Serials, Fwd Pick Up/ R&A
                  Internal
                </span>
              </div>
              <div className="checkout_btns">
                <Button className="placeorder_btn">Place Your Order</Button>
                <Button className="placeorder_cancel_btn">
                  Go To Pending Invoice
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="order_details_main">
            <div className="texub_shipping_btns">
              <Button className="texub_cancel_btn">Cancel</Button>
              <Button className="texub_quote_btn btn-secondary">
                Request Quote
              </Button>
            </div>
          </div>
        )}
      </div>

      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="add_address_popup"
        >
          <div className="address_popup_main">
            <div className="address_popup_block">
              <Clear
                className="clear_btn address_popup_clear_btn"
                onClick={() => handleClose()}
              />
              <Box>
                <Typography
                  className="address_title"
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add New Address
                </Typography>
                <div className="address_selection_block">
                  <div className="address_list">
                    <FormControl className="shipping_list_address">
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                      >
                        <FormControlLabel
                          value="texub_billing"
                          control={<Radio />}
                          label="Billing Address"
                        />
                        <FormControlLabel
                          value="texub_shipping"
                          control={<Radio />}
                          label="Shipping Address"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel>Organization Name</InputLabel>
                    <TextField
                      id="organization_name"
                      name="organization_name"
                      placeholder="Texub product id"
                      fullWidth
                      // disabled
                      className="inputfield-box"
                      variant="outlined"
                    />
                  </div>
                  <div className="address_fields">
                    <InputLabel>Address Line 1</InputLabel>
                    <TextField
                      id="address_line1"
                      placeholder="Flat/Building/Block"
                      className="inputfield-box"
                      name="address_line1"
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel>Address Line 2</InputLabel>
                    <TextField
                      id="address_line2"
                      placeholder="Sub-urb/Town"
                      className="inputfield-box"
                      name="address_line2"
                      variant="outlined"
                    />
                  </div>
                  <div className="address_fields">
                    <InputLabel>Pincode</InputLabel>
                    <TextField
                      id="pincode"
                      placeholder="Pincode"
                      className="inputfield-box"
                      name="pincode"
                      variant="outlined"
                    />
                  </div>
                </div>

                <div className="address_field_block">
                  <div className="address_fields">
                    <InputLabel>City</InputLabel>
                    <TextField
                      id="city"
                      placeholder="City"
                      className="inputfield-box"
                      name="city"
                      variant="outlined"
                    />
                  </div>
                  <div className="address_fields">
                    <InputLabel id="address_field">State</InputLabel>
                    <FormControl className="address_select_field_box">
                      <Select
                        labelId="demo-simple-select-label"
                        id="selection_box_block"
                        label="State"
                      >
                        <MenuItem value={10}>Tamil Nadu</MenuItem>
                        <MenuItem value={20}>Tamil Nadu 2</MenuItem>
                        <MenuItem value={30}>Tamil Nadu 3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="address_field_block">
                  <div className="address_fields final_block">
                    <InputLabel id="address_field">Country</InputLabel>
                    <FormControl className="address_select_field_box">
                      <Select
                        labelId="demo-simple-select-label"
                        id="selection_box_block"
                        label="Country"
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="address_popup_btns">
                  <Button className="address_cancel_btn">Cancel</Button>
                  <Button className="address_save_btn">Save Changes</Button>
                </div>
              </Box>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Checkout;
