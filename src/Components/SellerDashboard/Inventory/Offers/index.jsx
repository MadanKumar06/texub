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
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useStateValue } from "../../../../store/state";
import swal from "sweetalert2";
var moment = require("moment");

const TransitionsModal = ({ handleOpenCloseOffers, offersOpenClose }) => {
  const [{ currency }, dispatch] = useStateValue();
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
    if (offersOpenClose?.isOfferValid === "1") {
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
            start_date: new Date(res?.data?.[0]?.offer_start_date),
            end_date: new Date(res?.data?.[0]?.offer_end_date),
          });
        })
        .catch((err) => {});
    }
  }, []);
  const OffersAPICall = () => {
    let start_date = moment(offersData?.start_date).format("DD/MM/YYYY");
    let end_date = moment(offersData?.end_date).format("DD/MM/YYYY");
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
        swal.fire({
          text: `${err?.response?.data?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="modal_offers"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className="offers_section">
        <p>Add Offers</p>
        <div className="offers_sub_container">
          <div className="textbox-fields">
            <div className="sub-textbox">
              <InputLabel>Start Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label=""
                  inputFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  value={offersData?.start_date ? offersData?.start_date : null}
                  onChange={(newValue) =>
                    setOffersData((prevState) => ({
                      ...prevState,
                      start_date: newValue,
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      className="inputfield-box"
                      id="start_date"
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

            <div className="sub-textbox">
              <InputLabel>End Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label=""
                  inputFormat="dd-MM-yyyy"
                  minDate={new Date()}
                  value={offersData?.end_date ? offersData?.end_date : null}
                  onChange={(newValue) =>
                    setOffersData((prevState) => ({
                      ...prevState,
                      end_date: newValue,
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      className="inputfield-box"
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
          </div>
          <div className="offers_price">
            <InputLabel>Price</InputLabel>
            <TextField
              id="price"
              label=""
              placeholder="68,99900"
              fullWidth
              onChange={(event) =>
                setOffersData((prevState) => ({
                  ...prevState,
                  price: event.target.value,
                }))
              }
              value={offersData?.price}
              className="inputfield-box"
              name="price"
              variant="outlined"
            />
          </div>
        </div>
        <Box className="button-box-container">
          <Button
            className="button-text btn-ternary offers_button"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            className="button-text btn-secondary offers_button"
            onClick={() => OffersAPICall()}
          >
            Submit
          </Button>
        </Box>
      </div>
    </Modal>
  );
};
export default TransitionsModal;
