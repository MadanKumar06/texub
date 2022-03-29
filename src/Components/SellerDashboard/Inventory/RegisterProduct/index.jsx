import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  InputLabel,
  TextField,
  Autocomplete,
  Box,
  Button,
} from "@mui/material";
import "./styles.scss";

function RegisterProduct() {
  const options = ["Option 1", "Option 2"];
  return (
    <div className="registerproduct">
      <h1>Register New Product</h1>

      <div className="registerproducts__form">
        <div className="registerproducts_inputfields">
          <InputLabel>Name</InputLabel>
          <TextField
            id="name"
            name="name"
            placeholder="Enter Product Name"
            fullWidth
            autoFocus={true}
            autoComplete="off"
            // value={signInData?.email_address}
            className="inputfield-box"
            InputLabelProps={{
              shrink: false,
            }}
            // onChange={handleChangeInput}
            variant="outlined"
          />
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>Main Category</InputLabel>
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
                  className="inputfield-box"
                  placeholder="Select Main Category"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>Sub-Category</InputLabel>
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
                  className="inputfield-box"
                  placeholder="Select Sub-Catrgory"
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
          <div className="registerproducts_inputfields">
            <InputLabel>Brand</InputLabel>
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
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="inputfield-box"
                  placeholder="Brand"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>Model Number</InputLabel>
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
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="inputfield-box"
                  placeholder="Select Model Number"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="input_separator">
          <div className="registerproducts_inputfields">
            <InputLabel>Vendor / Manufacturer part Number</InputLabel>
            <TextField
              id="part_number"
              name="part_nymber"
              placeholder="DE-B-0089"
              fullWidth
              autoFocus={true}
              className="inputfield-box"
              autoComplete="off"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              // onChange={handleChangeInput}
              variant="outlined"
            />
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>UPC Number</InputLabel>
            <TextField
              id="upc_number"
              name="upc_number"
              placeholder="3604929017"
              fullWidth
              autoFocus={true}
              autoComplete="off"
              className="inputfield-box"
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
          <div className="registerproducts_inputfields">
            <InputLabel>HSN Code</InputLabel>
            <TextField
              id="hsn_code"
              name="hsn_code"
              placeholder="22348765"
              fullWidth
              autoFocus={true}
              autoComplete="off"
              className="inputfield-box"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              // onChange={handleChangeInput}
              variant="outlined"
            />
          </div>
          <div className="registerproducts_inputfields">
            <InputLabel>GST %</InputLabel>
            <TextField
              id="gst"
              name="gst"
              placeholder="18"
              fullWidth
              autoFocus={true}
              autoComplete="off"
              // value={signInData?.email_address}
              className="inputfield-box"
              InputLabelProps={{
                shrink: false,
              }}
              // onChange={handleChangeInput}
              variant="outlined"
            />
          </div>
        </div>
        <div className="registerproducts_inputfields">
          <InputLabel>Description</InputLabel>
          <TextField
            id="outlined-multiline-static_2"
            fullWidth
            multiline
            rows={5}
            className="inputfield-box"
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

      <div className="registerproduct__submit">
        <Link to="/sellerdashboard/inventory">
          <span className="registerproduct__back">Back</span>
        </Link>
        <Box>
          <Link to="/sellerdashboard/registersuccess">
            <Button className="button-text btn-secondary registerproduct__submitbutton">
              Submit
            </Button>
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default RegisterProduct;
