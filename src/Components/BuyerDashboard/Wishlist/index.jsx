import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import WhislistTable from "./WhishlistTable";
import { useStateValue } from "../../../store/state";

const Whislist = () => {
  const [tableData, setTableData] = useState([]);
  const [{ geo, customnostore, wishListData }, dispatch] = useStateValue();
  const [wishListAgain, setWishListAgain] = useState(false);

  const PaginateDataSplit = (event) => {
    if (wishListData?.length === 0) return [];
    else {
      setTableData(event);
    }
  };
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
      {wishListData?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={wishListData?.length > 0 ? wishListData : []}
          PagePerRow={2}
        />
      ) : (
        ""
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
