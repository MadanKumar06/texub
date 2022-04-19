import React, { useState, useEffect } from "react";
import MUITable from "../../../../Components/Common/MUITable";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../../Pagination";
import "./styles.scss";
import axios from "axios";
import Constant from "../../../../Constant";
// import Vieworders from '../../Common/Vieworders'
import { useStateValue } from "../../../../store/state";

function Index({ id }) {
  const [tableData, setTableData] = useState([]);
  const [apiTableData, setApiTableData] = useState([]);
  const [{}, dispatch] = useStateValue();

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
  useEffect(() => {
    const fetchTableData = async () => {
      dispatch({
        type: "SET_IS_LOADING",
        value: true,
      });
      try {
        const tabledata = await axios({
          method: "post",
          url: `${Constant.baseUrl()}/wtbEnquiryList`,
          data: {
            wtb_id: id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        setApiTableData(tabledata?.data);
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
  const PaginateDataSplit = (event) => {
    if (apiTableData?.length === 0) return setApiTableData([]);
    setTableData(event);
  };
  const columns = [
    {
      name: "sellerCode",
      label: "SELLER CODE.",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__orderid">{value}</div>;
        },
      },
    },
    { name: "sellerEnquiryStatus", label: "SELLER ENQUIRY STATUS" },
  ];

  return (
    <div className="want_tobuy">
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="want_tobuy__table"
      />
      {apiTableData?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={apiTableData?.length ? apiTableData : []}
          PagePerRow={10}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Index;
