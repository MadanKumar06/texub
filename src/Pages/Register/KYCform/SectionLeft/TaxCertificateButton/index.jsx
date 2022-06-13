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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";
import { MobileDatePicker ,LocalizationProvider} from "@mui/x-date-pickers";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
const TaxCertificateButton = ({
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
      tax_image: validationFieldMessage?.tax_image,
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

  //Date onchange event
  const handleChange = (newValue) => {
    SetFormValues((prevState) => ({
      ...prevState,
      tax_expiration_date: newValue,
    }));
    setInputValidation("");
    handleSwitchCase(["tax_expiration_date"], newValue);
  };

  // input state and onchange events
  const handleFormvalue = (event) => {
    if (event.target.name === "tax_remainder_check") {
      SetFormValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
    } else {
      SetFormValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    }
  };

  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    tax_number: "",
    tax_expiration_date: "",
    tax_image: "",
  });
  // input state and onchange events
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
          tax_image_base64: temp,
        }));
      } else if (type === "application/pdf") {
        let temp = reader.result?.replace(
          "data:application/pdf;base64,",
          "pdf;"
        );
        SetFormValues((prevState) => ({
          ...prevState,
          tax_image_base64: temp,
        }));
      } else if (type === "image/jpeg") {
        let temp = reader.result?.replace("data:image/jpeg;base64,", "jpeg;");
        SetFormValues((prevState) => ({
          ...prevState,
          tax_image_base64: temp,
        }));
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "tax_expiration_date":
        if (!value) {
          SetFormValues((prevState) => ({
            ...prevState,
            tax_expiry_checkbox: false,
          }));
        } else if (value.toString() === "Invalid Date") {
          SetFormValues((prevState) => ({
            ...prevState,
            tax_expiry_checkbox: false,
          }));
        } else if (value.toString() !== "Invalid Date") {
          SetFormValues((prevState) => ({
            ...prevState,
            tax_expiry_checkbox: true,
          }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={input_div}>
        <TextField
          id="tax_number"
          label="Tax Number"
          fullWidth
          placeholder="Tax Number"
          className="inputfield-box"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          name="tax_number"
          value={FormValues?.tax_number}
          onChange={(e)=>{
            handleFormvalue(e)
            setinputsValidations((prevState) => ({
              ...prevState,
              tax_number: "",
            }));
          }}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputsValidations?.tax_number}
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Expiration Date"
            inputFormat="dd/MM/yyyy"
            onClose={false}
            value={
              FormValues?.tax_expiration_date
                ? FormValues?.tax_expiration_date
                : null
            }
            disablePast
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

          {FormValues?.tax_expiration_date ? (
            <Clear
              className={datepicker}
              onClick={() => {
                SetFormValues((prev) => ({
                  ...prev,
                  tax_expiration_date: null,
                  tax_remainder_check: false,
                  tax_expiry_checkbox: false,
                }));
              }}
            />
          ) : null}
        </LocalizationProvider>
        <InputLabel className={validation_error}>
          {inputValidation?.tax_expiration_date}
        </InputLabel>
      </div>
      <div className={media_upload}>
        <div className={sub_media_upload_container}>
          <div className={sub_media_upload_part}>
            <p>Attach Certificate</p>
            <span>*</span>
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/jpeg,image/png,application/pdf"
                id="icon-button-file"
                type="file"
                name="tax_image"
                onChange={(event)=>{
                  handleImageChange(event)
                  setinputsValidations((prevState) => ({
                    ...prevState,
                    tax_image: "",
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
          {inputsValidations?.tax_image}
        </InputLabel>

        <div className={input_image_name}>
          {FormValues?.tax_image?.name ? (
            <p>{FormValues?.tax_image?.name}</p>
          ) : (
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/jpeg,image/png,application/pdf"
                id="icon-button-file"
                type="file"
                name="tax_image"
                onChange={(event)=>{
                  handleImageChange(event)
                  setinputsValidations((prevState) => ({
                    ...prevState,
                    tax_image: "",
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
                tax_image: "",
              }))
              setinputsValidations((prevState) => ({
                ...prevState,
                tax_image: "",
              }))
            }}
          />
        </div>
      </div>
      {FormValues?.tax_expiry_checkbox && (
        <FormControlLabel
          control={
            <Checkbox
              color="color_third"
              name="tax_remainder_check"
              checked={FormValues?.tax_remainder_check}
              onChange={handleFormvalue}
            />
          }
          label="Automated Reminder on Expiry."
          labelPlacement="end"
          className={checkbox_label}
        />
      )}
    </>
  );
};

export default withStyles(styles)(TaxCertificateButton);
