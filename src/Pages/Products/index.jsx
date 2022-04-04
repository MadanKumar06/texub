import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";
import axios from "axios";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";
export const Products = () => {
  const [{ currency }, dispatch] = useStateValue();
  const [productFetchApi, setProductFetchApi] = useState({});
  const [productData, setProductData] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  let customer_id = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (productFetchApi || currency || getCategories) {
      const fetchProductData = () => {
        let data = {
          data: {
            currency_id: parseInt(currency?.currency_id),
            customer_id: customer_id?.id ? customer_id?.id : 0,
            category_id: productFetchApi?.category_id
              ? productFetchApi?.category_id
              : getCategories?.[0]?.category?.id,
            brand_id: productFetchApi?.brand_id
              ? productFetchApi?.brand_id
              : "0",
            hub_id: productFetchApi?.hub ? productFetchApi?.hub : "0",
            condition_id: productFetchApi?.conditions
              ? productFetchApi?.conditions
              : "0",
          },
        };
        setProductData([]);
        axios
          .post(Constant.baseUrl() + "/getProducts", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            sortCall(res?.data);
          })
          .catch((err) => {});
      };
      fetchProductData();
    }
  }, [productFetchApi, currency, getCategories]);

  useEffect(() => {
    const fetchCategoryData = () => {
      axios
        .get(Constant.baseUrl() + "/getCategoriesList", {
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
  }, []);
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
      />
      <Productsbrands
        setProductFetchApi={setProductFetchApi}
        productFetchApi={productFetchApi}
        getCategories={getCategories}
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
