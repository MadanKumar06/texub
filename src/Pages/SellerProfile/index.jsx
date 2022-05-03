import React, { useState, useEffect } from "react";
import "./styles.scss";
import bg from "../../Assets/sellerdashboard/bg.png";
import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import notification from "../../Assets/sellerdashboard/notification.png";
import hp from "../../Assets/sellerdashboard/inventory/hp.png";
import MUITable from "../../Components/Common/MUITable";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import Constant from "../../Constant";
import { Button } from "@mui/material";

import { useParams } from "react-router-dom";
import { useStateValue } from "../../store/state";
import { useNavigate } from "react-router-dom";
import Productsbrands from "../../Components/SellerProfileDetails/Productbrands";
import Productlists from "../../Components/SellerProfileDetails/Productlists";
import Productstable from "../../Components/SellerProfileDetails/Producttable";

const Index = () => {
  const { id } = useParams();
  // const [{}, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const [serllerProfileList, setSellerProfileList] = useState([]);

   const navigate = useNavigate();
    const [{ currency, homeSearch, customnostore, geo }, dispatch] =
    useStateValue();

  const [productFetchApi, setProductFetchApi] = useState({});
  const [productData, setProductData] = useState([]);
  const [dataFromApi, setDataFromApi] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [applyFilter, setApplyFilter] = useState(false);

  const sidemenu = [
    { label: "Seller Code", value: "INDS20222" },
    { label: "Seller Country", value: "INDIA" },
    { label: "Total Orders", value: 118 },
    { label: "Completed Orders", value: 118 },

  ];

  const handleClick = (event) => {
    event.stopPropagation();
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };
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

  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  let isGuestUserSignedIn = JSON.parse(localStorage.getItem("userdata"));
  const columns = [
    {
      name: "product_image",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="sellerprofile__image">
              <img src={value} alt="" />
            </div>
          );
        },
      },
    },
    { name: "product_name", label: "PRODUCT NAME" },
    { name: "category_name", label: "CATEGORY" },
    { name: "sku", label: "SKU" },
    {
      name: "in_stock",
      label: "IN STOCK",
      options: {
        customBodyRender: (value) => {
          return <div className="sellerprofile__instock">{value}</div>;
        },
      },
    },
    {
      name: "product_moq",
      label: "MOQ",
      options: {
        customBodyRender: (value) => {
          return <div className="sellerprofile__moq">{value}</div>;
        },
      },
    },
    {
      name: "price",
      label: "MY PRICE",
      options: {
        customBodyRender: (value) => {
          return !localStorage.getItem("isLoggedIn_auth") ? (
            <div className="producttable_price" onClick={(e) => handleClick(e)}>
              <p className="guest_login">Login</p>
              <p className="check_price">to see the prices</p>
            </div>
          ) : (
            <div className="sellerprofile__myprice">{value}</div>
          );
        },
      },
    },
    { name: "product_hub", label: "HUB" },
    {
      name: "rank",
      label: "RANK",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="sellerprofile__rank">
              {value}
              {/* <p>th</p> */}
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
  };

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

    const handleRouteChange = () => {
    navigate(
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wanttobuy`
    );
  };

  return (
    <div className="sellerprofile">
      {/* <img src={bg} alt="" /> */}
      <div className="sellerprofile__bg">
        <div className="sellerprofile__sidebar">
          <ul>
            {/* {sidemenu.map((data, i) => (
              <li
                key={i}
                className={`${data.label === "Seller Code" && "bgcolor1"}
                    ${data.label === "Seller Country" && "bgcolor2"}
                    ${data.label === "Completed Orders" && "bgcolor3"}
                    `}
              >
                <p className="sellerprofile__label">{data.label}</p>
                <p className="sellerprofile__value">{data.value}</p>
              </li>
            ))} */}
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
              <p className="sellerprofile__label">Total Orders</p>
              <p className="sellerprofile__value">
                {/* {serllerProfileList?.[0].seller_country} */}118
              </p>
            </li>
            <li className="bgcolor4">
              <p className="sellerprofile__label">Completed Orders</p>
              <p className="sellerprofile__value">
                {/* {serllerProfileList?.[0].seller_country} */}10
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
      {JSON.parse(localStorage.getItem("userdata"))?.group_id === 5 && (
        <div className="products_want_to_buy">
          <p onClick={() => handleRouteChange()}>
            <span>Want to buy</span>
          </p>
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default Index;
