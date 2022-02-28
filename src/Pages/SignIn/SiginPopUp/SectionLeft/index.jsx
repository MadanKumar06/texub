import React, { useState } from "react";
import styles from "./styles";
import {
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  Backdrop,
  InputLabel,
} from "@mui/material";
import { isEmailValid, isPasswordValid } from "../../../../utilities";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import SectionRight from "../SectionRight";

const TransitionsModal = ({ classes, openPopUp }) => {
  let {
    section_main,
    modal,
    sections,
    section_left,
    section_right,
    button_box,
    header_section,
    clear_btn,
    info_text,
    info_text_lineNote_one,
    info_text_lineNote_two,
    input_fields,
    checkbox_label,
    button_signin,
    forgot_password,
    validation_error,
    asterisk,
  } = classes;

  const [open, setOpen] = useState(true);
  const [signInData, setSignInData] = useState({
    email_address: "",
    password: "",
    keep_me_logged_in: false,
  });
  const [inputValidation, setInputValidation] = useState({
    email_address: "",
    password: "",
  });

  const handleClose = () => {
    setOpen(false);
    openPopUp(false);
  };
  const handleChangeInput = (event) => {
    if (event?.target?.name === "keep_me_logged_in") {
      setSignInData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.checked,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    } else {
      setSignInData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
      setInputValidation("");
      handleSwitchCase([event.target.name], event.target.value);
    }
  };
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
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
    if (!signInData?.email_address) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the e-mail.",
      }));
      errorHandle = true;
    } else if (!isEmailValid(signInData?.email_address)) {
      document.getElementById("email_address")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        email_address: "Please enter the valid e-mail.",
      }));
      errorHandle = true;
    }
    if (!signInData?.password) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password: "Please enter your password.",
      }));
      errorHandle = true;
    } else if (!isPasswordValid(signInData?.password)) {
      document.getElementById("password")?.focus();
      setInputValidation((prevState) => ({
        ...prevState,
        password:
          "Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character.",
      }));
      errorHandle = true;
    }
    if (!errorHandle) {
      // Apicall fuction
    }
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={section_main}>
        <header className={header_section}>
          <p>Welcome !</p>
          <Clear className={clear_btn} onClick={() => handleClose()} />
        </header>
        <div className={sections}>
          <div className={section_left}>
            <p className={info_text_lineNote_one}>
              <small>*</small> Texhub doesn’t sell or ship to consumers.
            </p>
            <p className={info_text_lineNote_two}>
              To keep connected please login here
            </p>
            <div className={info_text}>Sign-In</div>
            <div className={input_fields}>
              <TextField
                id="email_address"
                name="email_address"
                label="E-mail Address"
                placeholder="E-mail Address"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                value={signInData?.email_address}
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: asterisk,
                  },
                }}
                onChange={handleChangeInput}
                variant="outlined"
              />
              <InputLabel className={validation_error}>
                {inputValidation?.email_address}
              </InputLabel>
              <TextField
                id="password"
                name="password"
                label="Password"
                fullWidth
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                value={signInData?.password}
                InputLabelProps={{
                  shrink: true,
                  required: true,
                  classes: {
                    asterisk: asterisk,
                  },
                }}
                onChange={handleChangeInput}
                variant="outlined"
              />
              <InputLabel className={validation_error}>
                {inputValidation?.password}
              </InputLabel>
              <FormControlLabel
                value={signInData?.keep_me_logged_in}
                control={<Checkbox color="color_third" />}
                label="Keep me signed in."
                labelPlacement="end"
                className={checkbox_label}
                name="keep_me_logged_in"
                onClick={(event) => handleChangeInput(event)}
              />
              <Box className={button_box}>
                <Button
                  onClick={() => handleClickValidation()}
                  className={button_signin}
                >
                  Sign In
                </Button>
              </Box>
              <p className={forgot_password}>Forgot Password?</p>
            </div>
          </div>
          <div className={section_right}>
            <SectionRight />
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default withStyles(styles)(TransitionsModal);
