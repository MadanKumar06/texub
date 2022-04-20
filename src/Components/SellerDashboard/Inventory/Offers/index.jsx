import React, { useState } from "react";
import "./styles.scss";
import { Modal, Backdrop, TextField } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const TransitionsModal = ({ handleOpenCloseOffers }) => {
  const [open, setOpen] = useState(true);
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
        <div className="">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Expiration Date"
              inputFormat="dd/MM/yyyy"
              minDate={new Date()}
              // value={
              //   FormValues?.trade_expiration_date
              //     ? FormValues?.trade_expiration_date
              //     : null
              // }
              // onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  className="inputfield-box"
                  id="trade_expiration_date"
                  inputProps={{
                    ...params.inputProps,
                    readOnly: true,
                    placeholder: "DD/MM/YYYY",
                  }}
                  InputLabelProps={{
                    shrink: true,
                    // required: true,
                    // classes: {
                    //   asterisk: asterisk,
                    // },
                  }}
                />
              )}
            />
            {/* {FormValues?.trade_expiration_date ? (
            <Clear
              className={datepicker}
              onClick={() => {
                SetFormValues((prev) => ({
                  ...prev,
                  trade_expiration_date: null,
                  expiry_checkbox: false,
                  trade_remainder_check: false,
                }));
              }}
            />
          ) : null} */}
          </LocalizationProvider>
        </div>
        <button onClick={() => handleClose()}>Cancel</button>
      </div>
    </Modal>
  );
};
export default TransitionsModal;
