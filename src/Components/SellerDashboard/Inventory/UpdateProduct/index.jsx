import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
import Details from "./Details";

import axios from "axios";
import Constant from "../../../../Constant";

function Index({ type }) {
  const [count, setcount] = useState([0]);
  const [test, settest] = useState(1);
  const [openTextbox, setOpenTextbox] = useState(false);

  const countincrease = () => {
    settest(test + 1);
    count.push(test);
  };

  const [dropdownListFromApi, setDropdownListFromApi] = useState({
    dropDownList: [],
  });

  const [updateProductList, setUpdateProductList] = useState({});
  //Api to fetch dropdown values
  useEffect(() => {
    const fetchMainCategoryData = () => {
      axios
        .get(Constant.baseUrl() + "/getUpdateProductDetails", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setDropdownListFromApi((prevState) => ({
            ...prevState,
            dropDownList: Object.assign({}, ...res?.data),
          }));
        })
        .catch((err) => {});
    };
    fetchMainCategoryData();
  }, []);
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
              hubDropDownValues={dropdownListFromApi?.dropDownList?.hub_list}
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
                value={updateProductList?.conditions}
                disablePortal={true}
                name="conditions"
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    conditions: newValue,
                  }));
                }}
                id="conditions"
                options={dropdownListFromApi?.dropDownList?.condition_list}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
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
                value={updateProductList?.warranty_type}
                name="warranty_type"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    conditions: newValue,
                  }));
                  if (newValue?.label === "Direct Vendor Warranty In Country") {
                    setOpenTextbox(true);
                  } else {
                    setOpenTextbox(false);
                  }
                }}
                id="warranty_type"
                options={dropdownListFromApi?.dropDownList?.warranty_type}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
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
          {openTextbox && (
            <div className="input_separator country_selection">
              <div className="updateproduct_inputfields ">
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
                      placeholder="Select countries"
                      fullWidth
                      InputLabelProps={{
                        shrink: false,
                      }}
                    />
                  )}
                />
              </div>
            </div>
          )}
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
                className="inputfield-box"
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
              <Autocomplete
                value={updateProductList?.packing_details}
                name="packing_details"
                disablePortal={true}
                onChange={(event, newValue) => {
                  setUpdateProductList((prevState) => ({
                    ...prevState,
                    packing: newValue,
                  }));
                }}
                id="packing_details"
                options={dropdownListFromApi?.dropDownList?.packing_details}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="inputfield-box"
                    placeholder="Select Packing Details"
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
              <InputLabel>Dimensions</InputLabel>
              <div className="dimensions_input">
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="Length"
                  fullWidth
                  autoComplete="off"
                  // value={signInData?.email_address}
                  className="inputfield-box length_field"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  // onChange={handleChangeInput}
                  variant="outlined"
                />
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder=" Width"
                  fullWidth
                  autoComplete="off"
                  className="inputfield-box width_field"
                  // value={signInData?.email_address}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  // onChange={handleChangeInput}
                  variant="outlined"
                />
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="Height"
                  fullWidth
                  autoComplete="off"
                  className="inputfield-box height_field"
                  // value={signInData?.email_address}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  // onChange={handleChangeInput}
                  variant="outlined"
                />
                <TextField
                  id="hsn_code"
                  name="hsn_code"
                  placeholder="Weight"
                  className="inputfield-box weight_field"
                  fullWidth
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
            <div className="updateproduct_inputfields info">
              <InputLabel>Restrictions</InputLabel>
              <TextField
                id="gst"
                name="gst"
                placeholder="Yes"
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
          </div>
          <div className="updateproduct_inputfields info">
            <InputLabel>Special Notes</InputLabel>
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
