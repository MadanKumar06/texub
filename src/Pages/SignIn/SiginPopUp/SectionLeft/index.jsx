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
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear } from "@mui/icons-material";
import SectionRight from "../SectionRight";

const TransitionsModal = ({ classes, openPopUp }) => {
  const [open, setOpen] = useState(true);
  const [signInData, setSignInData] = useState({
    email_address: "",
    password: "",
    keep_me_logged_in: "",
  });
  let {
    section_main,
    modal,
    sections,
    section_left,
    section_right,
    header_section,
    clear_btn,
    info_text,
    info_text_lineNote_one,
    info_text_lineNote_two,
    input_fields,
    checkbox_label,
    button_signin,
    forgot_password,
    asterisk,
  } = classes;

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
    } else {
      setSignInData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
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
              <TextField
                id="password"
                name="password"
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
                onChange={handleChangeInput}
                variant="outlined"
              />

              <FormControlLabel
                value="yes"
                control={<Checkbox color="color_third" />}
                label="Keep me signed in."
                labelPlacement="end"
                className={checkbox_label}
                name="keep_me_logged_in"
                onClick={(event) => handleChangeInput(event)}
              />
              <Box textAlign="center">
                <Button className={button_signin}>Sign In</Button>
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
