import React, { useState, useEffect } from "react";
import "./styles.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
import Subdetails from './Subdetails'

function Index({
  key,
  countincrease,
  i,
  deleterow,
  hubDropDownValues,
  setHubList,
  hubList,
  checkmumbai,
  checkhub,
  setpdetails,
  pdetails,
  setcount,
  count
}) {

  const options = ["INR", "USD"];

  useEffect(() => {
      count.filter(c => {
        if(c.count === i) {
          c.pdata = pdetails
        }
      })
  }, [pdetails])

  

  return (
    <>
      <div className="updateproduct__bgform">
        <div className="updateproduct_info_form autocomplete_input">
          <InputLabel>Hub</InputLabel>
          <Autocomplete
            value={hubList}
            name="hub_list"
            onChange={(event, newValue) => {
              setpdetails((prevState) => ({
                ...prevState,
                hub_id: newValue.hub_id,
              }));
              checkhub(newValue, i);
            }}
            id="hub_list"
            disablePortal={true}
            options={hubDropDownValues}
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
              name=""
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
              onChange={(e) => setpdetails(data => ({
                ...data,
                price: e.target.value
              }))}
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
            onChange={(e) => setpdetails(data => ({
              ...data,
              in_stock: e.target.value
            }))}
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
            onChange={(e) => setpdetails(data => ({
              ...data,
              eta: e.target.value
            }))}
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
            onChange={(e) => setpdetails(data => ({
              ...data,
              moq: e.target.value
            }))}
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

      {checkmumbai?.hub_name === "Mumbai" && (
        <Subdetails setpdetails={setpdetails} />
      )}
    </>
  );
}

export default Index;

