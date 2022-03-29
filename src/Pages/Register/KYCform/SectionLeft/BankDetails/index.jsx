import React from "react";
import styles from "../styles";

import { withStyles } from "@mui/styles";
import { TextField } from "@mui/material";

function BankDetails({ classes, SetFormValues, FormValues }) {
  let { section_left_bank_details, info_text_lineNote_two } = classes;

  // input state and onchange events
  const handleFormvalue = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className={section_left_bank_details}>
      <p className={info_text_lineNote_two}>Bank Details</p>
      <TextField
        id="account_number"
        label="Account No."
        type="number"
        placeholder="Account Number"
        fullWidth
        className="inputfield-box"
        InputLabelProps={{
          shrink: true,
        }}
        value={FormValues?.account_number}
        onChange={handleFormvalue}
        name="account_number"
        variant="outlined"
      />
      <TextField
        id="bank_name"
        label="Bank Name"
        placeholder="Bank Name"
        fullWidth
        className="inputfield-box"
        InputLabelProps={{
          shrink: true,
        }}
        name="bank_name"
        onChange={handleFormvalue}
        value={FormValues?.bank_name}
        variant="outlined"
      />
      <TextField
        id="account_holder_name"
        label="Account Holder’s Name"
        placeholder="Account Holder’s Name"
        fullWidth
        className="inputfield-box"
        InputLabelProps={{
          shrink: true,
        }}
        value={FormValues?.account_holder_name}
        name="account_holder_name"
        onChange={handleFormvalue}
        variant="outlined"
      />
      <TextField
        id="additional_info"
        label="Additional Info"
        placeholder="Additional Info"
        fullWidth
        className="inputfield-box"
        InputLabelProps={{
          shrink: true,
        }}
        name="additional_info"
        value={FormValues?.additional_info}
        onChange={handleFormvalue}
        variant="outlined"
      />
    </div>
  );
}

export default withStyles(styles)(BankDetails);
