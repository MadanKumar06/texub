import React, { useState } from "react";
import "./styles.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel, TextField, Autocomplete } from "@mui/material";

function Index({
  checkselection,
  countincrease,
  i,
  deleterow,
  hubDropDownValues,
}) {
  const [hubList, setHubList] = useState({
    hub: "",
  });

  const [checkmumbai, setcheckmumbai] = useState();

  const handleChange = (value) => {
    setcheckmumbai(value);
  };
  const options = ["Option 1", "Option 2"];

  return (
    <>
      <div className="updateproduct__bgform">
        <div className="updateproduct_info_form autocomplete_input">
          <InputLabel>Hub</InputLabel>
          <Autocomplete
            value={hubList?.hub}
            name="hub_list"
            onChange={(event, newValue) => {
              setHubList((prevState) => ({
                ...prevState,
                conditions: newValue,
              }));
              handleChange(newValue);
            }}
            id="hub_list"
            disablePortal={true}
            options={hubDropDownValues?.length ? hubDropDownValues : [""]}
            getOptionLabel={(option) =>
              option.hub_name ? option.hub_name : ""
            }
            filterOptions={(options) => options}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                className="inputfield-box"
                placeholder="Select Hub"
                InputLabelProps={{
                  shrink: false,
                }}
              />
            )}
          />
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>Price</InputLabel>
          <div className="price_customize">
            <Autocomplete
              // value={test}
              name=""
              onChange={(event, newValue) => handleChange(newValue)}
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
                  fullWidth
                  placeholder="INR"
                  InputLabelProps={{
                    shrink: false,
                  }}
                />
              )}
            />
            <TextField
              id="part_number"
              name="part_nymber"
              placeholder="60,500"
              fullWidth
              type="number"
              autoFocus={true}
              className="inputfield-box price_textbox"
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
        <div className="updateproduct_info_form">
          <InputLabel>In Stock</InputLabel>
          <TextField
            id="part_number"
            name="part_nymber"
            className="inputfield-box"
            placeholder="280"
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
        <div className="updateproduct_info_form">
          <InputLabel>ETA (Days)</InputLabel>
          <TextField
            id="part_number"
            name="part_nymber"
            placeholder="05 Days"
            className="inputfield-box"
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
        <div className="updateproduct_info_form">
          <InputLabel>MOQ</InputLabel>
          <TextField
            id="part_number"
            name="part_nymber"
            className="inputfield-box"
            placeholder="50"
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

      {i === 0 ? (
        <div className="updateproduct__addmore">
          <p onClick={countincrease}>
            <span className="addmore__plus"></span>
            <span className="addmore__text">Add More</span>
          </p>
        </div>
      ) : (
        <div className="updateproduct__delete">
          <p onClick={() => deleterow(i)}>
            {/* <span className='addmore__plus'></span> */}
            <span className="addmore__text">
              <DeleteIcon />
            </span>
          </p>
        </div>
      )}

      {checkmumbai === "Option 1" && (
        <div className="updateproduct__gst">
          <div className="updateproduct_info_form">
            <InputLabel>GST %</InputLabel>
            <TextField
              id="gst"
              name="gst"
              placeholder="18"
              className="inputfield-box"
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
          <div className="updateproduct_info_form">
            <InputLabel>IGST %</InputLabel>
            <TextField
              id="igst"
              name="igst"
              placeholder="18"
              fullWidth
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
          <div className="updateproduct_info_form">
            <InputLabel>SGST %</InputLabel>
            <TextField
              id="sgst"
              name="sgst"
              placeholder="18"
              fullWidth
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
      )}
    </>
  );
}

export default Index;
