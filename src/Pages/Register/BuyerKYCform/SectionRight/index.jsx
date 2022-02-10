import React, { useState } from "react";
import { TextField, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import Autocomplete from "@mui/material/Autocomplete";
const BuyerKYCformSectionRight = ({ classes, handleClose }) => {
  let {
    section_right_container,
    info_text_lineNote_one,
    info_text_lineNote_two,
    auto_complete_input,
    asterisk,
    input_div,
    input_fields,
    button_box,
    section_left_bank_details,
    button_guest,
  } = classes;

  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className={section_right_container}>
      <div className={section_left_bank_details}>
        <p className={info_text_lineNote_one}>3. Office Address</p>
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
                  label="City"
                  placeholder="City"
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
      <div className={section_left_bank_details}>
        <p className={info_text_lineNote_two}>4. Categories</p>
        <div className={input_fields}>
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
            multiple
            id="controllable-states-demo"
            options={options}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Categories"
                placeholder="Select Categories"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </div>
      </div>
      <Box className={button_box} fullWidth>
        <Link to={`/thankyou${"/buyer"}`}>
          <Button className={button_guest} onClick={() => handleClose()}>
            Submit
          </Button>
        </Link>
      </Box>
    </div>
  );
};
export default withStyles(styles)(BuyerKYCformSectionRight);
