import React, { useState, useEffect } from "react";
import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";
import { Button } from "@mui/material";
export const Products = () => {
  const [{ currency, homeSearch }, dispatch] = useStateValue();
  const [productFetchApi, setProductFetchApi] = useState({});
  const [productData, setProductData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [getCategories, setGetCategories] = useState([]);

  const [applyFilter, setApplyFilter] = useState(false);
  let customer_id = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    if (getCategories && currency?.currency_id) {
      const fetchProductData = () => {
        setProductData([]);
        let data;
        data = {
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
          },
        };
        axios
          .post(Constant.baseUrl() + "/getProducts", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
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

  return (
    <div className="products">
      <Productlists
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        dataFromApi={dataFromApi}
        setApplyFilter={setApplyFilter}
        applyFilter={applyFilter}
      />
      <Productsbrands
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        getCategories={getCategories}
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
      <div className="products_want_to_buy">
        <p>
          <span>Want to buy</span>
        </p>
      </div>
    </div>
  );
};
