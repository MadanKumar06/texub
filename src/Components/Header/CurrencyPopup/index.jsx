import React, { useState, useEffect } from "react";
import styles from "./styles";

import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { withStyles } from "@mui/styles";
import { ExpandMore } from "@mui/icons-material";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";

// function starts
const CurrencyPopup = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [{ geo }, dispatch] = useStateValue();
  const [apiDropDowns, setApiDropDowns] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    currency_code: "",
    currency_id: "",
  });
  let { curreny_image } = classes;
  const navigate = useNavigate();

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
    localStorage.setItem(
      "selectedcurrency",
      JSON.stringify({
        currency_code: event?.currency_code,
        currency_id: event?.currency_id,
        currency_symbol: event.currency_symbol,
      })
    );
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

  const str = window.location.pathname;
  useEffect(() => {
    const storedata = JSON.parse(localStorage.getItem("storedata"));
    if (geo === "") return;
    const fetchCurrencyDropDownData = () => {
      let data = {
        geoCode: geo?.country_code,
        storeCode: str.split("/")[1]
          ? str.split("/")[1]?.toLowerCase()
          : geo?.country_name?.toLowerCase(),
      };
      axios
        .post(Constant.baseUrl() + "/getCurrency", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setApiDropDowns(res?.data?.[1]?.currency);
          localStorage.setItem(
            "storedata",
            JSON.stringify(res.data?.[0]?.store)
          );
          dispatch({
            type: "SET_CURRENCY_DATA",
            data: res?.data,
          });
          dispatch({
            type: "GEO__CUSTOM__NOTSTORE",
            data: res.data?.[0]?.store?.code,
          });
          if (
            str.split("/")[2] === "pendinginvoice" ||
            str.split("/")[2] === "pendinginvoice-download" ||
            str.split("/")[2] === "privacypolicy" ||
            str.split("/")[2] === "rrpolicy" ||
            str.split("/")[2] === "gdpr" ||
            str.split("/")[2] === "productlistingpolicy" ||
            str.split("/")[2] === "cookies-permission" ||
            str.split("/")[2] === "termsofuse" ||
            str.split("/")[2] === "buyerdashboard" ||
            str.split("/")[2] === "sellerdashboard" ||
            str.split("/")[2] === "checkout" ||
            str.split("/")[2] === "checkout-invoice" ||
            str.split("/")[2] === "ordersuccess" ||
            str.split("/")[2] === "view-order" ||
            str.split("/")[2] === "register" ||
            str.split("/")[2] === "resetpassword" ||
            str.split("/")[2] === "blogsdetails" ||
            str.split("/")[2] === "sellerprofile" ||
            (str.split("/")[2] === "thankyou" &&
              storedata?.code.toLowerCase() === str.split("/")[1].toLowerCase())
          ) {
          } else if (storedata?.code === str.split("/")[1]) {
            if (
              res.data?.[0]?.store?.code === str.split("/").pop().split("/")[0]
            ) {
              navigate(`/${res.data?.[0]?.store?.code}`);
            } else {
              navigate(
                `/${res.data?.[0]?.store?.code}/${
                  str.split("/").pop().split("/")[0]
                }`
              );
            }
          } else if (storedata?.code !== str.split("/")[1]) {
            navigate(`/${res.data?.[0]?.store?.code}`);
            // navigate(
            //   `/${
            //     str.split("/")[1]
            //       ? res.data?.[0]?.store?.code
            //       : geo?.country_name
            //   }`
            // );
          }
          let storedcurrency = JSON.parse(
            localStorage.getItem("selectedcurrency")
          );

          if (storedcurrency?.currency_code === "") {
            setSelectedValue({
              currency_code: res?.data?.[1]?.currency?.[0]?.currency_code,
              currency_id: res?.data?.[1]?.currency?.[0]?.currency_id,
              currency_symbol: res?.data?.[1]?.currency?.[0]?.currency_symbol,
            });
          } else {
            setSelectedValue({
              currency_code: storedcurrency?.currency_code,
              currency_id: storedcurrency?.currency_id,
              currency_symbol: storedcurrency?.currency_symbol,
            });
          }

          if (storedcurrency?.currency_code === "") {
            dispatch({
              type: "SET_CURRENCY",
              data: {
                currency_code: res?.data?.[1]?.currency?.[0]?.currency_code,
                currency_id: res?.data?.[1]?.currency?.[0]?.currency_id,
                currency_symbol: res?.data?.[1]?.currency?.[0]?.currency_symbol,
              },
            });
          } else {
            dispatch({
              type: "SET_CURRENCY",
              data: {
                currency_code: storedcurrency?.currency_code,
                currency_id: storedcurrency?.currency_id,
                currency_symbol: storedcurrency?.currency_symbol,
              },
            });
          }

          if (storedcurrency === null) {
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
          }
        })
        .catch((err) => {});
    };
    fetchCurrencyDropDownData();
  }, [geo]);

  return (
    <div className={classes.header_dropdown}>
      {apiDropDowns && (
        <>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
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
