import React, { useState } from "react";
import styles from "../styles";

import { TextField, InputLabel } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const TradeLicenseButton = ({ classes, SetFormValues, FormValues }) => {
  let {
    input_div,
    asterisk,
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
    validation_error,
  } = classes;

  //Data state and onchange event
  const [dateChange, setDateChange] = useState(null);
  const handleChange = (newValue) => {
    setDateChange(newValue);
    setInputValidation("");
    handleSwitchCase(["trade_expiration_date"], newValue);
  };

  // input state and onchange events
  const handleFormvalue = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target.value);
  };

  const handleImageChange = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target?.files[0]?.name);
  };

  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    business_name: "",
    trade_lic_number: "",
    trade_expiration_date: "",
    trade_image: "",
  });

  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "business_name":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            business_name: "Please enter the business name.",
          }));
        }
        break;
      case "trade_lic_number":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            trade_lic_number: "Please enter the trade lic number.",
          }));
        }
        break;

      case "trade_expiration_date":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            trade_expiration_date: "Please select expiration date.",
          }));
        } else if (value.toString() === "Invalid Date") {
          setInputValidation((prevState) => ({
            ...prevState,
            trade_expiration_date: "Please select valid date.",
          }));
        }
        break;
      case "trade_image":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            trade_image: "Please attach the License details.",
          }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <TextField
        id="business_name"
        label="Business Name"
        placeholder="Business Name"
        fullWidth
        value={FormValues?.business_name}
        InputLabelProps={{
          shrink: true,
          required: true,
          classes: {
            asterisk: asterisk,
          },
        }}
        name="business_name"
        onChange={handleFormvalue}
        variant="outlined"
      />
      <InputLabel className={validation_error}>
        {inputValidation?.business_name}
      </InputLabel>
      <div className={input_div}>
        <TextField
          id="trade_lic_number"
          label="Trade LIC Number"
          placeholder="Trade LIC Number"
          fullWidth
          name="trade_lic_number"
          value={FormValues?.trade_lic_number}
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          onChange={handleFormvalue}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.trade_lic_number}
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Expiration Date"
            inputFormat="MM/yy"
            views={["year", "month"]}
            minDate={new Date()}
            value={dateChange}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="trade_expiration_date"
                placeholder="MM/YY"
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: asterisk,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
        <InputLabel className={validation_error}>
          {inputValidation?.trade_expiration_date}
        </InputLabel>
      </div>
      <div className={media_upload}>
        <div className={sub_media_upload_container}>
          <div className={sub_media_upload_part}>
            <p>Attatch License</p>
            <span>*</span>
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                name="trade_image"
                onChange={handleImageChange}
              />
              <img
                src={uploadImage}
                alt="auth"
                aria-label="upload picture"
                component="span"
              />
            </label>
          </div>

          <small>(Supported format : .jpg/.png/.pdf)</small>
          <InputLabel className={validation_error}>
            {inputValidation?.trade_image}
          </InputLabel>
        </div>
        {FormValues?.trade_image && (
          <div className={input_image_name}>
            <p>{FormValues?.trade_image?.name}</p>
            <Clear
              className={input_image_name_clear_btn}
              onClick={() =>
                SetFormValues((prevState) => ({
                  ...prevState,
                  trade_image: "",
                }))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(TradeLicenseButton);
