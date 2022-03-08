import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  InputLabel,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import { isEmailValid, isPasswordValid } from "../../../../utilities";

const TransitionsModal = ({ classes }) => {
  let {
    section_right,
    info_text_lineNote,
    info_text_guest,
    input_fields,
    checkbox_label,
    button_box,
    button_guest,
    asterisk,
    validation_error,
  } = classes;
  const [guestData, setGuestData] = useState({
    name: "",
    email_address: "",
    password: "",
    confrim_password: "",
    checkbox_confrim: false,
  });
  const [inputValidation, setInputValidation] = useState({
    name: "",
    last_name: "",
    email_address: "",
    password: "",
    confrim_password: "",
  });
  const handleChangeInput = (event) => {
    if (event?.target?.name === "checkbox_confrim") {
      setGuestData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    } else {
      setGuestData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    }
  };
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "name":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            name: "Please enter the name.",
          }));
        }
        break;
      case "confrim_password":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            confrim_password: "Please enter your confrim password.",
          }));
        } else if (!(guestData?.password === value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            confrim_password: "Password and confirm password does not match",
          }));
        }
        break;
      case "email_address":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter the e-mail.",
          }));
        } else if (!isEmailValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            email_address: "Please enter the valid e-mail.",
          }));
        }
        break;
      case "password":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            password: "Please enter your password.",
          }));
        } else if (!isPasswordValid(value)) {
          setInputValidation((prevState) => ({
            ...prevState,
            password:
              "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleClickValidation = (event) => {
    var errorHandle = false;
    if (!guestData?.name) {
      document.getElementById("name")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        name: "Please enter the name.",
      }));
      errorHandle = true;
    }
    if (!guestData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the e-mail.",
      }));
      errorHandle = true;
    } else if (!isEmailValid(guestData?.email_address)) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the valid e-mail.",
      }));
      errorHandle = true;
    }
    if (!guestData?.password) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter your password.",
      }));
      errorHandle = true;
    } else if (!isPasswordValid(guestData?.password)) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password:
          "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
      }));
      errorHandle = true;
    }
    if (!guestData?.confrim_password) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Please enter your confrim password.",
      }));
      errorHandle = true;
    } else if (!(guestData?.password === guestData?.confrim_password)) {
      document.getElementById("confrim_password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        confrim_password: "Password and confirm password does not match",
      }));
      errorHandle = true;
    }
    if (!guestData?.checkbox_confrim) {
      document.getElementById("checkbox_confrim")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        checkbox_confrim: "Please confrim.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
    }
  };

  return (
    <div className={section_right}>
      <p className={info_text_lineNote}>
        Get started here by entering the personal details and get access as a
        guest.
      </p>
      <div className={info_text_guest}>Guest Access</div>
      <div className={input_fields}>
        <TextField
          id="name"
          label="Full Name"
          placeholder="Full Name"
          fullWidth
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          value={guestData?.name}
          name="name"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.name}
        </InputLabel>
        <TextField
          id="email_address"
          label="E-mail Address"
          placeholder="E-mail Address"
          fullWidth
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          value={guestData?.email_address}
          name="email_address"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.email_address}
        </InputLabel>
        <TextField
          id="password"
          label="Password"
          fullWidth
          type="password"
          placeholder="Password"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          value={guestData?.password}
          name="password"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.password}
        </InputLabel>
        <TextField
          id="confrim_password"
          label="Confrim Password"
          fullWidth
          type="password"
          placeholder="Confrim Password"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          value={guestData?.confrim_password}
          name="confrim_password"
          onChange={handleChangeInput}
          variant="outlined"
        />
        <InputLabel className={validation_error}>
          {inputValidation?.confrim_password}
        </InputLabel>
        <FormControlLabel
          value={guestData?.checkbox_confrim}
          control={<Checkbox color="color_third" />}
          label="I confirm that I am a wholesale buyer, and not a consumer or end user."
          labelPlacement="end"
          className={checkbox_label}
          name="checkbox_confrim"
          onClick={(event) => handleChangeInput(event)}
        />
        <InputLabel className={validation_error}>
          {inputValidation?.checkbox_confrim}
        </InputLabel>

        <Box className={button_box}>
          <Button
            onClick={() => handleClickValidation()}
            className={button_guest}
          >
            Register as Guest
          </Button>
        </Box>
      </div>
    </div>
  );
};
export default withStyles(styles)(TransitionsModal);
