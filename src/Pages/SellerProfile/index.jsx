import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import Constant from "../../Constant";
import { Button } from "@mui/material";

import { useParams } from "react-router-dom";
import { useStateValue } from "../../store/state";

import Productlists from "../../Components/SellerProfileDetails/Productlists";
import Productstable from "../../Components/SellerProfileDetails/Producttable";

const Index = () => {
  const { id, seller_id } = useParams();
  const [serllerProfileList, setSellerProfileList] = useState([]);
  const [{ currency, homeSearch }, dispatch] = useStateValue();
  const [productFetchApi, setProductFetchApi] = useState({});
  const [productData, setProductData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);

  useEffect(() => {
    let data = {
      sellercode: id,
    };
    axios
      .post(Constant.baseUrl() + "/getSellerList", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSellerProfileList(res?.data);
      })
      .catch((error) => {});
  }, []);

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
            seller_id: seller_id,
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
  return (
    <div className="sellerprofile">
      <div className="sellerprofile__bg">
        <div className="sellerprofile__sidebar">
          <ul>
            <li className="bgcolor1">
              <p className="sellerprofile__label">Seller Code</p>
              <p className="sellerprofile__value">{id}</p>
            </li>
            <li className="bgcolor2">
              <p className="sellerprofile__label">Seller Country</p>
              <p className="sellerprofile__value">
                {serllerProfileList?.[0]?.seller_country}
              </p>
            </li>
            <li className="bgcolor3">
              <p className="sellerprofile__label">Total Products</p>
              <p className="sellerprofile__value">
                {serllerProfileList?.[0]?.product_count}
              </p>
            </li>
            <li className="bgcolor4">
              <p className="sellerprofile__label">Completed Orders</p>
              <p className="sellerprofile__value">
                {serllerProfileList?.[0]?.placed_order_count}
              </p>
            </li>
          </ul>
        </div>
        <div className="products">
          <Productlists
            setProductFetchApi={setProductFetchApi}
            productFetchApi={productFetchApi}
            dataFromApi={dataFromApi}
            setApplyFilter={setApplyFilter}
            applyFilter={applyFilter}
            productData={productData}
          />
          <Productstable
            setProductFetchApi={setProductFetchApi}
            productFetchApi={productFetchApi}
            productData={productData}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
