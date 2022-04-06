import React, { useState, useEffect } from "react";
import "./styles.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
import Subdetails from "./Subdetails";
import axios from "axios";
import Constant from "../../../../../Constant";

function Index({
  countincrease,
  i,
  index,
  deleterow,
  hubDropDownValues,
  hubList,
  setpdetails,
  count,
  hubname,
  currentdata,
  setcount,
  settest,
}) {
  const [options, setoptions] = useState([]);
  const [currenthub, setcurrenthub] = useState("");

  const hubselect = (e, value) => {
    let temp = count.filter((c) => {
      if (c.count === i) {
        c.hub_id = value.hub_id;
        c.hubname = value.hub_name;
      }
    });
    settest(temp);
  };
  const changevalues = (value, type) => {
    let temp = count.filter((c) => {
      if (c.count === i) {
        if (type === "price") {
          return (c.price = value);
        }
        if (type === "instock") {
          return (c.in_stock = value);
        }
        if (type === "eta") {
          return (c.eta = value);
        }
        if (type === "moq") {
          return (c.moq = value);
        }
        if (type === "currency") {
          return (c.currency_id = value);
        }
      }
    });
    settest(temp);
  };

  useEffect(async () => {
    try {
      const hubcurrencydata = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/hubBasedCurrency`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            hub_id: currenthub,
            country_code: "IN",
          },
        },
      });
      let temp = [];
      hubcurrencydata.data.filter((hub) => {
        temp.push({
          label: hub?.currency_code,
          value: hub?.currency_id,
        });
      });
      setoptions(temp);
    } catch (e) {
      console.log(e);
    }
  }, [currenthub]);

  useEffect(() => {
    if (hubDropDownValues?.length === 0) return;
    let temp = [];
    hubDropDownValues?.length &&
      hubDropDownValues.filter((wc) => {
        if (wc?.hub_id === currentdata?.hub_id) {
          temp.push(wc);
        }
      });
    setcurrenthub(temp);
  }, [hubDropDownValues]);

  console.log(currentdata);
  console.log(hubDropDownValues);

  console.log("currenthub", currenthub);

  return (
    <>
      <div className="updateproduct__bgform">
        <div className="updateproduct_info_form autocomplete_input">
          <InputLabel>Hub</InputLabel>
          <Autocomplete
            value={currenthub}
            name="hub_list"
            onChange={(event, newValue) => hubselect(event, newValue)}
            id="hub_list"
            disablePortal={true}
            options={hubDropDownValues ? hubDropDownValues : []}
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
              onChange={(e) => changevalues(e.target.value, "currency")}
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
              id="price"
              name="price"
              placeholder="60,500"
              fullWidth
              type="number"
              autoFocus={true}
              className="inputfield-box price_textbox"
              autoComplete="off"
              value={parseInt(currentdata.price).toFixed(2)}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => changevalues(e.target.value, "price")}
              variant="outlined"
            />
          </div>
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>In Stock</InputLabel>
          <TextField
            id="in_stock"
            name="in_stock"
            className="inputfield-box"
            placeholder="280"
            fullWidth
            autoFocus={true}
            autoComplete="off"
            value={currentdata?.in_stock}
            InputLabelProps={{
              shrink: false,
            }}
            onChange={(e) => changevalues(e.target.value, "instock")}
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
            value={currentdata?.eta}
            InputLabelProps={{
              shrink: false,
            }}
            onChange={(e) => changevalues(e.target.value, "eta")}
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
            value={currentdata?.moq}
            InputLabelProps={{
              shrink: false,
            }}
            onChange={(e) => changevalues(e.target.value, "moq")}
            variant="outlined"
          />
        </div>
      </div>

      {index === 0 ? (
        <div className="updateproduct__addmore">
          <p onClick={countincrease}>
            <span className="addmore__plus"></span>
            <span className="addmore__text">Add More</span>
          </p>
        </div>
      ) : (
        <div className="updateproduct__delete">
          <p onClick={() => deleterow(currentdata?.assign_id, index)}>
            {/* <p onClick={() => console.log(i)}> */}
            <span className="addmore__text">
              <DeleteIcon />
            </span>
          </p>
        </div>
      )}

      {hubname === "Mumbai" && <Subdetails setpdetails={setpdetails} />}
    </>
  );
}

export default Index;
