import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
const TransitionsModal = ({ classes }) => {
  let {
    section_right,
    info_text_lineNote,
    info_text_guest,
    input_fields,
    checkbox_label,
    button_guest,
    asterisk,
  } = classes;

  return (
    <div className={section_right}>
      <p className={info_text_lineNote}>
        Get started here by entering the personal details and get access as a
        guest.
      </p>
      <div className={info_text_guest}>Guest Access</div>
      <div className={input_fields}>
        <TextField
          id="outlined-textarea"
          label="First Name"
          placeholder="First Name"
          fullWidth
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
          label="Last Name"
          fullWidth
          placeholder="Last Name"
          InputLabelProps={{
            shrink: true,
            required: true,
            classes: {
              asterisk: asterisk,
            },
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
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
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
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
          variant="outlined"
        />
        <TextField
          id="outlined-textarea"
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
          variant="outlined"
        />
        <FormControlLabel
          value="yes"
          control={<Checkbox color="color_third" />}
          label="I confirm that I am a wholesale buyer, and not a consumer or end user."
          labelPlacement="end"
          className={checkbox_label}
        />

        <Box textAlign="center">
          <Button className={button_guest}>Register as Guest</Button>
        </Box>
      </div>
    </div>
  );
};
export default withStyles(styles)(TransitionsModal);
