import React, { useState } from "react";
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
function Index({ registerproduct }) {
  const [tableData, setTableData] = useState([]);
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
      name: "logo",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return <img src={value} alt="" />;
        },
      },
    },
    {
      name: "pname",
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
      name: "instock",
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
      name: "myprice",
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
      name: "lowestprice",
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
              {value}
              <p>th</p>
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
              {value}
            </div>
          );
        },
      },
    },
  ];

  const table = [
    {
      logo: hp,
      pname: "pname1pname1pname1 pname1pname1pname1",
      category: "cat1",
      sku: "sku1",
      instock: 100,
      moq: 30,
      myprice: 500,
      lowestprice: 450,
      hub: "Chennai",
      rank: "6",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
    {
      logo: hp,
      pname: "pname2",
      category: "cat2",
      sku: "sku2",
      instock: 500,
      moq: 100,
      myprice: 5000,
      lowestprice: 4050,
      hub: "Hydrebad",
      rank: "13",
      action: "Update",
    },
  ];
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const handleSearchInput = (event) => {
    setSearchList(event?.target?.value === "laptop" ? true : false);
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
      {searchList && <ProductGrid />}
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="inventory__table"
      />

      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />
      <Link className="inventory-page-back" to="/sellerdashboard/dashboard">
        <ArrowBackIosNew />
        <span>Back</span>
      </Link>
    </div>
  );
}

export default Index;
