import React, { useState } from "react";
import "./styles.scss";

import { TextField, InputLabel, Autocomplete, Button } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

const WantToBuy = () => {
  const [wantTobuyData, setWantToBuyData] = useState({
    part_number: "",
    model_name_number: "",
    product_description: "",
    quantity: "",
    notes: "",
    hub: "",
    main_category: "",
  });
  const [dateChange, setDateChange] = useState(new Date());
  const handleChange = (newValue) => {
    setDateChange(newValue);
  };

  // input state and onchange events
  const handleFormvalue = (event) => {
    setWantToBuyData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    setInputValidation("");
    handleSwitchCase([event.target.name], event.target.value);
  };
  // input validation on onchange
  const [inputValidation, setInputValidation] = useState({
    part_number: "",
    model_name_number: "",
    quantity: "",
    main_category: "",
    closing_date: "",
  });

  const options = ["Option 1", "Option 2"];
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const handleSwitchCase = (fieldName, value) => {
    switch (fieldName[0]) {
      case "part_number":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            part_number: "Please enter the part number.",
          }));
        }
        break;
      case "model_name_number":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            model_name_number: "Please enter the model name/ number number.",
          }));
        }
        break;

      case "closing_date":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            closing_date: "Please select closing date.",
          }));
        } else if (value.toString() === "Invalid Date") {
          setInputValidation((prevState) => ({
            ...prevState,
            closing_date: "Please select valid date.",
          }));
        }
        break;
      case "quantity":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            quantity: "Please select the quantity.",
          }));
        }
        break;
      case "main_category":
        if (!value) {
          setInputValidation((prevState) => ({
            ...prevState,
            main_category: "Please select the main category.",
          }));
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="want_to_buy__container">
      <div className="want_to_buy__sub_container">
        <div className="block_1 input_block">
          <TextField
            id="part_number"
            label="Part number"
            fullWidth
            name="part_number"
            placeholder="R7-5700U"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            onChange={handleFormvalue}
            value={wantTobuyData?.part_number}
            variant="outlined"
          />
          <InputLabel className="validation_error">
            {inputValidation?.part_number}
          </InputLabel>
          <TextField
            id="model_name_number"
            label="Model Name/Number"
            fullWidth
            name="model_name_number"
            placeholder="Lenovo Dpin Yoga 6 Dpin"
            InputLabelProps={{
              shrink: true,
              required: true,
              classes: {
                asterisk: "asterisk",
              },
            }}
            value={wantTobuyData?.model_name_number}
            onChange={handleFormvalue}
            variant="outlined"
          />
          <InputLabel className="validation_error">
            {inputValidation?.model_name_number}
          </InputLabel>
        </div>
        <div className="block_2 input_block">
          <TextField
            id="product_description"
            label="Product Description"
            fullWidth
            multiline
            name="product_description"
            rows={5}
            placeholder="Product Description"
            InputLabelProps={{
              shrink: true,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            value={wantTobuyData?.product_description}
            onChange={handleFormvalue}
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
            <InputLabel className="validation_error">
              {inputValidation?.main_category}
            </InputLabel>
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
            <InputLabel className="validation_error">
              {inputValidation?.quantity}
            </InputLabel>
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
                minDate={new Date()}
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
            <InputLabel className="validation_error">
              {inputValidation?.closing_date}
            </InputLabel>
          </div>
        </div>
        <div className="block_4 input_block">
          <TextField
            id="notes"
            label="Notes"
            fullWidth
            placeholder="Notes"
            multiline
            rows={5}
            value={wantTobuyData?.notes}
            InputLabelProps={{
              shrink: true,
              // required: true,
              classes: {
                // asterisk: "asterisk",
              },
            }}
            onChange={handleFormvalue}
            name="notes"
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
