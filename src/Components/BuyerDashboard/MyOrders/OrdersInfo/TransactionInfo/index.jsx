import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import swal from "sweetalert2";
import moment from "moment";
import { Clear } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FormControlLabel, TextField, InputLabel } from "@mui/material";
import "./styles.scss";
import { useStateValue } from "../../../../../store/state";
import { MobileDatePicker,LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from "axios";
import Constant from "../../../../../Constant";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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

export default function BasicModal({ PopupTransaction }) {
  const [{}, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(2);
  // const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    else {
      setOpen(false);
      dispatch({
        type: "SET_PDP_POPUP_OPEN_CLOSE",
        value: false,
      });
      PopupTransaction(false);
    }
  };

  const [transactiondetails, settransactiondetails] = useState({});
  const [transactionvalidation, settransactionvalidation] = useState({});

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
    let date = moment(transactiondetails?.remarks).format("DD/MM/YYYY");
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
            order_id: "",
            reference_number: transactiondetails?.reference_number,
            payment_amount: transactiondetails?.payment_amount,
            payment_date: transactiondetails?.transaction_date_time,
            payment_remarks: date,
          },
        },
      });
      swal.fire({
        text: submitdata?.data[0]?.message,
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="transaction_number_popup"
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableRestoreFocus={true}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className="transaction_popup_main" style={{ outline: "none" }}>
          <Clear
            className="clear_btn transaction_popup_clear_btn"
            onClick={() => handleClose()}
          />
          <div className="transaction_popup">
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
                    <MobileDatePicker
                      id="transaction_date_time"
                      name="transaction_date_time"
                      inputFormat="MM/dd/yyyy"
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
                          {...params}
                          className="inputfield-box calendar_info"
                          InputProps={{
                            endAdornment: <CalendarTodayIcon />,
                          }}
                          inputProps={{
                            ...params.inputProps,
                            readOnly: true,
                            placeholder: "DD-MM-YYYY",
                          }}
                        />
                      )}
                    />
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
              <Button className="payment_later_btn btn-primary">
                Confirm & Update Payment Details Later
              </Button>
              <Button className="btn-secondary">Submit</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
