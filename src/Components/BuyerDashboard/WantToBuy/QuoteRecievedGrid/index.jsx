import React, { useState, useEffect } from "react";
import MUITable from "../../../../Components/Common/MUITable";
import Pagination from "../../../Pagination";
import "./styles.scss";
import axios from "axios";
import Constant from "../../../../Constant";
import { useStateValue } from "../../../../store/state";
import { SessionExpiredLogout } from "../../../../utilities";

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
    pagination: false,
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
        dispatch({
          type: "SET_IS_LOADING",
          value: false,
        });
        if (e.response.status === 401) {
          SessionExpiredLogout();
        }
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
      label: "SELLER ID",
      options: {
        customBodyRender: (value) => {
          return <div className="want_tobuy__orderid">{value}</div>;
        },
      },
    },
    {
      name: "part_number",
      label: "PART NUMBER",
    },
    {
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "hub",
      label: "HUB",
    },
    {
      name: "sellerEnquiryStatus",
      label: "SELLER ENQUIRY STATUS",
    },
  ];

  return (
    <div className="want_tobuy">
      <p className="title">Quotations Received</p>
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
