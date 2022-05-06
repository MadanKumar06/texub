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
  count,
  hubname,
  currentdata,
  isDetailTabValid,
  setIsDetailTabValid,
  setcount,
  settest,
  inputValidation,
  setisGST
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
      hubcurrencydata?.data?.[0]?.currency_details?.filter((hub) => {
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

  const [currentcurrency, setcurrentcurrency] = useState([]);

  useEffect(() => {
    if(currentdata?.currency_id === "") return
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
    setcurrentcurrency(temp);
  }, [currentdata?.currency_id, options]);


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
            onChange={(event, newValue) => {
              setIsDetailTabValid((prevState) => ({
                ...prevState,
                isHubValid: "",
              }));
              hubselect(event, newValue);
            }}
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
          <InputLabel className="validation_error">
            {count?.slice(-1)?.[0]?.hub_id === currentdata?.hub_id &&
              isDetailTabValid?.isHubValid}
          </InputLabel>
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
              onChange={(event, newValue) => {
                setIsDetailTabValid((prevState) => ({
                  ...prevState,
                  isPriceValid: "",
                }));
                selectcurrency(event, newValue);
              }}
              getOptionLabel={(option) => (option.label ? option.label : "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="inputfield-box"
                  fullWidth
                  placeholder="curr"
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
              className="inputfield-box price_textbox"
              autoComplete="off"
             value={parseInt(currentdata.price)}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => {
                setIsDetailTabValid((prevState) => ({
                  ...prevState,
                  isPriceValid: "",
                }));
                changevalues(e.target.value, "price");
              }}
              variant="outlined"
            />
          </div>
          <InputLabel className="validation_error">
            {(count?.slice(-1)?.[0]?.price === currentdata?.price ||
              count?.slice(-1)?.[0]?.currency_id ===
                currentdata?.currency_id) &&
              isDetailTabValid?.isPriceValid}
          </InputLabel>
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
            type="number"
            autoComplete="off"
            value={currentdata?.in_stock}
            InputLabelProps={{
              shrink: false,
            }}
            onChange={(e) => {
              setIsDetailTabValid((prevState) => ({
                ...prevState,
                isInStockValid: "",
              }));
              changevalues(e.target.value, "instock");
            }}
            variant="outlined"
          />
          <InputLabel className="validation_error">
            {count?.slice(-1)?.[0]?.in_stock === currentdata?.in_stock &&
              isDetailTabValid?.isInStockValid}
          </InputLabel>
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>
            ETA (Days)<small className="asterisk">*</small>
          </InputLabel>
          <TextField
            id="part_number"
            name="part_nymber"
            type="number"
            placeholder="05"
            className="inputfield-box"
            fullWidth
            autoComplete="off"
            value={currentdata?.eta}
            InputLabelProps={{
              shrink: false,
            }}
            onChange={(e) => {
              setIsDetailTabValid((prevState) => ({
                ...prevState,
                isETAValid: "",
              }));
              changevalues(e.target.value, "eta");
            }}
            variant="outlined"
          />
          <InputLabel className="validation_error">
            {count?.slice(-1)?.[0]?.eta === currentdata?.eta &&
              isDetailTabValid?.isETAValid}
          </InputLabel>
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
            type="number"
            autoComplete="off"
            value={currentdata?.moq}
            InputLabelProps={{
              shrink: false,
            }}
            onChange={(e) => {
              setIsDetailTabValid((prevState) => ({
                ...prevState,
                isMoqValid: "",
              }));
              changevalues(e.target.value, "moq");
            }}
            variant="outlined"
          />
          <InputLabel className="validation_error">
            {count?.slice(-1)?.[0]?.moq === currentdata?.moq &&
              isDetailTabValid?.isMoqValid}
          </InputLabel>
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
      {currentdata?.hub_id === "2" && setisGST(2)}
      {currentdata?.hub_id === "2" ? (
        <div className="updateproduct__gst">
          <div className="updateproduct_info_form">
            <InputLabel>GST %</InputLabel>
            <TextField
              id="gst"
              name="gst"
              placeholder="18"
              type="number"
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
            <InputLabel className="validation_error">
              {count?.slice(-1)?.[0]?.cgst === currentdata?.cgst &&
                isDetailTabValid?.isCGSTValid}
            </InputLabel>
          </div>
          <div className="updateproduct_info_form">
            <InputLabel>IGST %</InputLabel>
            <TextField
              id="igst"
              name="igst"
              placeholder="18"
              fullWidth
              type="number"
              className="inputfield-box"
              autoComplete="off"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => changevalues(e.target.value, "igst")}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {count?.slice(-1)?.[0]?.igst === currentdata?.igst &&
                isDetailTabValid?.isIGSTValid}
            </InputLabel>
          </div>
          <div className="updateproduct_info_form">
            <InputLabel>SGST %</InputLabel>
            <TextField
              id="sgst"
              name="sgst"
              placeholder="18"
              fullWidth
              type="number"
              autoComplete="off"
              className="inputfield-box"
              // value={signInData?.email_address}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => changevalues(e.target.value, "sgst")}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {count?.slice(-1)?.[0]?.sgst === currentdata?.sgst &&
                isDetailTabValid?.isSGSTValid}
            </InputLabel>
          </div>
        </div>
      ) : ""}
    </>
  );
}

export default Index;
