import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "../styles";
import Autocomplete from "@mui/material/Autocomplete";
const OfficeAddressDetails = ({ classes }) => {
  let {
    info_text_lineNote_one,
    auto_complete_input,
    asterisk,
    input_div,
    input_fields,
  } = classes;

  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div>
      <p className={info_text_lineNote_one}>Office Address</p>
      <div className={input_fields}>
        <TextField
          id="outlined-textarea"
          label="Address Line 1"
          placeholder="Address Line 1"
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
          label="Address Line 2"
          placeholder="Address Line 2"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        <div className={input_div}>
          <TextField
            id="outlined-textarea"
            label="PIN/ZIP Code"
            placeholder="PIN/ZIP Code"
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
          label="City"
          placeholder="City"
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
         
     
        </div>

        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          className={auto_complete_input}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              placeholder="Country"
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
      </div>
    </div>
  );
};

export default withStyles(styles)(OfficeAddressDetails);
