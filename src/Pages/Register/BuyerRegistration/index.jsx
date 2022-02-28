import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
} from "@mui/material";
// import ReCAPTCHA from "react-google-recaptcha";
import Autocomplete from "@mui/material/Autocomplete";
import { Link, useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./styles";
const BuyerRegistration = ({ classes }) => {
  let { type } = useParams();
  let {
    main_container,
    input_fields,
    checkbox_label,
    button_guest,
    asterisk,
    input_textField,
    auto_complete_input,
    arrow_icon,
    button_box,
  } = classes;
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className={main_container}>
      <div className={input_fields}>
        <div className={input_textField}>
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
        </div>
        <div className={input_textField}>
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
            label="Mobile Number"
            fullWidth
            type="number"
            placeholder="Mobile Number"
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
        <div className={input_textField}>
          <TextField
            id="outlined-textarea"
            label="Landline Number"
            fullWidth
            type="number"
            placeholder="Landline Number"
            InputLabelProps={{
              shrink: true,
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
        </div>
        <div className={input_textField}>
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
          <TextField
            id="outlined-textarea"
            label="Company Name"
            fullWidth
            placeholder="Company Name"
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
        <div className={input_textField}>
          <TextField
            id="outlined-textarea"
            label="Designation"
            placeholder="Designation"
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
        <div className={input_textField}>
          <FormControlLabel
            value="yes"
            control={<Checkbox color="color_third" />}
            label="Remember Me"
            labelPlacement="end"
            className={checkbox_label}
          />
          {/* <ReCAPTCHA
            sitekey="6Le0EGYeAAAAAL8aEIUjrumsRsPKU56I_of9fQli"
          /> */}
        </div>

        <Box className={button_box} fullWidth>
          <Link to={`/thankyou/${type}`}>
            <Button className={button_guest}>Register</Button>
          </Link>
        </Box>
      </div>
      {/* <ArrowDropUp className={arrow_icon} /> */}
    </div>
  );
};
export default withStyles(styles)(BuyerRegistration);
