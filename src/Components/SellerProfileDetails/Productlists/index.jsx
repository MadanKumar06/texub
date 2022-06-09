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
  // useEffect(() => {
  //   if (productFetchApi?.hub === "") {
  //     window.location.reload();
  //   }
  // }, [productFetchApi?.hub]);
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
  var currency_id = JSON.parse(localStorage.getItem("currency"));
  useEffect(() => {
    if (currency_id?.currency_id) {
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
    }
  }, [currency]);

  /* useEffect(() => {
    if (productlistdropdown) {
      setProductFetchApi((prev) => ({
        ...prev,
        hub: productlistdropdown?.hub[0]?.value,
        conditions: productlistdropdown?.conditions?.[0]?.value,
        eta: productlistdropdown?.eta?.[0]?.value,
      }));
    }
  }, [productlistdropdown]); */

  const [updatedFilterProducts,setupdatedFilterProducts] = useState({})
  const [updateDropdowns,setupdateDropdowns] = useState(false)
  useEffect(()=>{
    const updatedData = window.localStorage.getItem("filterProductsDropdown_seller_profile")
    setupdatedFilterProducts(JSON.parse(updatedData))
  },[updateDropdowns])
  const updateProductFilterDrop = ()=>{
    window.localStorage.setItem("filterProductsDropdown_seller_profile",JSON.stringify(productFetchApi))
  }
  const [isUpdated,setisUpdated] = useState(false)
  useEffect(()=>{
    setTimeout(() => {
      setisUpdated(true)
    }, 0);
  },[])
  useEffect(() => {
    if(updatedFilterProducts?.hub>0 || updatedFilterProducts?.conditions>0 || updatedFilterProducts?.eta>0){
      setProductFetchApi((prev) => ({
        ...prev,
        conditions:updatedFilterProducts?.conditions,
        eta:updatedFilterProducts?.eta,
        hub:updatedFilterProducts?.hub,
      }));
    }else{
      setProductFetchApi((prev) => ({
        ...prev,
        hub: productlistdropdown?.hub[0]?.value,
        conditions: productlistdropdown?.conditions?.[0]?.value,
        eta: productlistdropdown?.eta?.[0]?.value,
      }));
    }
    }, [productlistdropdown]);

  const handleSearchClick = (event) => {
    event.preventDefault();
    setApplyFilter(!applyFilter);
  };
  
  return (
    <div className="productlist">
      <div className="productlist__search">
        <Paper
          component="form"
          className="search_input"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center",minWidth: 550  }}
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

      <Box sx={{ minWidth: 250 }} className="seller_box_info">
        <FormControl fullWidth className="product_dropdown_hub">
          <InputLabel id="demo-simple-select-label">Hubs</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isUpdated===true?productFetchApi?.hub:0}   
            label="Hub"
            name="hub"
            defaultValue="0"
            onChange={handleChange}
          >
            {productlistdropdown?.hub?.length ? (
              productlistdropdown?.hub?.map((itm) => (
                <MenuItem value={itm?.value}>{itm?.label}</MenuItem>
              ))
            ) : (
              <MenuItem>No option</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 250 }} className="seller_box_info">
        <FormControl fullWidth className="product_dropdown_condition">
          <InputLabel id="demo-simple-select-label">Conditions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isUpdated===true?productFetchApi?.conditions:0}
            label="Age"
            defaultValue="0"
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
      <Box sx={{ minWidth: 250 }}  className="eta_field seller_box_info">
        <FormControl fullWidth className="product_dropdown_price">
          <InputLabel id="demo-simple-select-label">ETA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isUpdated===true?productFetchApi?.eta:0}
            label="ETA"
            defaultValue="0"
            name="eta"
            onChange={handleChange}
          >
            {productlistdropdown?.eta?.length ? (
              productlistdropdown?.eta?.map((itm) => (
                <MenuItem value={itm?.value}>{itm?.label}</MenuItem>
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
          onClick={() =>{
            setApplyFilter(!applyFilter)
            updateProductFilterDrop()
             setupdateDropdowns(!updateDropdowns)
          }}
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
