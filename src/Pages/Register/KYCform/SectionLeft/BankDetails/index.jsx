import React from "react";
import styles from "../styles";

import { withStyles } from "@mui/styles";
import { TextField } from "@mui/material";

function BankDetails({ classes }) {
  let { section_left_bank_details, info_text_lineNote_two } = classes;
  return (
    <div className={section_left_bank_details}>
      <p className={info_text_lineNote_two}>Bank Details</p>
      <TextField
        id="outlined-textarea"
        label="Account No."
        type="number"
        placeholder="Account Number"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-textarea"
        label="Bank Name"
        placeholder="Bank Name"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-textarea"
        label="Account Holder’s Name"
        placeholder="Account Holder’s Name"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        id="outlined-textarea"
        label="Additional Info"
        placeholder="Additional Info"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </div>
  );
}

export default withStyles(styles)(BankDetails);
