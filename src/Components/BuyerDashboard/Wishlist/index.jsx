import React, { useState } from "react";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import WhishlistTableData from "./whishlistJson";
import WhislistTable from "./WhishlistTable";

const Whislist = () => {
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  return (
    <div className="wishlist_main_container">
      <div>
        {tableData?.length &&
          tableData?.map((itm) => (
            <WhislistTable
              tableData={itm?.Product_details}
              tableDataHeader={itm?.Top_product}
            />
          ))}
      </div>
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={WhishlistTableData}
        PagePerRow={2}
      />

      <div className="wishlist__footer">
        <div className="wishlist__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Whislist;
