import React, { useState, useEffect } from "react";
import { Button, IconButton, Paper, InputBase } from "@mui/material";
import "./styles.scss";

import { InputLabel, FormControl, Select, MenuItem, Box } from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductFilterDrawer from "./ProductFilter";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import XlsxFileDownload from "./XlsxFileDownloader";

//Basic need
import todays_deal_active from "../../../Assets/BasicNeeded/PLPIcons/today_deal.png";
import todays_deal_inactive from "../../../Assets/BasicNeeded/PLPIcons/todays_deal_inactive.png";
import price_drop_active from "../../../Assets/BasicNeeded/PLPIcons/price_drop_active.png";
import price_drop_inactive from "../../../Assets/BasicNeeded/PLPIcons/price_drop_inactive.png";
import just_launch_active from "../../../Assets/BasicNeeded/PLPIcons/just_launch_active.png";
import just_launch_inactive from "../../../Assets/BasicNeeded/PLPIcons/just_launch_inactive.png";

const Productlists = ({
  setProductFetchApi,
  productFetchApi,
  dataFromApi,
  setApplyFilter,
  applyFilter,
  productData,
}) => {
  console.log(productFetchApi?.hub);
  useEffect(() => {
    if (productFetchApi?.hub === "") {
      window.location.reload();
    }
  }, [productFetchApi?.hub]);
  const [{ homeSearch, currency }, dispatch] = useStateValue();
  const [productlistdropdown, setProductlistdropdown] = useState({
    hub: [],
    conditions: [],
    eta: [],
  });
  const [filterHeaderImage, setFilterHeaderImage] = useState({
    today_deal: false,
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
  useEffect(() => {
    if (homeSearch !== "") {
      setProductFetchApi((prev) => ({
        ...prev,
        search_product: homeSearch,
      }));
    }
  }, [homeSearch]);
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
        currency_id: currency_id?.currency_id,
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
  }, [currency]);

  const handleSearchClick = (event) => {
    debugger;
    event.preventDefault();
    setApplyFilter(!applyFilter);
  };
  return (
    <div className="productlist">
      
      
      <div className="productlist__search_seller">
        <Paper
          component="form"
          className="search_input"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Products Here…"
            name="search_product"
            id="search_product"
            onChange={handleChange}
            inputProps={{ "aria-label": "" }}
            value={productFetchApi?.search_product}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            className="plpsearchicon"
            aria-label="search"
            onClick={(event) => handleSearchClick(event)}
          >
            <Search className="search_icon" />
          </IconButton>
        </Paper>
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
                <MenuItem value={itm?.label}>{itm?.label}</MenuItem>
              ))
            ) : (
              <MenuItem>No option</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <div className="apply-btn">
        <Button
          className="button-text btn-primary clear plp-apply-btn"
          onClick={() => setApplyFilter(!applyFilter)}
        >
          Apply
        </Button>
      </div>

      <div className="productlist__download">
        <XlsxFileDownload productData={productData} />
      </div>
    </div>
  );
};

export default Productlists;
