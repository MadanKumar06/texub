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
  userfilter,
}) => {
  //accordion view for  filter by product
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [see1, setsee1] = useState(true);
  const [see2, setsee2] = useState(true);

  //slice filter data
  const [seeMoreData, setSeeMoreData] = useState({
    filter_by_brand: "",
    filter_by_product: "",
    filter_by_hub: "",
  });
  const [value, setValue] = useState([20, 37]);

  // price comma split
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

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
      if (userfilter?.max_price === 0 && userfilter?.min_price === 0) {
        setValue([
          dataFromApi?.[2]?.price?.min_price,
          dataFromApi?.[2]?.price?.max_price,
        ]);
      }
    }
  }, [dataFromApi]);

  useEffect(() => {
    // let userfilters = JSON.parse(localStorage.getItem("filters"));
    setProductFetchApi((prev) => ({
      ...prev,
      hub: userfilter?.hub_id,
      brand_id: userfilter?.brand_id,
      conditions: userfilter?.condition_id,
      min_price: userfilter?.min_price,
      max_price: userfilter?.max_price,
    }));
    if (userfilter?.max_price == 0 && userfilter?.min_price == 0) return;
    setValue([userfilter?.min_price, userfilter?.max_price]);
  }, [userfilter]);

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
              seeMoreData?.filter_by_hub?.map((item, index) => (
                <div className="map_container" key={index}>
                  <Checkbox
                    name="hub"
                    checked={
                      productFetchApi?.hub == item?.hub_id ? true : false
                    }
                    onChange={(e) => {
                      if (
                        productFetchApi?.hub === undefined ||
                        productFetchApi?.hub !== item?.hub_id
                      ) {
                        setProductFetchApi((prev) => ({
                          ...prev,
                          hub: item?.hub_id,
                        }));
                      } else if (productFetchApi?.hub === item?.hub_id) {
                        setProductFetchApi((prev) => ({
                          ...prev,
                          hub: "",
                        }));
                      }
                      setApplyFilter(!applyFilter);
                      setTimeout(() => {
                        handleSideBarClose("left", false);
                      }, 1000);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="filter_info">
                    <p>{item?.hub_name}</p>
                  </div>
                </div>
              ))}
            {dataFromApi?.[0]?.hub?.length > 5 && (
              <p
                className="seemore"
                onClick={() => seeMoreChange("filter_by_hub")}
              >
                see More
              </p>
            )}
          </div>
          <div className="filter_by_condtion filter_option_block">
            <p className="filter_title">Filter By Condition</p>
            {dataFromApi?.[1]?.conditions?.map((item, index) => (
              <div className="map_container" key={index}>
                <Checkbox
                  name="conditions"
                  checked={
                    productFetchApi?.conditions == item?.value ? true : false
                  }
                  onChange={(e) => {
                    if (
                      productFetchApi?.conditions === undefined ||
                      productFetchApi?.conditions !== item?.value
                    ) {
                      setProductFetchApi((prev) => ({
                        ...prev,
                        conditions: item?.value,
                      }));
                    } else if (productFetchApi?.conditions === item?.value) {
                      setProductFetchApi((prev) => ({
                        ...prev,
                        conditions: "",
                      }));
                    }
                    setApplyFilter(!applyFilter);
                    setTimeout(() => {
                      handleSideBarClose("left", false);
                    }, 1000);
                  }}
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
              seeMoreData?.filter_by_brand?.map((item, index) => (
                <div className="map_container" key={index}>
                  <Checkbox
                    name="brand_id"
                    checked={
                      productFetchApi?.brand_id == item?.value ? true : false
                    }
                    onChange={(e) => {
                      if (
                        productFetchApi?.brand_id === undefined ||
                        productFetchApi?.brand_id !== item?.value
                      ) {
                        setProductFetchApi((prev) => ({
                          ...prev,
                          brand_id: item?.value,
                        }));
                      } else if (productFetchApi?.brand_id === item?.value) {
                        setProductFetchApi((prev) => ({
                          ...prev,
                          brand_id: "",
                        }));
                      }
                      setApplyFilter(!applyFilter);
                      // setTimeout(() => {
                      //   handleSideBarClose("left", false);
                      // }, 1000);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <div className="filter_info">
                    <p>{item?.name}</p>
                    <p>({item?.count})</p>
                  </div>
                </div>
              ))}
            {/* </div> */}
            {dataFromApi?.[0]?.brands?.length > 5 && see1 && (
              <p
                className="seemore"
                onClick={() => {
                  setsee1(false);
                  seeMoreChange("filter_by_brand");
                }}
              >
                see More
              </p>
            )}
          </div>
          <div className="filter_by_price filter_option_block">
            <p className="filter_title">Filter By Price</p>
            <Button
              className="button-text btn-secondary apply"
              onClick={() => {
                setApplyFilter(!applyFilter);
                setTimeout(() => {
                  handleSideBarClose("left", false);
                }, 1000);
              }}
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
                  <span>
                    {" "}
                    {
                      JSON.parse(localStorage.getItem("currency"))
                        ?.currency_code
                    }
                  </span>
                  {formatToCurrency(parseInt(value?.[0]))}
                </p>
                <p>
                  <span>
                    {" "}
                    {
                      JSON.parse(localStorage.getItem("currency"))
                        ?.currency_code
                    }
                  </span>
                  {formatToCurrency(parseInt(value?.[1]))}
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
                        // checked={productFetchApi?.category_id == item?.value ? true : false}
                        name="category_id"
                        onChange={(e) => {
                          if (
                            productFetchApi?.category_id === undefined ||
                            productFetchApi?.category_id !== item?.value
                          ) {
                            setProductFetchApi((prev) => ({
                              ...prev,
                              category_id: item?.value,
                            }));
                          } else if (
                            productFetchApi?.category_id === item?.value
                          ) {
                            setProductFetchApi((prev) => ({
                              ...prev,
                              category_id: "",
                            }));
                          }
                          setApplyFilter(!applyFilter);
                          setTimeout(() => {
                            handleSideBarClose("left", false);
                          }, 1000);
                        }}
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
            {dataFromApi?.[3]?.categories?.length > 5 && see2 && (
              <p
                className="seemore"
                onClick={() => {
                  setsee2(false);
                  seeMoreChange("filter_by_product");
                }}
              >
                see More
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterViewList;
