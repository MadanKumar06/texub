import React from "react";
import "./styles.scss";
import checkoutmark from "../../../Assets/CheckoutPage/alert.png";
import { Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { TextField, InputLabel } from "@mui/material";

const Index = () => {
  let userDetails = JSON.parse(localStorage.getItem("userdata"));

  return (
    <div className="paymentfail_dashboard">
      <div className="dashboard__top">
        <div className="dashboard_center">
          <div className="report_image">
            <img src={checkoutmark} alt="" />
          </div>
          <div className="payment_msg common-block">
            <span className="msg">Payment Failed!</span>
          </div>
          <div className="logged_user common-block">
            <span className="msg">Dear {userDetails?.firstname} {userDetails?.lastname}</span>
          </div>
          <div className="custom_msg common-block">
            <span className="msg">
              Your order could not be placed. Please try again.
            </span>
          </div>
          <div className="paymentfail_btns">
            <Button className="continue_shipping_btn btn-secondary">
              Retry Payment
            </Button>
            <Button className=" go_to_order_btn">Go To Pending Invoice</Button>
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
