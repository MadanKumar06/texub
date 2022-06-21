import React, { useState, useEffect } from "react";
import "./styles.scss";

import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";

import Pagination from "../../Pagination";
import MUITable from "../../../Components/Common/MUITable";
import { useStateValue } from "../../../store/state";
import Constant from "../../../Constant";

function ApproveCart() {
  const [{ geo, customnostore }, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);

  const handleViewChange = () => {
    dispatch({
      type: "SET_MINICART_OPEN_CLOSE",
      value: true,
      open: true,
    });
  };
  const [approvetable, setapprovetable] = useState([]);
  useEffect(async () => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const approvelist = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/cartRequestLists`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            customer_id: user?.id,
            type_id: 1,
          },
        },
      });
      setapprovetable(approvelist?.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const columns = [
    { name: "user_name", label: "User Name" },
    { name: "hub", label: "HUB" },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return <div className="approve__cart__date">{value}</div>;
        },
      },
    },
    { name: "item_qty", label: "Items Qty" },
    {
      name: "subtotal",
      label: "Subtotal",
      options: {
        customBodyRender: (value) => {
          return <div className="approve__cart__subtotal">{value}</div>;
        },
      },
    },
    {
      name: "sub_total",
      label: "Items",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className="approve__cart__item"
              onClick={() => handleViewChange()}
            >
              View
            </div>
          );
        },
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="approve__cart__action_main">
              <div
                className="approve__cart__action"
                onClick={() => approve(value)}
              >
                Approve
              </div>
              <div
                className="approve__cart__action delete"
                onClick={() => deletecart(value)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    },
  ];
  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: true,
    download: false,
    print: false,
    sort: false,
    viewColumns: false,
    search: false,
    textLabels: {
      body: {
        noMatch: (
          <div className="no_data_found">
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const PaginateDataSplit = (event) => {
    if (approvetable?.length === 0) return setTableData([]);
    setTableData(event);
  };

  const approve = async (value) => {
    try {
      const mergerequest = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/cartApproveByMainUser`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            id: value,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deletecart = async (value) => {
    let user = JSON.parse(localStorage.getItem("userdata"));
    try {
      const mergerequest = await axios({
        method: "post",
        url: `${Constant?.baseUrl()}/deleteRequests`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          data: {
            id: value,
            quote_id: user?.id,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="approve__cart">
      <div className="approve__cart__footer">
        <div className="approve__cart__container">
          <Link
            to={`/${
              customnostore ? customnostore : geo?.country_name
            }/buyerdashboard/dashboard`}
          >
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          {/* <div className="approve__cart_button">
            <Button className="approve__cart_btn">Approve</Button>
            <Button className="Delete_btn">Delete</Button>
          </div> */}
        </div>
      </div>
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="approve__cart__table"
      />
      {approvetable?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={approvetable?.length > 0 ? approvetable : []}
          PagePerRow={10}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default ApproveCart;
