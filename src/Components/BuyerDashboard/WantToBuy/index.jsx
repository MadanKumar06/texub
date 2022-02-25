import React from "react";
import "./styles.scss";

import { TextField, Autocomplete, Button } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

const WantToBuy = () => {
  const [dateChange, setDateChange] = React.useState(new Date());

  const handleChange = (newValue) => {
    setDateChange(newValue);
  };
  const options = ["Option 1", "Option 2"];
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div className="want_to_buy__container">
      <div className="want_to_buy__sub_container">
        <div className="block_1 input_block">
          <TextField
            id="outlined-textarea_1"
            label="Part number"
            fullWidth
            placeholder="R7-5700U"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />

          <TextField
            id="outlined-textarea_2"
            label="Model Name/Number"
            fullWidth
            placeholder="Lenovo Dpin Yoga 6 Dpin"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>
        <div className="block_2 input_block">
          <TextField
            id="outlined-multiline-static_1"
            label="Product Description"
            fullWidth
            multiline
            rows={5}
            placeholder="Product Description"
            InputLabelProps={{
              shrink: true,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>
        <div className="block_3 input_block">
          <div className="input_field">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              fullWidth
              className="auto_complete_input"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Main Category"
                  placeholder="Main Category"
                  InputLabelProps={{
                    shrink: true,
                    required: true,
                    classes: {
                      asterisk: "asterisk",
                    },
                  }}
                />
              )}
            />
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              fullWidth
              className="auto_complete_input"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Quantity"
                  placeholder="Select Quantity"
                  InputLabelProps={{
                    shrink: true,
                    required: true,
                    classes: {
                      asterisk: "asterisk",
                    },
                  }}
                />
              )}
            />
          </div>

          <div className="input_field">
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              id="controllable-states-demo"
              options={options}
              fullWidth
              className="auto_complete_input"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hub"
                  placeholder="Select Hub"
                  InputLabelProps={{
                    shrink: true,
                    // required: true,
                    classes: {
                      // asterisk: "asterisk",
                    },
                  }}
                />
              )}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Closing Date"
                inputFormat="MM/dd/yyyy"
                value={dateChange}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Select Closing Date"
                    InputLabelProps={{
                      shrink: true,
                      required: true,
                      classes: {
                        asterisk: "asterisk",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="block_4 input_block">
          <TextField
            id="outlined-multiline-static_2"
            label="Notes"
            fullWidth
            placeholder="Notes"
            multiline
            rows={5}
            InputLabelProps={{
              shrink: true,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className="want_to_buy__footer">
        <div className="want_to_buy__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          <Button className="want_to_buy_btn">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default WantToBuy;
