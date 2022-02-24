import React from "react";
import "./styles.scss";
import { Add } from "@mui/icons-material";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import Edit_image from "../../Assets/CheckoutPage/Group 913.png";
import Devilvery_address_image_1 from "../../Assets/CheckoutPage/Group 911.png";
import Devilvery_address_image_2 from "../../Assets/CheckoutPage/Group 912.png";
import Payment_image_1 from "../../Assets/CheckoutPage/braintree-logo-black.png";
import Payment_image_2 from "../../Assets/CheckoutPage/paypal (1).png";

const DeliveryAddressJson = [
  {
    name: "Ayush Raj",
    address:
      "302/1160, Trinity enclave B- Block, HSR Layout Bangalore-Karanataka 560102",
  },
];
const Checkout = () => {
  return (
    <div className="checkout_main_container">
      <div className="section_left">
        <ul>
          <li className="block_A">
            <img
              className="delivery_address_img"
              src={Devilvery_address_image_1}
              alt=""
            />
            <p className="delivery_address_title">Delivery Address</p>
            <div className="aside_block">
              <div className="aside_block_A">
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
            </div>
          </li>
          <li className="block_B">
            <img
              className="payment_image"
              src={Devilvery_address_image_2}
              alt=""
            />
            <p className="payment_title">Payment Details</p>
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
                  <FormControlLabel value="1" control={<Radio />} label={""} />
                  <p className="footer_title">OFFLINE PAYMENT</p>
                </div>
              </div>
              <div className="footer_main">
                <div className="footer_content">
                  <FormControlLabel value="2" control={<Radio />} label={""} />
                  <img className="footer_image" src={Payment_image_2} alt="" />
                </div>
              </div>
            </div>
            <div className="payment_footer_block_2">
              <div className="footer_main">
                <div className="footer_content">
                  <FormControlLabel value="3" control={<Radio />} label={""} />
                  <img className="footer_image" src={Payment_image_1} alt="" />
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="section_right">
        <div className="order_details_main">
          <div className="order_details">
            <p className="order_details_title">Order Details</p>
            <div className="orders">
              <div className="order_info">
                <p>Order Total</p>
                <p>Shipping Charge</p>
                <p>Discount Price</p>
              </div>
              <div className="order_info_details">
                <p>
                  <span>INR</span> 10,729,830
                </p>
                <p>
                  <span>INR</span> 0.00
                </p>
                <p>
                  <span>INR</span> 0.00
                </p>
              </div>
            </div>
            <div className="order_total">
              <p className="order_total_title">Total Amount</p>
              <p className="order_total_info">
                <p>
                  <span>INR</span> 10,729,830
                </p>
              </p>
            </div>
            <p className="order_note">( Incl. GST )</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
