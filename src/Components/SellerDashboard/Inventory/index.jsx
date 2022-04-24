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
import { useStateValue } from "../../../store/state";
import Offers from "./Offers";

function Index({ registerproduct }) {
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const [{geo, customstore}, dispatch] = useStateValue();

  const [offersOpenClose, setOffersOpenClose] = useState({
    isOpenClose: false,
    product_id: "",
    assigned_product_id: "",
    isOfferValid: "",
  });

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

  const handleOpenCloseOffers = () => {
    setOffersOpenClose({ isOpenClose: false });
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
        customBodyRender: (value, tablemeta) => {
          let isOfferValid = tablemeta?.rowData[12];
          return (
            <div className="brandOffers">
              <div className="inventory-product-grid-info">{value}</div>
              {isOfferValid === "1" && <p>Offers</p>}
            </div>
          );
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
        customBodyRender: (value, tablemeta) => {
          return (
            <div className="inventory__myprice">
              <p>
                <span className="label">{tablemeta?.rowData?.[10]}</span>
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
      name: "main_product_id",
      label: "ACTION",
      options: {
        customBodyRender: (value, tablemeta) => {
          let isOfferValid = tablemeta?.rowData[12];
          return (
            <div className="action">
              <div
                className="inventory__action"
                onClick={() =>
                  registerproduct("updateproduct", value, "update")
                }
              >
                Update
              </div>
              <div
                className="inventory__action add_offers"
                onClick={() =>
                  setOffersOpenClose({
                    isOpenClose: true,
                    product_id: value,
                    assigned_product_id: tablemeta?.rowData?.[11],
                    isOfferValid: isOfferValid,
                  })
                }
              >
                {isOfferValid === "0" ? "Add Offers" : "View Offers"}
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "currency_name",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "assign_product_id",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "offer_status",
      label: " ",
      options: {
        display: false,
      },
    },
  ];
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  //Api to fetch table values
  useEffect(() => {
    const fetchTableData = async (token) => {
      let customerId = JSON.parse(localStorage.getItem("userdata"));
      try {
        dispatch({
          type: "SET_IS_LOADING",
          value: true,
        });
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/getEditProductList`,
          data: {
            customerId: customerId?.id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setApiTableData(tabledata?.data);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      } catch (e) {
        console.log(e);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    };
    fetchTableData();
  }, []);

  const handleSearchInput = async (event) => {
    event.preventDefault();
    if (search === "") {
      return setSearchList([]);
    }
    try {
      const searchresults = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/getSearchProduct`,
        data: {
          customerId: 310,
          keyWord: search,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSearchList(searchresults?.data);
      console.log(searchresults?.data);
    } catch (e) {
      console.log(e);
    }
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
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                onChange={(event) => setSearch(event.target.value)}
                inputProps={{ "aria-label": "" }}
              />
              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={(event) => handleSearchInput(event)}
              >
                <SearchIcon />
              </IconButton>
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
              <Button
                className="button-text btn-ternary  inventory_product_upload"
                onClick={() => registerproduct("bulkupload")}
              >
                Bulk Upload
              </Button>
            </Box>
          </div>
        </div>
      </div>
      {searchList?.length > 0 && (
        <ProductGrid
          gridData={searchList?.length ? searchList : []}
          registerproduct={registerproduct}
        />
      )}
      <MUITable
        columns={columns}
        table={tableData?.length ? tableData : []}
        options={options}
        className="inventory__table"
      />

      {apiTableData?.length > 0 && (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={apiTableData?.length ? apiTableData : []}
          PagePerRow={10}
        />
      )}
      {offersOpenClose?.isOpenClose && (
        <Offers
          handleOpenCloseOffers={handleOpenCloseOffers}
          offersOpenClose={offersOpenClose}
        />
      )}
      <Link className="inventory-page-back" to={`/${customstore ? customstore : geo?.country_name}/sellerdashboard/dashboard`}>
        <ArrowBackIosNew />
        <span>Back</span>
      </Link>
    </div>
  );
}

export default Index;
