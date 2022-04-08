import React, { useState, useEffect } from "react";
import styles from "../styles";

import {
  TextField,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const TradeLicenseButton = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
}) => {
  useEffect(() => {
    setInputValidation({ ...validationFieldMessage });
  }, [validationFieldMessage]);
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
    checkbox_label,
  } = classes;

  //Data state and onchange event
  const [dateChange, setDateChange] = useState(null);
  const handleChange = (newValue) => {
    setDateChange(newValue);
    SetFormValues((prevState) => ({
      ...prevState,
      trade_expiration_date: newValue,
    }));
    setInputValidation("");
    handleSwitchCase(["trade_expiration_date"], newValue);
  };

  // input state and onchange events
  const handleFormvalue = (event) => {
    if (event.target.name === "trade_remainder_check") {
      SetFormValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else {
      SetFormValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
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
    toBase64(event.target?.files[0], event.target?.files[0]?.type);
  };
  const toBase64 = (File, type) => {
    var reader = new FileReader();
    reader.readAsDataURL(File);
    reader.onload = function () {
      if (type === "image/png") {
        let temp = reader.result?.replace("data:image/png;base64,", "png;");
        SetFormValues((prevState) => ({
          ...prevState,
          trade_image_base64: temp,
        }));
      } else if (type === "application/pdf") {
        let temp = reader.result?.replace(
          "data:application/pdf;base64,",
          "pdf;"
        );
        SetFormValues((prevState) => ({
          ...prevState,
          trade_image_base64: temp,
        }));
      } else if (type === "image/jpeg") {
        let temp = reader.result?.replace("data:image/jpeg;base64,", "jpeg;");
        SetFormValues((prevState) => ({
          ...prevState,
          trade_image_base64: temp,
        }));
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    company_name: "",
    trade_lic_number: "",
    trade_expiration_date: "",
    trade_image: "",
  });

  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "trade_expiration_date":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            trade_expiration_date: "Please select expiration date.",
          }));
          SetFormValues((prevState) => ({
            ...prevState,
            expiry_checkbox: false,
          }));
        } else if (value.toString() === "Invalid Date") {
          setInputValidation((prevState) => ({
            ...prevState,
            trade_expiration_date: "Please select valid date.",
          }));
          SetFormValues((prevState) => ({
            ...prevState,
            expiry_checkbox: false,
          }));
        } else if (value.toString() !== "Invalid Date") {
          SetFormValues((prevState) => ({
            ...prevState,
            expiry_checkbox: true,
          }));
        }
        break;
      default:
        break;
    }
  };

  var company_name = JSON.parse(
    localStorage.getItem("userdata")
  )?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_company_name"
  );
  return (
    <div>
      <TextField
        id="company_name"
        label="Company Name"
        placeholder="Company Name"
        fullWidth
        disabled
        value={company_name?.[0]?.value}
        className="inputfield-box"
        InputLabelProps={{
          shrink: true,
          required: true,
          readOnly: true,
          classes: {
            asterisk: asterisk,
          },
        }}
        name="company_name"
        variant="outlined"
      />
      <div className={input_div}>
        <TextField
          id="trade_lic_number"
          label="Trade LIC Number"
          placeholder="Trade LIC Number"
          fullWidth
          className="inputfield-box"
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
            inputFormat="MM/dd/yyyy"
            minDate={new Date()}
            value={dateChange}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                className="inputfield-box"
                id="trade_expiration_date"
                placeholder="MM/DD/YY"
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
                accept="image/jpeg,image/png,application/pdf"
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
        </div>
        {inputValidation?.trade_image && (
          <InputLabel className={validation_error}>
            {inputValidation?.trade_image}
          </InputLabel>
        )}
        <div className={input_image_name}>
          {FormValues?.trade_image?.name ? (
            <p>{FormValues?.trade_image?.name}</p>
          ) : (
            <p>No File Chosen</p>
          )}
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
      </div>
      {FormValues?.expiry_checkbox && (
        <FormControlLabel
          value={FormValues?.trade_remainder_check}
          control={
            <Checkbox
              color="color_third"
              name="trade_remainder_check"
              onChange={handleFormvalue}
            />
          }
          label="Automated Reminder on Expiry."
          labelPlacement="end"
          className={checkbox_label}
        />
      )}
    </div>
  );
};

export default withStyles(styles)(TradeLicenseButton);
