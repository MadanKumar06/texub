import React, { useState, useEffect } from "react";
import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";
import axios from "axios";
import Constant from "../../Constant";

export const Products = () => {
  const [productFetchApi, setProductFetchApi] = useState({});
  const [productData, setProductData] = useState({});

  useEffect(() => {
    if (productFetchApi) {
      // const fetchProductData = () => {
      // "data":
      // {
      // "currency_id":3,
      // "customer_id":0,
      // "category_id":"21,15",
      // "Brand_id":"0",
      // "hub_id":"0",
      // "condition_id":"0"
      // }
      //   axios
      //     .post(Constant.baseUrl() + "/getTexubProductId", {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     })
      //     .then((res) => {
      //       setProductData(res?.data);
      //     })
      //     .catch((err) => {});
      // };
      // fetchProductData();
    }
  }, [productFetchApi]);

  console.log(productFetchApi);
  return (
    <div className="products">
      <Productlists
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        productData={productData}
      />
      <Productsbrands
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        productData={productData}
      />
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
