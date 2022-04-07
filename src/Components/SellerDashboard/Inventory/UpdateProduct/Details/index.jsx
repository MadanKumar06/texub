import React, { useState, useEffect } from "react";
import "./styles.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
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

  const selectcurrency = (e, value) => {
    let temp = count.filter((c) => {
      if (c.count === i) {
        c.currency_id = value.value;
      }
    });
    settest(temp);
  };

  // const hubselect = (value) => {
  //   let data = JSON.parse(value)
  //     let temp = count.filter((c) => {
  //       if (c.count === i) {
  //         c.hub_id = data.value;
  //         c.hubname = data.name;
  //       }
  //     });
  //     settest(temp);
  // }

  const changevalues = (value, type) => {
    console.log(value);
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
        if (type === "sgst") {
          return (c.sgst = value);
        }
        if (type === "igst") {
          return (c.igst = value);
        }
        if (type === "cgst") {
          return (c.cgst = value);
        }
      }
    });
    settest(temp);
  };

  useEffect(async () => {
    let country_code = JSON.parse(
      localStorage.getItem("userdata")
    )?.custom_attributes?.find(
      (itm) => itm?.attribute_code === "customer_country"
    );
    try {
      const hubcurrencydata = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/hubBasedCurrency`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            hub_id: currenthub?.hub_id,
            country_code: country_code?.value,
          },
        },
      });
      let temp = [];
      hubcurrencydata?.data?.filter((hub) => {
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
    let temp = {
      hub_id: "",
      hub_name: "",
    };
    hubDropDownValues?.length &&
      hubDropDownValues.filter((wc) => {
        if (wc?.hub_id === currentdata?.hub_id) {
          temp.hub_id = wc.hub_id;
          temp.hub_name = wc.hub_name;
        }
      });
    setcurrenthub(temp);
  }, [currentdata?.hub_id]);

  const [currentcurrency, setcurrentcurrency] = useState([]);

  useEffect(() => {
    if (hubDropDownValues?.length === 0) return;
    let temp = {
      label: "",
      value: "",
    };
    options?.length &&
      options.filter((wc) => {
        if (wc?.value === currentdata?.currency_id) {
          temp.value = wc.value;
          temp.label = wc.label;
        }
      });
    console.log(temp);
    setcurrentcurrency(temp);
  }, [currentdata?.currency_id]);

  console.log(count);

  return (
    <>
      <div className="updateproduct__bgform">
        <div className="updateproduct_info_form autocomplete_input">
          {/* <select value={currenthub[0].hub_id} onChange={(e) => hubselect(e.target.value)}>
          <option value="">Select</option>
          {hubDropDownValues?.length && hubDropDownValues.map(hub => 
            // <option value={`{"name":"${hub.hub_name}","value":"${hub.hub_id}"}`}>{hub.hub_name}</option>
            <option value={hub.hub_id}>{hub.hub_name}</option>
          )}
        </select> */}
          <InputLabel>
            Hub<small className="asterisk">*</small>
          </InputLabel>
          <Autocomplete
            value={currenthub}
            name="currenthub"
            onChange={(event, newValue) => hubselect(event, newValue)}
            id="currenthub"
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
          <InputLabel>
            Price<small className="asterisk">*</small>
          </InputLabel>
          <div className="price_customize">
            <Autocomplete
              name=""
              id="controllable-states-demo"
              value={currentcurrency}
              options={options ? options : []}
              onChange={(event, newValue) => selectcurrency(event, newValue)}
              getOptionLabel={(option) => (option.label ? option.label : "")}
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
          <InputLabel>
            In Stock<small className="asterisk">*</small>
          </InputLabel>
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
          <InputLabel>
            ETA (Days)<small className="asterisk">*</small>
          </InputLabel>
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
          <InputLabel>
            MOQ<small className="asterisk">*</small>
          </InputLabel>
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

      {currentdata?.hub_id === "2" && (
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
              onChange={(e) => changevalues(e.target.value, "cgst")}
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
              onChange={(e) => changevalues(e.target.value, "igst")}
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
              onChange={(e) => changevalues(e.target.value, "sgst")}
              variant="outlined"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
