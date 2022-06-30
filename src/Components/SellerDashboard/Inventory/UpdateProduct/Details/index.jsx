import React, { useState, useEffect } from "react";
import "./styles.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import { InputLabel, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import Constant from "../../../../../Constant";
import { SessionExpiredLogout } from "../../../../../utilities";

function Index({
  countincrease,
  i,
  index,
  deleterow,
  hubDropDownValues,
  count,
  currentdata,
  isDetailTabValid,
  setIsDetailTabValid,
  settest,
}) {
  const [options, setoptions] = useState([]);
  const [currenthub, setcurrenthub] = useState(null);
  const [isGstVatValid, setIsGstVatValid] = useState({});

  const hubselect = (e, value) => {
    let temp = count?.filter((c) => {
      if (c.count === i) {
        c.hub_id = value?.hub_id;
        c.hubname = value?.hub_name;
      }
    });
    settest(temp);
  };

  const selectcurrency = (e, value) => {
    if (value === "") {
      let temp = count?.filter((c) => {
        if (c.count === i) {
          c.currency_id = null;
        }
      });
      settest(temp);
    } else {
      let temp = count?.filter((c) => {
        if (c.count === i) {
          c.currency_id = value?.value;
        }
      });
      settest(temp);
    }
  };
  const changevalues = (value, type) => {
    let temp = count?.filter((c) => {
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
        if (type === "vat_value") {
          return (c.vat_value = value);
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
    if (currenthub?.hub_id) {
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
        count?.filter((c) => {
          if (c.count === i) {
            c.isGstVatValid = hubcurrencydata?.data?.[0].gst_vat;
          }
        });
        setIsGstVatValid(hubcurrencydata?.data?.[0].gst_vat);
        setoptions(temp);
      } catch (e) {
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    }
  }, [currenthub]);

  const [currentcurrency, setcurrentcurrency] = useState([]);
  useEffect(() => {
    if (currentdata?.currency_id === "") return;
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
              selectcurrency(event, "");
            }}
            id={`${"currenthub" + index}`}
            disablePortal={true}
            options={hubDropDownValues ? hubDropDownValues : []}
            getOptionLabel={(option) =>
              option.hub_name ? option.hub_name : ""
            }
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
            {isDetailTabValid?.length
              ? isDetailTabValid?.filter(
                  (itm) =>
                    itm?.ind === index && Object.keys(itm)?.[0] === "isHubValid"
                )?.[0]?.isHubValid
              : ""}
          </InputLabel>
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>
            Price<small className="asterisk">*</small>
          </InputLabel>
          <div className="price_customize">
            <Autocomplete
              name=""
              id={`${"price_currency" + index}`}
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
              id={`${"price" + index}`}
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
            {isDetailTabValid?.length
              ? isDetailTabValid?.filter(
                  (itm) =>
                    itm?.ind === index &&
                    Object.keys(itm)?.[0] === "isPriceValid"
                )?.[0]?.isPriceValid
              : ""}
          </InputLabel>
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>
            In Stock<small className="asterisk">*</small>
          </InputLabel>
          <TextField
            id={`${"in_stock" + index}`}
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
            {isDetailTabValid?.length
              ? isDetailTabValid?.filter(
                  (itm) =>
                    itm?.ind === index &&
                    Object.keys(itm)?.[0] === "isInStockValid"
                )?.[0]?.isInStockValid
              : ""}
          </InputLabel>
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>
            ETA (Days)<small className="asterisk">*</small>
          </InputLabel>
          <TextField
            id={`${"eta_field" + index}`}
            name="part_nymber"
            type="number"
            placeholder="05"
            className="inputfield-box"
            fullWidth
            autoComplete="off"
            value={parseInt(currentdata?.eta)}
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
            {isDetailTabValid?.length
              ? isDetailTabValid?.filter(
                  (itm) =>
                    itm?.ind === index && Object.keys(itm)?.[0] === "isETAValid"
                )?.[0]?.isETAValid
              : ""}
          </InputLabel>
        </div>
        <div className="updateproduct_info_form">
          <InputLabel>
            MOQ<small className="asterisk">*</small>
          </InputLabel>
          <TextField
            id={`${"moq_field" + index}`}
            name="part_nymber"
            className="inputfield-box"
            placeholder="50"
            fullWidth
            type="number"
            autoComplete="off"
            value={parseInt(currentdata?.moq)}
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
            {isDetailTabValid?.length
              ? isDetailTabValid?.filter(
                  (itm) =>
                    itm?.ind === index && Object.keys(itm)?.[0] === "isMoqValid"
                )?.[0]?.isMoqValid
              : ""}
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
      {isGstVatValid == 1 ? (
        <div className="updateproduct__gst">
          <div className="updateproduct_info_form">
            <InputLabel>CGST %</InputLabel>
            <TextField
              id={`${"gst" + index}`}
              name="gst"
              placeholder="18"
              type="number"
              className="inputfield-box"
              fullWidth
              autoComplete="off"
              value={parseInt(currentdata?.cgst)}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => {
                setIsDetailTabValid((prevState) => ({
                  ...prevState,
                  isCGSTValid: "",
                }));
                changevalues(e.target.value, "cgst");
              }}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {isDetailTabValid?.length
                ? isDetailTabValid?.filter(
                    (itm) =>
                      itm?.ind === index &&
                      Object.keys(itm)?.[0] === "isCGSTValid"
                  )?.[0]?.isCGSTValid
                : ""}
            </InputLabel>
          </div>
          <div className="updateproduct_info_form">
            <InputLabel>IGST %</InputLabel>
            <TextField
              id={`${"igst" + index}`}
              name="igst"
              placeholder="18"
              fullWidth
              type="number"
              className="inputfield-box"
              autoComplete="off"
              value={parseInt(currentdata?.igst)}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => {
                setIsDetailTabValid((prevState) => ({
                  ...prevState,
                  isIGSTValid: "",
                }));
                changevalues(e.target.value, "igst");
              }}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {isDetailTabValid?.length
                ? isDetailTabValid?.filter(
                    (itm) =>
                      itm?.ind === index &&
                      Object.keys(itm)?.[0] === "isIGSTValid"
                  )?.[0]?.isIGSTValid
                : ""}
            </InputLabel>
          </div>
          <div className="updateproduct_info_form">
            <InputLabel>SGST %</InputLabel>
            <TextField
              id={`${"sgst" + index}`}
              name="sgst"
              placeholder="18"
              fullWidth
              type="number"
              autoComplete="off"
              className="inputfield-box"
              value={parseInt(currentdata?.sgst)}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => {
                setIsDetailTabValid((prevState) => ({
                  ...prevState,
                  isSGSTValid: "",
                }));
                changevalues(e.target.value, "sgst");
              }}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {isDetailTabValid?.length
                ? isDetailTabValid?.filter(
                    (itm) =>
                      itm?.ind === index &&
                      Object.keys(itm)?.[0] === "isSGSTValid"
                  )?.[0]?.isSGSTValid
                : ""}
            </InputLabel>
          </div>
        </div>
      ) : isGstVatValid == 2 ? (
        <div className="updateproduct__gst">
          <div className="updateproduct_info_form">
            <InputLabel>VAT %</InputLabel>
            <TextField
              id={`${"vat_value" + index}`}
              name="vat_value"
              placeholder="18"
              type="number"
              className="inputfield-box"
              fullWidth
              autoComplete="off"
              value={parseInt(currentdata?.vat_value)}
              InputLabelProps={{
                shrink: false,
              }}
              onChange={(e) => {
                setIsDetailTabValid((prevState) => ({
                  ...prevState,
                  isVatValid: "",
                }));
                changevalues(e.target.value, "vat_value");
              }}
              variant="outlined"
            />
            <InputLabel className="validation_error">
              {isDetailTabValid?.length
                ? isDetailTabValid?.filter(
                    (itm) =>
                      itm?.ind === index &&
                      Object.keys(itm)?.[0] === "isVatValid"
                  )?.[0]?.isVatValid
                : ""}
            </InputLabel>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Index;
