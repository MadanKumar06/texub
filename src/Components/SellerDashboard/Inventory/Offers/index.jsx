import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  Modal,
  Backdrop,
  TextField,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../../Constant";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { isNumber, SessionExpiredLogout } from "../../../../utilities";
var moment = require("moment");

const TransitionsModal = ({ handleOpenCloseOffers, offersOpenClose }) => {
  const [{}, dispatch] = useStateValue();
  const [open, setOpen] = useState(true);
  const [offersData, setOffersData] = useState({
    start_date: "",
    end_date: "",
    price: "",
  });

  const handleClose = () => {
    setOpen(false);
    handleOpenCloseOffers(false);
  };
  useEffect(() => {
    let customerId = JSON.parse(localStorage.getItem("userdata"));
    if (
      offersOpenClose?.isOfferValid === "1" ||
      offersOpenClose?.isOfferValid === "2"
    ) {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      let data = {
        sellerData: {
          customer_id: customerId?.id,
          product_id: parseInt(offersOpenClose?.product_id),
          assign_product_id: parseInt(offersOpenClose?.assigned_product_id),
        },
      };
      axios
        .post(Constant.baseUrl() + "/viewSellerOffer", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setOffersData({
            price: res?.data?.[0]?.offer_price,
            start_date: res?.data?.[0]?.offer_start_date
              ? new Date(res?.data?.[0]?.offer_start_date)
              : null,
            end_date: res?.data?.[0]?.offer_end_date
              ? new Date(res?.data?.[0]?.offer_end_date)
              : "",
          });
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            SessionExpiredLogout();
          }
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
        });
    }
  }, []);
  // Validation
  const [save_error, setSave_error] = useState({
    start_date: "",
    end_date: "",
    price: "",
  });
  const handleClickValidation = () => {
    var errorHandle = false;
    if (!offersData.start_date) {
      document.getElementById("offer_start_date")?.focus();
      setSave_error((prevState) => ({
        ...prevState,
        start_date: "Please enter the start date.",
      }));
      errorHandle = true;
    }
    if (!offersData.end_date) {
      document.getElementById("offer_end_date")?.focus();
      setSave_error((prevState) => ({
        ...prevState,
        end_date: "Please enter the end date.",
      }));
      errorHandle = true;
    }
    if (!offersData.price) {
      document.getElementById("price")?.focus();
      setSave_error((prevState) => ({
        ...prevState,
        price: "Please enter the price.",
      }));
      errorHandle = true;
    } else if (!isNumber(offersData.price)) {
      document.getElementById("price")?.focus();
      setSave_error((prevState) => ({
        ...prevState,
        price: "Please enter the number.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      OffersAPICall();
      setSave_error({
        start_date: "",
        end_date: "",
        price: "",
      });
    }
  };
  const OffersAPICall = () => {
    let start_date = moment(offersData?.start_date).format("DD/MM/YYYY");
    let end_date = moment(offersData?.end_date).format("DD/MM/YYYY");
    let d = moment(new Date()).format("YYYY-MM-DD");
    let d1 = moment(offersData?.start_date).format("YYYY-MM-DD");
    let d2 = moment(offersData?.end_date).format("YYYY-MM-DD");
    if (moment(d).isAfter(d1)) {
      swal.fire({
        text: `Please Select Future Date to Apply Offers`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (moment(d1).isSame(d2) || moment(d1).isBefore(d2)) {
      let customerId = JSON.parse(localStorage.getItem("userdata"));
      let data = {
        sellerData: {
          customer_id: customerId?.id,
          product_id: parseInt(offersOpenClose?.product_id),
          assign_product_id: parseInt(offersOpenClose?.assigned_product_id),
          offer_value: parseInt(offersData?.price),
          from_date: start_date,
          end_date: end_date,
        },
      };
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      axios
        .post(Constant.baseUrl() + "/setOfferprice", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          if (res?.data?.[0]?.status) {
            swal.fire({
              text: `${res?.data?.[0]?.message}`,
              icon: "success",
              showConfirmButton: false,
              timer: 3000,
            });
            dispatch({
              type: "SET_GENERAL_TRINGGER",
            });
            handleOpenCloseOffers(false);
          } else {
            swal.fire({
              text: `${res?.data?.[0]?.message}`,
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          if (err.response.status === 401) {
            SessionExpiredLogout();
          } else {
            swal.fire({
              text: `${err?.response?.data?.message}`,
              icon: "error",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
    } else {
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      swal.fire({
        text: `End Date Must be greater than or Equal to Start Date`,
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  useEffect(() => {
    const EnterkeyHandler = (event) => {
      let submit_invoice_offer = document.getElementById(
        "submit_invoice_offer"
      );
      if (event.key === "Enter") {
        event.preventDefault();
        submit_invoice_offer?.click();
      }
    };
    document.addEventListener("keydown", EnterkeyHandler);
    return () => {
      document.removeEventListener("keydown", EnterkeyHandler);
    };
  }, []);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="modal_offers"
      open={open}
      closeAfterTransition
      disableRestoreFocus={true}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="offers_section">
        {offersOpenClose?.isOfferValid === "1" ||
        offersOpenClose?.isOfferValid === "2" ? (
          <p>View Offers</p>
        ) : (
          <p>Add Offers</p>
        )}

        <div className="offers_sub_container">
          <div className="textbox-fields">
            <div className="sub-textbox">
              <InputLabel>Start Date</InputLabel>
              <div className="field_box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label=""
                    inputFormat="dd-MM-yyyy"
                    disablePast
                    value={
                      offersData?.start_date ? offersData?.start_date : null
                    }
                    onChange={(newValue) => {
                      setOffersData((prevState) => ({
                        ...prevState,
                        start_date: newValue,
                      }));
                      setSave_error((prevState) => ({
                        ...prevState,
                        start_date: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        className="inputfield-box calendar_info"
                        id="start_date"
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
                  {offersData?.start_date ? (
                    <Clear
                      className="datepicker"
                      onClick={() => {
                        setOffersData((prev) => ({
                          ...prev,
                          start_date: null,
                        }));
                      }}
                    />
                  ) : null}
                </LocalizationProvider>
              </div>
              <InputLabel style={{ color: "red" }}>
                {save_error.start_date}
              </InputLabel>
            </div>

            <div className="sub-textbox">
              <InputLabel>End Date</InputLabel>
              <div className="field_box">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    label=""
                    inputFormat="dd-MM-yyyy"
                    disablePast
                    value={offersData?.end_date ? offersData?.end_date : null}
                    onChange={(newValue) => {
                      setOffersData((prevState) => ({
                        ...prevState,
                        end_date: newValue,
                      }));
                      setSave_error((prevState) => ({
                        ...prevState,
                        end_date: "",
                      }));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        InputProps={{
                          endAdornment: <CalendarTodayIcon />,
                        }}
                        className="inputfield-box calendar_info"
                        id="end_date"
                        inputProps={{
                          ...params.inputProps,
                          readOnly: true,
                          placeholder: "DD-MM-YYYY",
                        }}
                      />
                    )}
                  />
                  {offersData?.end_date ? (
                    <Clear
                      className="datepicker"
                      onClick={() => {
                        setOffersData((prev) => ({
                          ...prev,
                          end_date: null,
                        }));
                      }}
                    />
                  ) : null}
                </LocalizationProvider>
              </div>
              <InputLabel style={{ color: "red" }}>
                {save_error.end_date}
              </InputLabel>
            </div>
          </div>
          <div className="offers_price">
            <InputLabel>Price</InputLabel>
            <TextField
              id="price"
              label=""
              placeholder="68,99900"
              fullWidth
              onChange={(event) => {
                setOffersData((prevState) => ({
                  ...prevState,
                  price: event.target.value,
                }));
                setSave_error((prevState) => ({
                  ...prevState,
                  price: "",
                }));
              }}
              value={offersData?.price}
              className="inputfield-box"
              name="price"
              variant="outlined"
            />
            <InputLabel style={{ color: "red" }}>{save_error.price}</InputLabel>
          </div>
        </div>
        <Box className="button-box-container">
          <Button
            className="button-text btn-ternary offers_button"
            onClick={() => {
              handleClose();
              setSave_error({
                start_date: "",
                end_date: "",
                price: "",
              });
            }}
          >
            Cancel
          </Button>
          <Button
            className="button-text btn-secondary offers_button"
            // onClick={() => OffersAPICall()}
            id="submit_invoice_offer"
            onClick={() => handleClickValidation()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </Modal>
  );
};
export default TransitionsModal;
