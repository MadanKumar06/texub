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
} from "@mui/material";

import { Clear, ExpandMore } from "@mui/icons-material";
import {
  filter_by_condition,
  filter_by_product,
  filter_by_brand,
  filter_by_hub,
} from "./filteroptionJson";

const FilterViewList = ({ handleSideBarClose, dataFromApi }) => {
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
    let filterByBrand = filter_by_brand?.slice(0, 5);
    let filterByProduct = filter_by_product?.slice(0, 5);
    let filterByHub = filter_by_hub?.slice(0, 5);
    setSeeMoreData({
      filter_by_brand: filterByBrand,
      filter_by_product: filterByProduct,
      filter_by_hub: filterByHub,
    });
  }, []);

  const seeMoreChange = (event) => {
    let FilteredData =
      event === "filter_by_brand"
        ? filter_by_brand
        : event === "filter_by_product"
        ? filter_by_product
        : event === "filter_by_hub"
        ? filter_by_hub
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
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <div className="filterView_list_main">
      <Clear
        className="clear_btn"
        onClick={() => handleSideBarClose("left", false)}
      />
      <div className="filter_view_cards">
        <div className="sub_filter_view_cards">
          <div className="filter_by_condtion filter_option_block">
            <p className="filter_title">Filter By Condition</p>
            {dataFromApi?.[1]?.conditions?.map((item) => (
              <div className="map_container">
                <Checkbox
                  // checked={checked}
                  // onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <div className="filter_info">
                  <p>{item?.name}</p>
                  <p>({item?.value})</p>
                </div>
              </div>
            ))}
          </div>
          <div className="filter_by_brand filter_option_block">
            <p className="filter_title">Filter By Brand</p>
            {seeMoreData?.filter_by_brand?.length &&
              seeMoreData?.filter_by_brand?.map((item) => (
                <div className="map_container">
                  <Checkbox
                    // checked={checked}
                    // onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="filter_info">
                    <p>{item?.label}</p>
                    <p>({item?.value})</p>
                  </div>
                </div>
              ))}
            <p
              className="seemore"
              onClick={() => seeMoreChange("filter_by_brand")}
            >
              see More
            </p>
          </div>
          <div className="filter_by_price filter_option_block">
            <p className="filter_title">Filter By Price</p>
            <Box>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value}
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
                        // checked={checked}
                        // onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <div className="filter_info">
                        <p>{item?.label}</p>
                        <p>({item?.value})</p>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {item?.sub_product?.map((itm) => (
                      <Typography>{itm?.label}</Typography>
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
          <div className="filter_by_hub filter_option_block">
            <p className="filter_title">Filter By Hub</p>
            {seeMoreData?.filter_by_hub?.length &&
              seeMoreData?.filter_by_hub?.map((item) => (
                <div className="map_container">
                  <Checkbox
                    // checked={checked}
                    // onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="filter_info">
                    <p>{item?.label}</p>
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
        </div>
      </div>
    </div>
  );
};

export default FilterViewList;
