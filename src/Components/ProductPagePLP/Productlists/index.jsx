import React, { useState } from "react";
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

//Basic need
import todays_deal_active from "../../../Assets/BasicNeeded/PLPIcons/today_deal.png";
import todays_deal_inactive from "../../../Assets/BasicNeeded/PLPIcons/todays_deal_inactive.png";
import price_drop_active from "../../../Assets/BasicNeeded/PLPIcons/price_drop_active.png";
import price_drop_inactive from "../../../Assets/BasicNeeded/PLPIcons/price_drop_inactive.png";
import just_launch_active from "../../../Assets/BasicNeeded/PLPIcons/just_launch_active.png";
import just_launch_inactive from "../../../Assets/BasicNeeded/PLPIcons/just_launch_inactive.png";

const Productlists = () => {
  const [productlistdropdown, setProductlistdropdown] = React.useState({
    hub: "",
    condition: "",
    price: "",
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
    setProductlistdropdown((prevState) => ({
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
  console.log(productlistdropdown);

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
          className="search_input"
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
            value={productlistdropdown?.hub}
            label="Age"
            name="hub"
            onChange={handleChange}
          >
            <MenuItem value={10}>sample hub 1</MenuItem>
            <MenuItem value={20}>sample hub 2</MenuItem>
            <MenuItem value={30}>sample hub 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_condition">
          <InputLabel id="demo-simple-select-label">All Conditions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productlistdropdown?.condition}
            label="Age"
            name="condition"
            onChange={handleChange}
          >
            <MenuItem value={10}>sample condition 1</MenuItem>
            <MenuItem value={20}>sample condtion 2</MenuItem>
            <MenuItem value={30}>sample condition 3</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_price">
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productlistdropdown?.price}
            label="Age"
            name="price"
            onChange={handleChange}
          >
            <MenuItem value={10}>sample price 1</MenuItem>
            <MenuItem value={20}>sample price 2</MenuItem>
            <MenuItem value={30}>sample price 3</MenuItem>
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />
            <path
              id="Path-2"
              data-name="Path"
              d="M10.5,15,20,22.5,29.5,15"
              transform="translate(-4.5 -2.346)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />
            <line
              id="Line"
              y1="18"
              transform="translate(15.5)"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />{" "}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Productlists;
