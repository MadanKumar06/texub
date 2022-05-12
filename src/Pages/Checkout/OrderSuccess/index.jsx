import React from "react";
import "./styles.scss";
import checkoutmark from "../../../Assets/CheckoutPage/check-mark.png";
import { Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import {
  FormControlLabel,
  TextField,
  InputLabel,
} from "@mui/material";

const Index = () => {
  let userDetails = JSON.parse(localStorage.getItem("userdata"));

  return (
    <div className="ordersuccess_dashboard">
      <div className="dashboard__top">
        <div className="dashboard_center">
          <div className="report_image">
            <img src={checkoutmark} alt="" />
          </div>
          <div className="order_msg common-block">
            <span className="msg">Order Successful!!</span>
          </div>
          <div className="logged_user common-block">
            <span className="msg">Dear {userDetails?.firstname} {userDetails?.lastname}</span>
          </div>
          <div className="custom_msg common-block">
            <span className="msg">
              You have successfully placed the order. Kindly fill the
              transaction details below to confirm the order.
            </span>
          </div>
          <div className="backto_home_btn common-block">
            <Button className="home_to_home">Back To Homepage</Button>
          </div>

          <div className="dashboard_bottom">
            <div className="transaction_section">
              <div className="transaction_title_section">
                <span className="transaction_title">
                  Enter The Transaction Details
                </span>
              </div>

              <div className="transaction_block">
                <div className="transaction_info_section">
                  <InputLabel>Reference Number</InputLabel>
                  <TextField
                    id="reference_number"
                    placeholder="324518709"
                    className="inputfield-box"
                    name="reference_number"
                    variant="outlined"
                  />
                </div>
                <div className="transaction_info_section">
                  <InputLabel>Payment Amount</InputLabel>
                  <TextField
                    id="payment_amount"
                    placeholder="INR 94,05,811"
                    className="inputfield-box"
                    name="payment_amount"
                    variant="outlined"
                  />
                </div>
              </div>

              <div className="transaction_block">
                <div className="transaction_info_section">
                  <InputLabel>Transaction Date & Time</InputLabel>
                  <TextField
                    id="transaction_date_time"
                    placeholder="00:00:00"
                    className="inputfield-box"
                    name="TextField"
                    variant="outlined"
                  />
                </div>
                <div className="transaction_info_section">
                  <InputLabel>Remarks</InputLabel>
                  <TextareaAutosize
                    aria-label="Remarks"
                    minRows={3}
                    placeholder="Remarks"
                    style={{ height: 100 }}
                  />
                </div>
              </div>
            </div>

            <div className="ordersuccess_btns">
              <Button className="payment_later_btn btn-primary">
                Confirm & Update Payment Details Later
              </Button>
              <Button className="btn-secondary">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
