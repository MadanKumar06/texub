import React, { useState, useEffect } from "react";
import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";
import axios from "axios";
import Constant from "../../Constant";

export const Products = () => {
  const [productFetchApi, setProductFetchApi] = useState({});
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    if (productFetchApi) {
      debugger;
      var currencyId = JSON.parse(localStorage.getItem("currency"));
      var customer_id = JSON.parse(localStorage.getItem("userdata"));
      const fetchProductData = () => {
        let data = {
          data: {
            currency_id: parseInt(currencyId?.currency_id),
            customer_id: customer_id?.id,
            category_id: "21",
            brand_id: productFetchApi?.brand_id
              ? productFetchApi?.brand_id
              : "0",
            hub_id: productFetchApi?.hub ? productFetchApi?.hub : "0",
            condition_id: productFetchApi?.conditions
              ? productFetchApi?.conditions
              : "0",
          },
        };

        axios
          .post(Constant.baseUrl() + "/getProducts", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            // setProductData(res?.data?.[0]);
            sortCall(res?.data?.[0]);
          })
          .catch((err) => {});
      };
      fetchProductData();
    }
  }, [productFetchApi]);

  const sortCall = (data) => {
    var productTableData = [];
    data?.map((itm) => {
      if (itm.subProducts?.length) {
        var temp =
          itm?.subProducts?.length &&
          itm?.subProducts?.sort((a, b) => {
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
          mainproduct: { ...itm.mainProduct },
          subProducts: [...temp],
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
      />
      <Productsbrands
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
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
