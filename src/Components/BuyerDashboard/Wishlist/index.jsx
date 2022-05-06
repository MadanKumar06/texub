import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import WhislistTable from "./WhishlistTable";
import axios from "axios";
import Constant from "../../../Constant";
import { useStateValue } from "../../../store/state";

const Whislist = () => {
  const [tableData, setTableData] = useState([]);
  const [{ geo, customnostore, generalTrigger }, dispatch] = useStateValue();
  const [wishListAgain, setWishListAgain] = useState(false);
  const [wishdata, setwishdata] = useState([]);
  const [folderdata, setfolderdata] = useState([]);
  const PaginateDataSplit = (event) => {
    if (wishdata?.length === 0) return setwishdata([]);
    else {
      setTableData(event);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem("userdata"));
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
        // console.log(wishlistdata)
        setwishdata(wishlistdata.data);
      } catch (e) {
        console.log(e);
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
      }
    }
    fetchData();
  }, [wishListAgain, generalTrigger]);

  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
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
          },
        },
      });
      setfolderdata(wishlistdata.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="wishlist_main_container">
      <div>
        {tableData?.length > 0
          ? tableData?.map((itm) => (
              <WhislistTable
                tableData={tableData?.length ? itm?.wishlist_data : []}
                tableDataHeader={itm?.name}
                item_id={itm?.id}
                setWishListAgain={setWishListAgain}
                wishListAgain={wishListAgain}
              />
            ))
          : "Currently Wishlist Data is Empty"}
      </div>
      {wishdata?.length === 0 ? (
        ""
      ) : (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={wishdata?.length > 0 ? wishdata : []}
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
