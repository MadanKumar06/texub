import React, { useState } from "react";
import "./styles.scss";
import checkoutmark from "../../../Assets/CheckoutPage/check-mark.png";
import { Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { TextField, InputLabel } from "@mui/material";
import { Clear } from "@mui/icons-material";
import {
  MobileDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axios from "axios";
import Constant from "../../../Constant";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { useStateValue } from "../../../store/state";
import swal from "sweetalert2";

const Index = () => {
  let userDetails = JSON.parse(localStorage.getItem("userdata"));
  const [transactiondetails, settransactiondetails] = useState({});
  const [transactionvalidation, settransactionvalidation] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ geo, customnostore }, dispatch] = useStateValue();

  const handleTransaction = (e) => {
    settransactiondetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handletransactionvalidation = () => {
    let errorhandle = false;
    if (!transactiondetails?.reference_number) {
      settransactionvalidation((prevstate) => ({
        ...prevstate,
        reference_number: "Please fill the Reference Number",
      }));
      errorhandle = true;
    }
    if (!transactiondetails?.payment_amount) {
      settransactionvalidation((prevstate) => ({
        ...prevstate,
        payment_amount: "Please fill the Payment Amount",
      }));
      errorhandle = true;
    }
    if (!transactiondetails?.transaction_date_time) {
      settransactionvalidation((prevstate) => ({
        ...prevstate,
        transaction_date_time: "Please select Date",
      }));
      errorhandle = true;
    }
    if (!transactiondetails?.remarks) {
      settransactionvalidation((prevstate) => ({
        ...prevstate,
        remarks: "Please fill Remarks",
      }));
      errorhandle = true;
    }

    if (!errorhandle) {
      submittransaction();
    }
  };

  const submittransaction = async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    let date = moment(transactiondetails?.transaction_date_time).format(
      "DD/MM/YYYY"
    );
    try {
      const submitdata = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/order/orderPayment`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          requestParam: {
            customer_id: user?.id,
            order_id: id,
            reference_number: transactiondetails?.reference_number,
            payment_amount: transactiondetails?.payment_amount,
            payment_date: transactiondetails?.transaction_date_time,
            payment_remarks: transactiondetails?.remarks,
          },
        },
      });
      console.log(submitdata?.data);
      swal.fire({
        text: submitdata?.data[0]?.message,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate(
        `/${
          customnostore ? customnostore : geo?.country_name
        }/buyerdashboard/myorder`
      );
    } catch (e) {
      console.log(e);
    }
  };

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
            <span className="msg">
              Dear {userDetails?.firstname} {userDetails?.lastname}
            </span>
          </div>
          <div className="custom_msg common-block">
            <span className="msg">
              You have successfully placed the order. Kindly fill the
              transaction details below to confirm the order.
            </span>
          </div>
          <div className="backto_home_btn common-block">
            <Button className="home_to_home" onClick={() => navigate("/")}>
              Back To Homepage
            </Button>
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
                    value={transactiondetails?.referencenumber}
                    onChange={(e) => handleTransaction(e)}
                  />
                  <p style={{ color: "red" }}>
                    {transactionvalidation?.reference_number
                      ? transactionvalidation?.reference_number
                      : ""}
                  </p>
                </div>
                <div className="transaction_info_section">
                  <InputLabel>Payment Amount</InputLabel>
                  <TextField
                    id="payment_amount"
                    placeholder="INR 94,05,811"
                    className="inputfield-box"
                    name="payment_amount"
                    type="number"
                    variant="outlined"
                    value={transactiondetails?.payment_amount}
                    onChange={(e) => handleTransaction(e)}
                  />
                  <p style={{ color: "red" }}>
                    {transactionvalidation?.payment_amount
                      ? transactionvalidation?.payment_amount
                      : ""}
                  </p>
                </div>
              </div>

              <div className="transaction_block">
                <div className="transaction_info_section">
                  <InputLabel>Transaction Date & Time</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      id="transaction_date_time"
                      name="transaction_date_time"
                      inputFormat="dd/MM/yyyy  |  hh:mm a"
                      disablePast
                      value={
                        transactiondetails?.transaction_date_time
                          ? transactiondetails?.transaction_date_time
                          : null
                      }
                      onChange={(newValue) => {
                        settransactiondetails((prevState) => ({
                          ...prevState,
                          transaction_date_time: newValue,
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          className="inputfield-box calendar_info order_success_calendar"
                          {...params}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true,
                            placeholder: "DD/MM/YY  |  Hrs:Min:Sec",
                          }}
                        />
                      )}
                    />
                    {transactiondetails?.transaction_date_time ? (
                      <Clear
                        className="clear_datepicker"
                        onClick={() => {
                          settransactiondetails((prevState) => ({
                            ...prevState,
                            transaction_date_time: null,
                          }));
                        }}
                      />
                    ) : null}
                  </LocalizationProvider>
                  <p style={{ color: "red" }}>
                    {transactionvalidation?.transaction_date_time
                      ? transactionvalidation?.transaction_date_time
                      : ""}
                  </p>
                </div>
                <div className="transaction_info_section">
                  <InputLabel>Remarks</InputLabel>
                  <TextareaAutosize
                    id="remarks"
                    name="remarks"
                    aria-label="Remarks"
                    minRows={3}
                    placeholder="Remarks"
                    className="textArea"
                    style={{ height: 100 }}
                    value={transactiondetails?.remarks}
                    onChange={(e) => handleTransaction(e)}
                  />
                  <p style={{ color: "red" }}>
                    {transactionvalidation?.remarks
                      ? transactionvalidation?.remarks
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="ordersuccess_btns">
              {/* <Button
                className="payment_later_btn btn-primary"
                onClick={() =>
                  navigate(
                    `/${
                      customnostore ? customnostore : geo?.country_name
                    }/buyerdashboard/myorder`
                  )
                }
              >
                Confirm & Update Payment Details Later
              </Button> */}
              <Button
                className="btn-secondary"
                onClick={() => handletransactionvalidation()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
