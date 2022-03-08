import React, { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
import Details from "./Details";

function Index({ type }) {
  const [count, setcount] = useState([0]);
  const [test, settest] = useState(1);

  const countincrease = () => {
    settest(test + 1);
    count.push(test);
  };

  const deleterow = (value) => {
    setcount(count.filter((item, i) => i !== value));
  };
  const options = ["Option 1", "Option 2"];
  return (
    <div className="updateproduct">
      <h1>{type}</h1>

      <div className="updateproduct__topform">
        {count.map((data, i) => (
          <div className="topform__details">
            <Details
              key={i}
              countincrease={countincrease}
              i={i}
              deleterow={deleterow}
            />
          </div>
        ))}
      </div>

      <div className="updateproduct__specifications">
        <div className="updateproduct__form">
          <div className="input_separator">
            <div className="updateproduct_inputfields info ">
              <InputLabel>Conditions</InputLabel>
              <Autocomplete
                //   value={value}
                name=""
                //   onChange={(event, newValue) => {
                //     setValue(newValue);
                //   }}
                //   className={auto_complete_input}
                //   inputValue={inputValue}
                //   onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                //   }}
                id="controllable-states-demo"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Select Condition"
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Warranty Type</InputLabel>
              <Autocomplete
                //   value={value}
                name=""
                //   onChange={(event, newValue) => {
                //     setValue(newValue);
                //   }}
                //   className={auto_complete_input}
                //   inputValue={inputValue}
                //   onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                //   }}
                id="controllable-states-demo"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Warranty Type"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="input_separator">
            <div className="updateproduct_inputfields info">
              <InputLabel>Warranty Days</InputLabel>
              <TextField
                id="part_number"
                name="part_nymber"
                placeholder="90 Days"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                // value={signInData?.email_address}
                InputLabelProps={{
                  shrink: false,
                }}
                // onChange={handleChangeInput}
                variant="outlined"
              />
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Packing Details</InputLabel>
              <TextField
                id="upc_number"
                name="upc_number"
                placeholder="2 Days"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                // value={signInData?.email_address}
                InputLabelProps={{
                  shrink: false,
                }}
                // onChange={handleChangeInput}
                variant="outlined"
              />
            </div>
          </div>
          <div className="input_separator">
            <div className="updateproduct_inputfields info">
              <InputLabel>Dimensions</InputLabel>
              <TextField
                id="hsn_code"
                name="hsn_code"
                placeholder="Length | Width | Height | Weight"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                // value={signInData?.email_address}
                InputLabelProps={{
                  shrink: false,
                }}
                // onChange={handleChangeInput}
                variant="outlined"
              />
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Restrictions</InputLabel>
              <TextField
                id="gst"
                name="gst"
                placeholder="Yes"
                fullWidth
                autoFocus={true}
                autoComplete="off"
                // value={signInData?.email_address}
                InputLabelProps={{
                  shrink: false,
                }}
                // onChange={handleChangeInput}
                variant="outlined"
              />
            </div>
          </div>
          <div className="input_separator">
            <div className="updateproduct_inputfields info">
              <InputLabel>Region</InputLabel>
              <Autocomplete
                //   value={value}
                name=""
                //   onChange={(event, newValue) => {
                //     setValue(newValue);
                //   }}
                //   className={auto_complete_input}
                //   inputValue={inputValue}
                //   onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                //   }}
                id="controllable-states-demo"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    placeholder="Select Region"
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
            </div>
            <div className="updateproduct_inputfields info">
              <InputLabel>Country</InputLabel>
              <Autocomplete
                //   value={value}
                name=""
                //   onChange={(event, newValue) => {
                //     setValue(newValue);
                //   }}
                //   className={auto_complete_input}
                //   inputValue={inputValue}
                //   onInputChange={(event, newInputValue) => {
                //     setInputValue(newInputValue);
                //   }}
                id="controllable-states-demo"
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Country"
                    fullWidth
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="updateproduct_inputfields info">
            <InputLabel>Special Notes</InputLabel>
            <TextField
              id="outlined-multiline-static_2"
              fullWidth
              multiline
              rows={5}
              InputLabelProps={{
                shrink: false,
                // required: true,
                classes: {
                  // asterisk: "asterisk",
                },
              }}
              variant="outlined"
            />
          </div>
        </div>
      </div>

      <div className="updateproduct__buttons">
        <Link to="/sellerdashboard/inventory">
          <span className="updateproduct__back">Back</span>
        </Link>
        <Link
          to={`${
            type === "Add Product Details"
              ? "/sellerdashboard/updatesuccess"
              : "/sellerdashboard/addsuccess"
          }`}
        >
          <p className="updateproduct__submit">Submit</p>
        </Link>
      </div>
    </div>
  );
}

export default Index;
