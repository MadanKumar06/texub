import React, { useState, useEffect } from "react";
import styles from "./styles";

import { Button, Menu, MenuItem } from "@mui/material";
import { withStyles } from "@mui/styles";
import { ExpandMore } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
// import { useParams } from "react-router-dom";

import aed from "../../../Assets/CommonImage/Currency switcher/DH.png";
import usd from "../../../Assets/CommonImage/Currency switcher/dollar-symbol.png";
import inr from "../../../Assets/CommonImage/Currency switcher/Group 1132.png";

const CurrencyPopup = ({ classes }) => {
  // let { country } = useParams();
  // console.log(country)
  const [anchorEl, setAnchorEl] = useState(null);
  const [{geo, customstore}, dispatch] = useStateValue();
  const [apiDropDowns, setApiDropDowns] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    currency_code: "",
    currency_id: "",
  });
  let { curreny_image } = classes;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    setSelectedValue({
      currency_code: event?.currency_code,
      currency_id: event?.currency_id,
      currency_symbol: event.currency_symbol,
    });
    dispatch({
      type: "SET_CURRENCY",
      data: event,
    });
    setAnchorEl(null);
  };

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(selectedValue));
  }, [selectedValue]);
  //API for fetch dropdown values
  useEffect(() => {
    // debugger
    console.log(customstore)
    console.log(geo?.country_name)
    if(geo === '' && customstore === '') return
    const fetchCurrencyDropDownData = () => {
      let data = {
        geoCode:geo?.country_code,
        storeCode: customstore ? customstore : geo?.country_name
      }
      axios
        .post(Constant.baseUrl() + "/getCurrency", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })  
        .then((res) => {
          setApiDropDowns(res?.data?.[1]?.currency);
          console.log(res.data?.[0]?.store)
          localStorage.setItem('storedata', JSON.stringify(res.data?.[0]?.store))
          setSelectedValue({
            currency_code: res?.data?.[1]?.currency?.[0]?.currency_code,
            currency_id: res?.data?.[1]?.currency?.[0]?.currency_id,
            currency_symbol: res?.data?.[1]?.currency?.[0]?.currency_symbol,
          });
          dispatch({
            type: "SET_CURRENCY",
            data: {
              currency_code: res?.data?.[1]?.currency?.[0]?.currency_code,
              currency_id: res?.data?.[1]?.currency?.[0]?.currency_id,
              currency_symbol: res?.data?.[1]?.currency?.[0]?.currency_symbol,
            },
          });
        })
        .catch((err) => {});
    };
    fetchCurrencyDropDownData();
  }, [geo, customstore]);


  return (
    <div className={classes.header_dropdown}>
      {apiDropDowns && (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            {/* <img src={selectedValue?.image} alt="" /> */}
            <p className={curreny_image}>{selectedValue?.currency_symbol}</p>
            {selectedValue?.currency_code}
            <ExpandMore />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menulist_item}
          >
            {apiDropDowns?.map((item) => (
              <MenuItem
                name="name"
                key={item?.currency_code}
                onClick={(e) => handleChange(item)}
              >
                {/* <img src={item?.image} alt="" /> */}
                <p className={curreny_image}>{item?.currency_symbol}</p>
                {item?.currency_code}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};
export default withStyles(styles)(CurrencyPopup);
