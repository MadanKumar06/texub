import React, { useState, useEffect } from "react";
import "./styles.scss";
import {
  Box,
  Checkbox,
  Slider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
  Button,
} from "@mui/material";

import { Clear, ExpandMore } from "@mui/icons-material";
const FilterViewList = ({
  handleSideBarClose,
  dataFromApi,
  setProductFetchApi,
  setApplyFilter,
  applyFilter,
  productFetchApi,
}) => {
  //accordion view for  filter by product
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //slice filter data
  const [seeMoreData, setSeeMoreData] = useState({
    filter_by_brand: "",
    filter_by_product: "",
    filter_by_hub: "",
  });

  useEffect(() => {
    if (dataFromApi?.length) {
      let filterByBrand = dataFromApi?.[0]?.brands?.slice(0, 5);
      let filterByProduct = dataFromApi?.[3]?.categories?.slice(0, 5);
      let filterByHub = dataFromApi?.[4]?.hub?.slice(0, 5);
      setSeeMoreData({
        filter_by_brand: filterByBrand,
        filter_by_product: filterByProduct,
        filter_by_hub: filterByHub,
      });

      setValue([
        dataFromApi?.[2]?.price?.min_price,
        dataFromApi?.[2]?.price?.max_price,
      ]);
    }
  }, [dataFromApi]);

  const seeMoreChange = (event) => {
    let FilteredData =
      event === "filter_by_brand"
        ? dataFromApi?.[0]?.brands
        : event === "filter_by_product"
        ? dataFromApi?.[3]?.categories
        : event === "filter_by_hub"
        ? dataFromApi?.[4]?.hub
        : null;
    setSeeMoreData((prevState) => ({
      ...prevState,
      [event]: FilteredData,
    }));
  };

  // filter by price
  const [value, setValue] = useState([20, 37]);
  function valuetext(value) {
    return `${value}`;
  }
  const minDistance = 10;
  const handleChange = (event, newValue, activeThumb) => {
    setProductFetchApi((prev) => ({
      ...prev,
      min_price: newValue[0],
      max_price: newValue[1],
    }));
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  const handleChangeChecbox = (event) => {
    setProductFetchApi((prev) => ({
      ...prev,
      [event.e.target.name]: event?.value,
    }));
    setApplyFilter(!applyFilter);
    setTimeout(() => {
      handleSideBarClose("left", false);
    }, 1000);
  };
  return (
    <div className="filterView_list_main">
      <Clear
        className="clear_btn"
        onClick={() => handleSideBarClose("left", false)}
      />
      <div className="filter_view_cards">
        <div className="sub_filter_view_cards">
          <div className="filter_by_hub filter_option_block">
            <p className="filter_title">Filter By Hub</p>
            {seeMoreData?.filter_by_hub?.length &&
              seeMoreData?.filter_by_hub?.map((item) => (
                <div className="map_container">
                  <Checkbox
                    name="hub"
                    // checked={productFetchApi?.hub}
                    onChange={(e) =>
                      handleChangeChecbox({ e, value: item?.hub_id })
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="filter_info">
                    <p>{item?.hub_name}</p>
                  </div>
                </div>
              ))}
            <p
              className="seemore"
              onClick={() => seeMoreChange("filter_by_hub")}
            >
              see More
            </p>
          </div>
          <div className="filter_by_condtion filter_option_block">
            <p className="filter_title">Filter By Condition</p>
            {dataFromApi?.[1]?.conditions?.map((item) => (
              <div className="map_container">
                <Checkbox
                  name="conditions"
                  // checked={productFetchApi?.conditions}
                  onChange={(e) =>
                    handleChangeChecbox({ e, value: item?.value })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
                <div className="filter_info">
                  <p>{item?.name}</p>
                  <p>({item?.count})</p>
                </div>
              </div>
            ))}
          </div>
          <div className="filter_by_brand filter_option_block">
            <p className="filter_title">Filter By Brand</p>
            {/* <div className="filter_scroll"> */}
            {seeMoreData?.filter_by_brand?.length &&
              seeMoreData?.filter_by_brand?.map((item) => (
                <div className="map_container">
                  <Checkbox
                    name="brand_id"
                    // checked={productFetchApi?.brand_id}
                    onChange={(e) =>
                      handleChangeChecbox({ e, value: item?.value })
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="filter_info">
                    <p>{item?.name}</p>
                    <p>({item?.count})</p>
                  </div>
                </div>
              ))}
            {/* </div> */}
            <p
              className="seemore"
              onClick={() => seeMoreChange("filter_by_brand")}
            >
              see More
            </p>
          </div>
          <div className="filter_by_price filter_option_block">
            <p className="filter_title">Filter By Price</p>
            <Button
              className="button-text btn-secondary apply"
              onClick={() => setApplyFilter(!applyFilter)}
            >
              Apply
            </Button>
            <Box>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value}
                min={dataFromApi?.[2]?.price?.min_price}
                max={dataFromApi?.[2]?.price?.max_price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
              <div className="filter_amount">
                <p>
                  <span>INR</span>
                  {value?.[0]}
                </p>
                <p>
                  <span>INR</span>
                  {value?.[1]}
                </p>
              </div>
            </Box>
          </div>
          <div className="filter_by_product filter_option_block">
            <p className="filter_title">Filter By Product</p>
            {seeMoreData?.filter_by_product?.length &&
              seeMoreData?.filter_by_product?.map((item, index) => (
                <Accordion
                  expanded={expanded === index}
                  onChange={handleAccordionChange(index)}
                  className="accordion_filter"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      sx={{ width: "33%", flexShrink: 0 }}
                      // className={classes.heading_accordion}
                    >
                      <Checkbox
                        // checked={productFetchApi?.category_id}
                        name="category_id"
                        onChange={(e) =>
                          handleChangeChecbox({ e, value: item?.id })
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <div className="filter_info">
                        <p>{item?.category?.category_name}</p>
                        <p>({item?.category?.count})</p>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item?.subcategories?.map((itm) => (
                      <Typography> {itm?.category_name}</Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            <p
              className="seemore"
              onClick={() => seeMoreChange("filter_by_product")}
            >
              see More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterViewList;
