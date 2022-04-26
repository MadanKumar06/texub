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
  const [{ geo, customstore, customnostore }, dispatch] = useStateValue();
  const [wishListAgain, setWishListAgain] = useState(false);

  const PaginateDataSplit = (event) => {
    if (wishdata.length === 0) return setwishdata([]);
    console.log(event);
    setTableData(event);
  };
  const [wishdata, setwishdata] = useState([]);
  useEffect(async () => {
    const user = JSON.parse(localStorage.getItem("userdata"));
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
  }, [wishListAgain]);

  const [folderdata, setfolderdata] = useState([]);

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

      <div>
        {tableData?.length &&
          tableData?.map((itm) => (
            <WhislistTable
              tableData={itm?.wishlist_data}
              tableDataHeader={itm?.name}
              folderdata={folderdata}
              setWishListAgain={setWishListAgain}
              wishListAgain={wishListAgain}
            />
          ))}
      </div>
      {wishdata?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={wishdata?.length > 0 ? wishdata : []}
          PagePerRow={2}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Whislist;
