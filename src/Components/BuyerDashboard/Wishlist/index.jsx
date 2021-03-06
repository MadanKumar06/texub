import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import WhislistTable from "./WhishlistTable";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";
import { Button, IconButton, InputBase, Paper } from "@mui/material";
import { SessionExpiredLogout } from "../../../utilities";

const Whislist = () => {
  const [tableData, setTableData] = useState([]);
  const [{ geo, customnostore, generalTrigger, currency }, dispatch] =
    useStateValue();
  const [wishListAgain, setWishListAgain] = useState(false);
  const [wishdata, setwishdata] = useState([]);
  const [folderdata, setfolderdata] = useState([]);
  const [wishsearch, setwishsearch] = useState("");
  const PaginateDataSplit = (event) => {
    if (wishdata?.length === 0) return setwishdata([]);
    else {
      setTableData(event);
    }
  };

  const [filterwishdata, setfilterwishdata] = useState([]);

  useEffect(() => {
    // let temp =
    // wishdata?.length &&
    // wishdata?.filter((wd) => wd?.wishlist_data?.length > 0);
    // debugger
    setfilterwishdata(wishdata);
  }, [wishdata]);

  const handlewishsearch = () => {
    dispatch({
      type: "SET_GENERAL_TRINGGER",
    });
  };

  const buttonsearch = (event) => {
    event.preventDefault();
    dispatch({
      type: "SET_GENERAL_TRINGGER",
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata"));
    if (user?.group_id === 5 && currency?.currency_id) {
      async function fetchData() {
        setwishdata([]);
        try {
          dispatch({
            type: "SET_IS_LOADING",
            value: true,
          });
          const wishlistdata = await axios({
            method: "post",
            url: `${Constant.baseUrl()}/getwishlist`,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: {
              requestParams: {
                customer_id: user?.id,
                search_term: wishsearch,
                currency_id: currency?.currency_id,
              },
            },
          });
          dispatch({
            type: "WHISHLIST_DATA",
            data: wishlistdata?.data,
          });
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          setwishdata(wishlistdata.data);
        } catch (e) {
          dispatch({
            type: "SET_IS_LOADING",
            value: false,
          });
          if (e.response.status === 401) {
            SessionExpiredLogout();
          }
        }
      }
      fetchData();
    }
  }, [wishListAgain, currency, generalTrigger]);

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    if (user?.id && currency?.currency_id) {
      try {
        const wishlistdata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/wishlist/getNames`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            requestParams: {
              customer_id: user?.id,
              currency_id: currency?.currency_id,
            },
          },
        });
        setfolderdata(wishlistdata.data);
      } catch (e) {
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
      }
    }
  }, [currency?.currency_id]);

  return (
    <div className="wishlist_main_container">
      <div className="want_wish__search">
        <Paper
          className="want_tobuy__searchinput"
          component="form"
          sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search..."
            inputProps={{ "aria-label": "" }}
            className="want_tobuy__input"
            onChange={(e) => setwishsearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handlewishsearch()}
          />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={(event) => buttonsearch(event)}
          >
            <Search />
          </IconButton>
        </Paper>
        <Link
          style={{ textDecoration: "none" }}
          className="button-text btn-secondary create_wishlist_link"
          to={`/${customnostore ? customnostore : geo?.country_name}/products`}
        >
          <Button
            className="button-text btn-secondary create_wishlist_btn"
            style={{ width: "100%", margin: "0 auto" }}
          >
            Create New Wishlist
          </Button>
        </Link>
      </div>
      <div>
        {filterwishdata?.length === 0 ? (
          <div className="no_data_found">
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ) : (
          tableData?.map((itm) => (
            <WhislistTable
              tableData={tableData?.length ? itm?.wishlist_data : []}
              tableDataHeader={itm?.name}
              item_id={itm?.id}
              setWishListAgain={setWishListAgain}
              wishListAgain={wishListAgain}
            />
          ))
        )}
      </div>
      {filterwishdata?.length === 0 ? (
        ""
      ) : (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={filterwishdata?.length > 0 ? filterwishdata : []}
          PagePerRow={2}
        />
      )}
      <div className="wishlist__footer">
        <div className="wishlist__container">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/buyerdashboard/dashboard`}
          >
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Whislist;
