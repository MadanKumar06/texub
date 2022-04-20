import React, { useState } from "react";
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
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const TransitionsModal = ({ handleOpenCloseOffers }) => {
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
                  inputFormat="dd-MM-yy"
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
                        placeholder: "DD-MM-YY",
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
                  inputFormat="dd-MM-yy"
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
                        placeholder: "DD-MM-YY",
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
              placeholder="INR 68,99900"
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
          <Button className="button-text btn-secondary offers_button">
            Submit
          </Button>
        </Box>
      </div>
    </Modal>
  );
};
export default TransitionsModal;
