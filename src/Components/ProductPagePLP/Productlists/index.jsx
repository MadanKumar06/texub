import React, { useState, useEffect } from "react";
import "./styles.scss";

import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Box,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductFilterDrawer from "./ProductFilter";
import axios from "axios";
import Constant from "../../../Constant";

//Basic need
import todays_deal_active from "../../../Assets/BasicNeeded/PLPIcons/today_deal.png";
import todays_deal_inactive from "../../../Assets/BasicNeeded/PLPIcons/todays_deal_inactive.png";
import price_drop_active from "../../../Assets/BasicNeeded/PLPIcons/price_drop_active.png";
import price_drop_inactive from "../../../Assets/BasicNeeded/PLPIcons/price_drop_inactive.png";
import just_launch_active from "../../../Assets/BasicNeeded/PLPIcons/just_launch_active.png";
import just_launch_inactive from "../../../Assets/BasicNeeded/PLPIcons/just_launch_inactive.png";

const Productlists = ({ setProductFetchApi, productFetchApi }) => {
  // const [productlistdata, setProductlistdata] = useState({
  //   hub: "",
  //   conditions: "",
  //   eta: "",
  // });
  const [productlistdropdown, setProductlistdropdown] = useState({
    hub: [],
    conditions: [],
    eta: [],
  });
  const [filterHeaderImage, setFilterHeaderImage] = useState({
    today_deal: true,
    today_deal_image: todays_deal_active,
    just_launch: false,
    just_launch_image: just_launch_inactive,
    price_drop: false,
    price_drop_image: price_drop_inactive,
  });
  const handleChange = (event) => {
    setProductFetchApi((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleImageChange = (event) => {
    setFilterHeaderImage((prevState) => ({
      ...prevState,
      today_deal: event?.today_deal,
      today_deal_image: event?.today_deal
        ? todays_deal_active
        : todays_deal_inactive,
      just_launch: event?.just_launch,
      just_launch_image: event?.just_launch
        ? just_launch_active
        : just_launch_inactive,
      price_drop: event?.price_drop,
      price_drop_image: event?.price_drop
        ? price_drop_active
        : price_drop_inactive,
    }));
  };

  //API for fetch dropdown values
  useEffect(() => {
    var currency_id = JSON.parse(localStorage.getItem("currency"));
    const fetchProductListDropDownData = () => {
      let data = {
        currency_id: 3,
      };
      axios
        .post(Constant.baseUrl() + "/getSearchItemsInPlp", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res?.data?.length) {
            var object = Object.assign({}, ...res?.data);
            setProductlistdropdown(object);
          }
        })
        .catch((err) => {});
    };
    fetchProductListDropDownData();
  }, []);

  return (
    <div className="productlist">
      <div className="sidebar-toggle">
        <ProductFilterDrawer />
      </div>
      <div className="product_based_deals">
        <div className="productlist__deal">
          <div className="productlist__deal image">
            <img
              src={filterHeaderImage?.today_deal_image}
              alt=""
              className={
                filterHeaderImage?.today_deal === false && "image_opactity"
              }
              onClick={() =>
                handleImageChange({
                  today_deal: true,
                  price_drop: false,
                  just_launch: false,
                })
              }
            />
          </div>
          {filterHeaderImage?.today_deal && <span>Today's Deal</span>}
        </div>
        <div className="productlist__deal">
          <div className="productlist__down image">
            <img
              src={filterHeaderImage?.price_drop_image}
              alt=""
              onClick={() =>
                handleImageChange({
                  today_deal: false,
                  price_drop: true,
                  just_launch: false,
                })
              }
            />
          </div>
          {filterHeaderImage?.price_drop && <span>Price Drop</span>}
        </div>
        <div className="productlist__deal">
          <div className="productlist__up image">
            <img
              src={filterHeaderImage?.just_launch_image}
              alt=""
              onClick={() =>
                handleImageChange({
                  today_deal: false,
                  price_drop: false,
                  just_launch: true,
                })
              }
            />
          </div>
          {filterHeaderImage?.just_launch && <span>Just Launch</span>}
        </div>
      </div>
      <div className="productlist__search">
        <TextField
          size="small"
          placeholder="Search Products Here…"
          variant="standard"
          name="search_product"
          className="search_input"
          value={productFetchApi?.search_product}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="search_icon"></Search>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_hub">
          <InputLabel id="demo-simple-select-label">All Hubs</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productFetchApi?.hub}
            label="Hub"
            name="hub"
            onChange={handleChange}
          >
            {productlistdropdown?.hub?.length ? (
              productlistdropdown?.hub?.map((itm) => (
                <MenuItem value={itm?.hub_id}>{itm?.hub_name}</MenuItem>
              ))
            ) : (
              <MenuItem>No option</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_condition">
          <InputLabel id="demo-simple-select-label">All Conditions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productFetchApi?.conditions}
            label="Age"
            name="conditions"
            onChange={handleChange}
          >
            {productlistdropdown?.conditions?.length ? (
              productlistdropdown?.conditions?.map((itm) => (
                <MenuItem value={itm?.value}>{itm?.label}</MenuItem>
              ))
            ) : (
              <MenuItem>No option</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_price">
          <InputLabel id="demo-simple-select-label">ETA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productFetchApi?.eta}
            label="ETA"
            name="eta"
            onChange={handleChange}
          >
            {productlistdropdown?.eta?.length ? (
              productlistdropdown?.eta?.map((itm) => (
                <MenuItem value={itm}>{itm}</MenuItem>
              ))
            ) : (
              <MenuItem>No option</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>

      <div className="productlist__download">
        <svg
          id="Icon"
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 40 40"
        >
          <rect id="Area" width="40" height="40" fill="#fff" opacity="0" />
          <g id="Icon-2" data-name="Icon" transform="translate(4.5 4.5)">
            <path
              id="Path"
              d="M35.5,22.5v6a3.245,3.245,0,0,1-3.444,3H7.944a3.245,3.245,0,0,1-3.444-3v-6"
              transform="translate(-4.5 -0.5)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              id="Path-2"
              data-name="Path"
              d="M10.5,15,20,22.5,29.5,15"
              transform="translate(-4.5 -2.346)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <line
              id="Line"
              y1="18"
              transform="translate(15.5)"
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />{" "}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Productlists;
