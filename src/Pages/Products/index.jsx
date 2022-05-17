import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";

export const Products = () => {
  const navigate = useNavigate();
  const [{ currency, homeSearch, customnostore, geo }, dispatch] =
    useStateValue();
  const [productFetchApi, setProductFetchApi] = useState({
    hub: 0,
    conditions: 0,
    eta: 0,
    brand_id: 0,
  });
  const [productData, setProductData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);

  let customer_id = JSON.parse(localStorage.getItem("userdata"));
  const [userfilter, setuserfilter] = useState();

  useEffect(() => {
    if (getCategories && currency?.currency_id) {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const fetchProductData = () => {
        setProductData([]);
        let data = {
          data: {
            currency_id: parseInt(currency?.currency_id),
            customer_id: customer_id?.id ? customer_id?.id : 0,
            category_id: productFetchApi?.category_id
              ? productFetchApi?.category_id
              : getCategories?.[0]?.category?.id
              ? getCategories?.[0]?.category?.id
              : 0,
            brand_id: productFetchApi?.brand_id
              ? productFetchApi?.brand_id
              : "0",
            hub_id: productFetchApi?.hub ? productFetchApi?.hub : "0",
            condition_id: productFetchApi?.conditions
              ? productFetchApi?.conditions
              : "0",
            keyword: productFetchApi?.search_product
              ? productFetchApi?.search_product
              : "",
            eta: productFetchApi?.eta ? productFetchApi?.eta : "0",
            min_price: productFetchApi?.min_price
              ? productFetchApi?.min_price
              : 0,
            max_price: productFetchApi?.max_price
              ? productFetchApi?.max_price
              : 0,
            seller_id: "0",
            todays_deal: productFetchApi?.today_deal
              ? productFetchApi?.today_deal
              : 0,
            price_drop: productFetchApi?.price_drop
              ? productFetchApi?.price_drop
              : 0,
            new_product: productFetchApi?.just_launch
              ? productFetchApi?.just_launch
              : 0,
            details: 0,
          },
        };
        axios
          .post(Constant.baseUrl() + "/getProducts", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setuserfilter(res?.data?.[2]?.filterArray);
            sortCall(res?.data?.[1]?.products);
            setDataFromApi(res?.data?.[0]?.layered);
            dispatch({
              type: "SET_IS_LOADING",
              value: false,
            });
          })
          .catch((err) =>
            dispatch({
              type: "SET_IS_LOADING",
              value: false,
            })
          );
      };
      fetchProductData();
    }
  }, [currency, getCategories, homeSearch, applyFilter]);

  useEffect(() => {
    if (userfilter === undefined) return;
    if (
      localStorage.getItem("filters") == "undefined" ||
      !localStorage.getItem("filters")
    ) {
      localStorage.setItem("filters", JSON.stringify(userfilter));
    } else {
      let currentfilter = JSON.parse(localStorage.getItem("filters"));
      if (JSON.stringify(userfilter) !== JSON.stringify(currentfilter)) {
        if (
          userfilter?.hub_id == "0" &&
          userfilter?.condition_id == "0" &&
          userfilter?.brand_id == "0" &&
          userfilter?.eta == "0"
        )
          return;
        localStorage.setItem("filters", JSON.stringify(userfilter));
        setProductFetchApi({
          hub: userfilter?.hub_id,
          conditions: userfilter?.condition_id,
          eta: userfilter?.eta,
          brand_id: userfilter?.brand_id,
        });
      }
    }
  }, [userfilter]);

  useEffect(() => {
    if (currency?.currency_id) {
      const fetchCategoryData = () => {
        let data = {
          currency_id: parseInt(currency?.currency_id),
        };
        axios
          .post(Constant.baseUrl() + "/getCategoriesList", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setGetCategories(res?.data);
          })
          .catch((err) => {});
      };
      fetchCategoryData();
    }
  }, [currency]);
  const sortCall = (data) => {
    var productTableData = [];
    data?.map((itm) => {
      if (itm.sub_products?.length) {
        var temp =
          itm?.sub_products?.length &&
          itm?.sub_products?.sort((a, b) => {
            let fa = a.price,
              fb = b.price;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
        productTableData.push({
          main_product: { ...itm.main_product },
          sub_products: [...temp],
        });
      }
    });
    setProductData(productTableData);
  };
  const handleRouteChange = () => {
    navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wanttobuy`
    );
  };
  return (
    <div className="products">
      <Productlists
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        dataFromApi={dataFromApi}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
        productData={productData}
      />
      <Productsbrands
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        getCategories={getCategories}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
      />
      <div className="clear-btn">
        <Button
          className="button-text btn-primary clear"
          onClick={() => {
            setProductFetchApi((prev) => ({
              ...prev,
              conditions: "",
              eta: "",
              hub: "",
              search_product: "",
              brand_id: "",
              category_id: "",
            }));
            setApplyFilter(!applyFilter);
            dispatch({
              type: "SET_SEARCH",
              value: "",
            });
          }}
        >
          Clear All
        </Button>
      </div>
      <Productstable
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        productData={productData}
      />
      {JSON.parse(localStorage.getItem("userdata"))?.group_id === 5 && (
        <div className="products_want_to_buy">
          <p onClick={() => handleRouteChange()}>
            <span>Want to buy</span>
          </p>
        </div>
      )}
    </div>
  );
};
