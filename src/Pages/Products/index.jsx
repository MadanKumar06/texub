import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";
import Constant from "../../Constant";
import { useStateValue } from "../../store/state";
import Helmet from "react-helmet";
import todays_deal_active from "../../Assets/BasicNeeded/PLPIcons/today_deal.png";
import price_drop_inactive from "../../Assets/BasicNeeded/PLPIcons/price_drop_inactive.png";
import just_launch_inactive from "../../Assets/BasicNeeded/PLPIcons/just_launch_inactive.png";

export const Products = () => {
  const navigate = useNavigate();
  const history = useLocation();
  const [filterHeaderImage, setFilterHeaderImage] = useState({
    today_deal: false,
    today_deal_image: todays_deal_active,
    just_launch: false,
    just_launch_image: just_launch_inactive,
    price_drop: false,
    price_drop_image: price_drop_inactive,
  });
  const [
    { currency, homeSearch, plp_categories, customnostore, geo },
    dispatch,
  ] = useStateValue();
  const [productFetchApi, setProductFetchApi] = useState({
    hub: 0,
    conditions: 0,
    eta: 0,
    brand_id: 0,
  });
  const [productData, setProductData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);

  let customer_id = JSON.parse(localStorage.getItem("userdata"));
  const [userfilter, setuserfilter] = useState();

  useEffect(() => {
    if (plp_categories && currency?.currency_id) {
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
            category_id:
              history?.state?.name === "category_id"
                ? history?.state?.value
                : productFetchApi?.category_id
                ? productFetchApi?.category_id
                : plp_categories?.[0]?.category?.id
                ? plp_categories?.[0]?.category?.id
                : 0,
            brand_id:
              history?.state?.name === "brand_id"
                ? history?.state?.value
                : productFetchApi?.brand_id
                ? productFetchApi?.brand_id
                : "0",
            hub_id:
              history?.state?.name === "hub_id"
                ? history?.state?.value
                : productFetchApi?.hub
                ? productFetchApi?.hub
                : "0",
            condition_id:
              history?.state?.name === "condition_id"
                ? history?.state?.value
                : productFetchApi?.conditions
                ? productFetchApi?.conditions
                : "0",
            keyword:
              homeSearch !== ""
                ? homeSearch
                : productFetchApi?.search_product
                ? productFetchApi?.search_product
                : "",
            eta:
              history?.state?.name === "eta"
                ? history?.state?.value
                : productFetchApi?.eta
                ? productFetchApi?.eta
                : "0",
            min_price: productFetchApi?.min_price
              ? productFetchApi?.min_price
              : 0,
            max_price: productFetchApi?.max_price
              ? productFetchApi?.max_price
              : 0,
            seller_id: "0",
            todays_deal:
              history?.state?.name === "todays_deal"
                ? history?.state?.value
                : productFetchApi?.today_deal
                ? productFetchApi?.today_deal
                : 0,
            price_drop:
              history?.state?.name === "price_drop"
                ? history?.state?.value
                : productFetchApi?.price_drop
                ? productFetchApi?.price_drop
                : 0,
            new_product:
              history?.state?.name === "new_product"
                ? history?.state?.value
                : productFetchApi?.just_launch
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
            userFilterDataStore(res?.data?.[2]?.filterArray);
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
  }, [currency, plp_categories, homeSearch, applyFilter]);

  const userFilterDataStore = (storeData) => {
    // debugger;
    // if (
    //   localStorage.getItem("filters") == "undefined" ||
    //   !localStorage.getItem("filters")
    // ) {
    //   localStorage.setItem("filters", JSON.stringify(storeData));
    //   debugger;
    // } else {
    // }
  };

  // useEffect(() => {
  //   if (userfilter === undefined) return;
  //   if (
  //     localStorage.getItem("filters") == "undefined" ||
  //     !localStorage.getItem("filters")
  //   ) {
  //     localStorage.setItem("filters", JSON.stringify(userfilter));
  //   } else {
  //     let currentfilter = JSON.parse(localStorage.getItem("filters"));
  //     if (JSON.stringify(userfilter) !== JSON.stringify(currentfilter)) {
  //       if (
  //         userfilter?.hub_id == "0" &&
  //         userfilter?.condition_id == "0" &&
  //         userfilter?.brand_id == "0" &&
  //         userfilter?.eta == "0"
  //       )
  //         return;
  //       localStorage.setItem("filters", JSON.stringify(userfilter));
  //       setProductFetchApi({
  //         hub: userfilter?.hub_id,
  //         conditions: userfilter?.condition_id,
  //         eta: userfilter?.eta,
  //         brand_id: userfilter?.brand_id,
  //         // min_price: userfilter?.min_price,
  //         // max_price: userfilter?.max_price,
  //       });
  //     }
  //   }
  // }, [userfilter]);

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
  let [permission, setpermission] = useState();
  useEffect(() => {
    let permissions = JSON.parse(localStorage.getItem("permissions"));
    let pendingpermission =
      permissions?.length === 0
        ? false
        : permissions?.some(
            (per) =>
              per?.value === "can-raise-wtb-request" &&
              per?.permission_value === 0
          );
    setpermission(pendingpermission);
  }, []);

  return (
    <div>
      <Helmet>
        <title>
          TEXUB | IT Products - Laptops, Desktops, Printers, Cartridges
        </title>
        <meta
          name="description"
          content="TEXUB - Shop from a wide range of laptops & desktops from HP, Dell, Lenovo, Realme, Asus, Acer, Vaio & more"
          data-react-helmet="true"
        />
      </Helmet>
      <div className="products">
        <Productlists
          setProductFetchApi={setProductFetchApi}
          productFetchApi={productFetchApi}
          dataFromApi={dataFromApi}
          setApplyFilter={setApplyFilter}
          applyFilter={applyFilter}
          productData={productData}
          userfilter={userfilter}
          homeCategorySearch={history?.state}
          filterHeaderImage={filterHeaderImage}
          setFilterHeaderImage={setFilterHeaderImage}
        />
        <Productsbrands
          setProductFetchApi={setProductFetchApi}
          productFetchApi={productFetchApi}
          getCategories={plp_categories}
          setApplyFilter={setApplyFilter}
          applyFilter={applyFilter}
          homeCategorySearch={history?.state}
        />
        <div className="clear-btn">
          <Button
            className="button-text btn-primary clear"
            onClick={() => {
              localStorage.removeItem("filters");
              setProductFetchApi((prev) => ({
                ...prev,
                conditions: "0",
                eta: "0",
                hub: "0",
                search_product: "",
                brand_id: "",
                category_id: "",
                min_price: "",
                max_price: "",
                today_deal: 0,
                just_launch: 0,
                price_drop: 0,
              }));
              setFilterHeaderImage({
                today_deal: false,
                today_deal_image: todays_deal_active,
                just_launch: false,
                just_launch_image: just_launch_inactive,
                price_drop: false,
                price_drop_image: price_drop_inactive,
              });
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
        {JSON.parse(localStorage.getItem("userdata"))?.group_id === 5 &&
          !permission && (
            <div className="products_want_to_buy">
              <p onClick={() => handleRouteChange()}>
                <span>Want to buy</span>
              </p>
            </div>
          )}
      </div>
    </div>
  );
};
