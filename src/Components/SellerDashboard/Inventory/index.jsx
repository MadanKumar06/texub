import React, { useState, useEffect } from "react";
import "./styles.scss";
import MUITable from "../../Common/MUITable";
import { Button, Box } from "@mui/material";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { ArrowBackIosNew } from "@mui/icons-material";
import hp from "../../../Assets/sellerdashboard/inventory/hp.png";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import ProductGrid from "./ProductGrid";

import axios from "axios";
import Constant from "../../../Constant";

function Index({ registerproduct }) {
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [searchList, setSearchList] = useState(false);

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

  const columns = [
    {
      name: "brand_image_url",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return <img src={value} alt="" />;
        },
      },
    },
    {
      name: "name",
      label: "PRODUCT NAME",
      options: {
        customBodyRender: (value) => {
          return <div className="inventory-product-grid-info">{value} </div>;
        },
      },
    },
    {
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "sku",
      label: "SKU",
    },
    {
      name: "in_stock",
      label: "IN STOCK",
      options: {
        customBodyRender: (value) => {
          return <div className="inventory__instock">{value}</div>;
        },
      },
    },

    {
      name: "moq",
      label: "MOQ",
      options: {
        customBodyRender: (value) => {
          return <div className="inventory__moq">{value}</div>;
        },
      },
    },
    {
      name: "my_price",
      label: "MY PRICE",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="inventory__myprice">
              <p>
                <span className="label">INR</span>
                <span className="value">{value}</span>
              </p>
            </div>
          );
        },
      },
    },
    {
      name: "my_price",
      label: "LOWEST PRICE",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="inventory__lowestprice">
              <p>
                <span className="label">INR</span>
                <span className="value">{value}</span>
              </p>
            </div>
          );
        },
      },
    },
    {
      name: "hub",
      label: "HUB",
    },
    {
      name: "rank",
      label: "RANK",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="inventory__rank">
              {/* {value} */}3<p>th</p>
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "ACTION",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className="inventory__action"
              onClick={() => registerproduct("updateproduct")}
            >
              Update
            </div>
          );
        },
      },
    },
  ];
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };

  //Api to fetch table values
  useEffect(() => {
    const fetchcustomerToken = () => {
      let data = {
        username: "ajitha.v@ambab.com",
        password: "admin@1234",
      };
      axios
        .post(Constant.customerTokenUrl(), data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          fetchTableData(res?.data);
        })
        .catch((err) => {});
    };
    fetchcustomerToken();
  }, []);

  const fetchTableData = (token) => {
    let customerId = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      customerId: customerId?.id,
    };
    axios
      .post(Constant.baseUrl() + "/getEditProductList", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApiTableData(res?.data);
      })
      .catch((err) => {});
  };
  const handleSearchInput = (event) => {
    var customer_id = JSON.parse(localStorage.getItem("userdata"));
    let data = {
      customerId: customer_id?.id,
      keyWord: event?.target?.value,
    };
    axios
      .post(Constant.baseUrl() + "/getSearchProduct", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSearchList(res?.data);
      })
      .catch((err) => {});
  };
  return (
    <div className="inventory">
      <div className="inventory__products__footer">
        <div className="inventory__products__container">
          <div className="inventory__button">
            <Paper
              component="form"
              className="paper_search"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                onChange={handleSearchInput}
                inputProps={{ "aria-label": "search google maps" }}
              />
            </Paper>
            <Box className="button-box-container inventory-hedaer-btn">
              <Button
                className="button-text btn-secondary inventory_register"
                onClick={() => registerproduct("registerproduct")}
              >
                Register New Product
              </Button>
              <Button
                className="button-text btn-ternary  inventory_product_upload"
                onClick={() => registerproduct("pending-product")}
              >
                Pending Products
              </Button>
              <Button className="button-text btn-ternary  inventory_product_upload">
                Bulk Upload
              </Button>
            </Box>
          </div>
        </div>
      </div>
      {searchList?.length && <ProductGrid gridData={searchList} />}
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="inventory__table"
      />

      {apiTableData?.length && (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={apiTableData}
          PagePerRow={10}
        />
      )}
      <Link className="inventory-page-back" to="/sellerdashboard/dashboard">
        <ArrowBackIosNew />
        <span>Back</span>
      </Link>
    </div>
  );
}

export default Index;
