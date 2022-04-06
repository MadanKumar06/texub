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
}) {
  const [options, setoptions] = useState([]);
  const [currenthub, setcurrenthub] = useState();
  console.log(count);

  const hubselect = (e, value) => {
    count.filter((c) => {
      if (c.count === i) {
        c.hub_id = value.hub_id;
        c.hubname = value.hub_name;
        setcurrenthub(value.hub_id);
      }
    });
  };
  const priceselect = (value) => {
    let temp = count?.map((itm) => ({
      ...(itm.count === i && (itm.price: value)),
    }));
    setcount(temp);
  };
  console.log(count);
  const instockselect = (value) => {
    count.filter((c) => {
      if (c.count === i) {
        c.in_stock = value;
      }
    });
  };
  const etaselect = (value) => {
    count.filter((c) => {
      if (c.count === i) {
        c.eta = value;
      }
    });
  };
  const moqselect = (value) => {
    count.filter((c) => {
      if (c.count === i) {
        c.moq = value;
      }
    });
  };

  const currencyselect = (value) => {
    count.filter((c) => {
      if (c.count === i) {
        c.currency_id = value;
      }
    });
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

  return (
    <>
      <div className="updateproduct__bgform">
        <div className="updateproduct_info_form autocomplete_input">
          <InputLabel>Hub</InputLabel>
          <Autocomplete
            value={hubList}
            name="hub_list"
            onChange={(event, newValue) => hubselect(event, newValue)}
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
              onChange={(e) => currencyselect(e.target.value)}
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
              onChange={(e) => priceselect(e.target.value)}
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
            onChange={(e) => instockselect(e.target.value)}
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
            onChange={(e) => etaselect(e.target.value)}
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
            onChange={(e) => moqselect(e.target.value)}
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
