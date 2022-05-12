import React from "react";
import "./styles.scss";
import checkoutmark from "../../../Assets/CheckoutPage/check-mark.png";
import { Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { TextField, InputLabel } from "@mui/material";

const Index = () => {
  let userDetails = JSON.parse(localStorage.getItem("userdata"));

  return (
    <div className="paymentsuccess_dashboard">
      <div className="dashboard__top">
        <div className="dashboard_center">
          <div className="report_image">
            <img src={checkoutmark} alt="" />
          </div>
          <div className="payment_msg common-block">
            <span className="msg">Payment Successful!</span>
          </div>
          <div className="logged_user common-block">
            <span className="msg">Dear {userDetails?.firstname} {userDetails?.lastname}</span>
          </div>
          <div className="custom_msg common-block">
            <span className="msg">
              You have successfully placed the order. You can view the details
              from order details page
            </span>
          </div>
          <div className="paymentsuccess_btns">
            <Button className="continue_shipping_btn btn-primary">
              Continue Shopping
            </Button>
            <Button className="go_to_order_btn">Go To My Orders</Button>
          </div>
          <div className="backto_home_btn common-block">
            <Button className="home_to_home">Back To Homepage</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
