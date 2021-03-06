import React, { useState, useEffect } from "react";
import "./styles.scss";

import MUITable from "../../Common/MUITable";
import { Button, Box, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

import Pagination from "../../Pagination";
import ProductGrid from "./ProductGrid";
import axios from "axios";
import Constant from "../../../Constant";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

import { useStateValue } from "../../../store/state";
import { SessionExpiredLogout } from "../../../utilities";
import Offers from "./Offers";
import moment from "moment";

function Index({ registerproduct }) {
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const [{ geo, customnostore, generalTrigger }, dispatch] = useStateValue();
  const [apicallback, setApicallback] = useState(0);
  function formatToCurrency(price) {
    return price.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
  }

  function getOrdinalSuffix(value) {
    if (/^[2-3]?1$/.test(value)) {
      return "st";
    } else if (/^[2-3]?2$/.test(value)) {
      return "nd";
    } else if (/^[2-3]?3$/.test(value)) {
      return "rd";
    } else {
      return "th";
    }
  }

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
    pagination: false,
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: (
          <div className="no_data_found">
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const handleOpenCloseOffers = () => {
    setOffersOpenClose({ isOpenClose: false });
  };
  const [registeraccess, setregisteraccess] = useState(false);
  useEffect(() => {
    let permission = JSON.parse(localStorage.getItem("permissions"));
    let temp;
    if (permission?.length) {
      temp = permission?.some(
        (p) =>
          p?.value === "raise-product-registration" && p?.permission_value === 1
      );
    } else {
      temp = true;
    }
    setregisteraccess(temp);
  }, []);

  const isOfferValidOrExpired = (offer_end_date) => {
    if (offer_end_date === null) {
      return false;
    } else {
      let d1 = moment(new Date()).format("YYYY-MM-DD");
      let d2 = moment(new Date(offer_end_date)).format("YYYY-MM-DD");
      return moment(d1).isAfter(d2);
    }
  };
  const deleteHandler = (assigned_product_id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "Want to Delete!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleterow(assigned_product_id);
        }
      });
  };
  const columns = [
    {
      name: "brand_image_url",
      label: " ",
      options: {
        customBodyRender: (value, tablemeta) => {
          let brandName = tablemeta?.rowData[15];
          return (
            <div className="brand_image">
              {value ? (
                <img src={value} alt="" title={brandName} />
              ) : (
                <span>{brandName}</span>
              )}
            </div>
          );
        },
      },
    },
    {
      name: "name",
      label: "PRODUCT NAME",
      options: {
        customBodyRender: (value, tablemeta) => {
          let isOfferValid = tablemeta?.rowData[12];
          let offerExpired = tablemeta?.rowData[14];
          return (
            <div className="brandOffers">
              <div className="inventory-product-grid-info">{value}</div>

              {isOfferValid === "1" ? (
                isOfferValidOrExpired(offerExpired) ? (
                  <p className="offer_disabled">Offers Expired</p>
                ) : (
                  <p className="offer_enabled">Offers</p>
                )
              ) : isOfferValid === "2" ? (
                <p className="disabled_offer">Offers Inactive</p>
              ) : (
                ""
              )}
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
                <span className="value">
                  {formatToCurrency(parseInt(value))}
                </span>
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
              <p> {getOrdinalSuffix(value)}</p>
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
          let assigned_product_id = tablemeta?.rowData[11];
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
              <div
                className="inventory__action add_offers"
                onClick={() => deleteHandler(assigned_product_id)}
                // onClick={() => deleterow(assigned_product_id)}
              >
                Delete
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
    {
      name: "offer_price",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "offer_end_date",
      label: " ",
      options: {
        display: false,
      },
    },
    {
      name: "brand_name",
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
      setApiTableData({});
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
            page: apicallback,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setApiTableData(tabledata?.data?.length ? tabledata?.data?.[0] : []);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      } catch (e) {
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    };
    fetchTableData();
  }, [generalTrigger, apicallback]);

  let customerId = JSON.parse(localStorage.getItem("userdata"));
  const handleSearchInput = async (event) => {
    event.preventDefault();
    setSearchList([]);
    if (search === "") {
      return setSearchList([]);
    }
    try {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      const searchresults = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/getSearchProduct`,
        data: {
          customerId: customerId?.id,
          keyWord: search,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSearchList(searchresults?.data);
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
      if (searchresults?.data?.length === 0) {
        swal.fire({
          text: `No Search Result For "${search}" `,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (e) {
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };

  const deleterow = async (value) => {
    dispatch({
      type: "SET_IS_LOADING",
      value: true,
    });
    try {
      const rowdelete = await axios({
        method: "post",
        url: `${Constant.baseUrl()}/deleteProduct`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          product_id: value,
        },
      });
      if (rowdelete?.data?.[0]?.status) {
        dispatch({
          type: "SET_GENERAL_TRINGGER",
        });
        swal.fire({
          text: `${rowdelete?.data?.[0]?.message}`,
          icon: "success",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        swal.fire({
          text: `${rowdelete?.data?.[0]?.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 3000,
        });
      }
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    } catch (e) {
      if (e.response.status === 401) {
        SessionExpiredLogout();
      }
      dispatch({
        type: "SET_IS_LOADING",
        value: false,
      });
    }
  };
  const handleApicallback = (event) => {
    setApicallback(event);
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
              {registeraccess && (
                <Button
                  className="button-text btn-secondary inventory_register"
                  onClick={() => registerproduct("registerproduct")}
                >
                  Register New Product
                </Button>
              )}
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
      {apiTableData?.length === 0 ? (
        <MUITable
          columns={columns}
          table={[]}
          options={options}
          className="inventory__table"
        />
      ) : (
        <MUITable
          columns={columns}
          table={tableData?.length ? tableData : []}
          options={options}
          className="inventory__table"
        />
      )}

      {apiTableData?.products?.length > 0 && (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={apiTableData?.products}
          PagePerRow={parseInt(apiTableData?.pagination)}
          TotalPage={apiTableData?.count}
          apicallback={apicallback}
          handleApicallback={handleApicallback}
        />
      )}
      {offersOpenClose?.isOpenClose && (
        <Offers
          handleOpenCloseOffers={handleOpenCloseOffers}
          offersOpenClose={offersOpenClose}
        />
      )}
      <Link
        className="inventory-page-back"
        to={`/${
          customnostore ? customnostore : geo?.country_name
        }/sellerdashboard/dashboard`}
      >
        <ArrowBackIosNew />
        <span>Back</span>
      </Link>
    </div>
  );
}

export default Index;
