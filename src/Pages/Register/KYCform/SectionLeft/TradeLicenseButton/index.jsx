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
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const TradeLicenseButton = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
  inputsValidations,
  setinputsValidations
}) => {
  /* useEffect(() => {
    setInputValidation({ ...validationFieldMessage });
    setinputsValidations((prevState) => ({
      ...prevState,
      trade_image: validationFieldMessage?.trade_image,
    }));
  }, [validationFieldMessage]); */
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
    datepicker,
  } = classes;

  //Data state and onchange event
  const handleChange = (newValue) => {
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
          SetFormValues((prevState) => ({
            ...prevState,
            expiry_checkbox: false,
          }));
        } else if (value.toString() === "Invalid Date") {
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
          label="Trade License Number"
          placeholder="Trade License Number"
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
          onChange={(e)=>{
            handleFormvalue(e)
            setinputsValidations((prevState) => ({
              ...prevState,
              trade_lic_number: "",
            }));
          }}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputsValidations?.trade_lic_number}
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Expiration Date"
            inputFormat="dd/MM/yyyy"
            minDate={new Date()}
            value={
              FormValues?.trade_expiration_date
                ? FormValues?.trade_expiration_date
                : null
            }
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                className="inputfield-box calendar_info"
                id="trade_expiration_date"
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                  placeholder: "DD/MM/YYYY",
                }}
                InputProps={{
                  endAdornment: <CalendarTodayIcon />,
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
          {FormValues?.trade_expiration_date ? (
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
          ) : null}
        </LocalizationProvider>
        <InputLabel className={validation_error}>
          {inputValidation?.trade_expiration_date}
        </InputLabel>
      </div>
      <div className={media_upload}>
        <div className={sub_media_upload_container}>
          <div className={sub_media_upload_part}>
            <p>Attach License</p>
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
                onChange={(event)=>{
                  handleImageChange(event)
                  setinputsValidations((prevState) => ({
                    ...prevState,
                    trade_image: "",
                  }));
                }}
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
        <InputLabel className={validation_error}>
          {inputsValidations?.trade_image}
        </InputLabel>
        <div className={input_image_name}>
          {FormValues?.trade_image?.name ? (
            <p>{FormValues?.trade_image?.name}</p>
          ) : (
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/jpeg,image/png,application/pdf"
                id="icon-button-file"
                type="file"
                name="trade_image"
                onChange={(event)=>{
                  handleImageChange(event)
                  setinputsValidations((prevState) => ({
                    ...prevState,
                    trade_image: "",
                  }));
                }}
              />
              <p>No File Chosen</p>
            </label>
          )}
          <Clear
            className={input_image_name_clear_btn}
            onClick={() =>{
              SetFormValues((prevState) => ({
                ...prevState,
                trade_image: "",
              }))
              setinputsValidations((prevState) => ({
                ...prevState,
                trade_image: "",
              }));
            }}
          />
        </div>
      </div>
      {FormValues?.expiry_checkbox && (
        <FormControlLabel
          control={
            <Checkbox
              checked={FormValues?.trade_remainder_check}
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
