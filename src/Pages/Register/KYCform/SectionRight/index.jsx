import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import Autocomplete from "@mui/material/Autocomplete";
import OfficeAddressDetails from "./OfficeAddressDetails";
const BuyerKYCformSectionRight = ({ classes, handleClose }) => {
  let { type } = useParams();
  let {
    section_right_container,
    info_text_lineNote_two,
    auto_complete_input,
    input_fields,
    button_box,
    button_guest,
  } = classes;

  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className={section_right_container}>
      <OfficeAddressDetails />
      <div>
        <p className={info_text_lineNote_two}>Categories</p>
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
        <Link to={`/thankyou/${type}`}>
          <Button className={button_guest} onClick={() => handleClose()}>
            <span>Submit</span>
          </Button>
        </Link>
      </Box>
    </div>
  );
};
export default withStyles(styles)(BuyerKYCformSectionRight);
