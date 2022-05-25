import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import MUITable from "../../../Components/Common/MUITable";
import { useStateValue } from "../../../store/state";
import axios from "axios";
import Constant from '../../../Constant'
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

import moment from 'moment'

function MergeCarts() {
  const [{geo, customstore, customnostore}, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const handleViewChange = () => {
    dispatch({
      type: "SET_MINICART_OPEN_CLOSE",
      value: true,
      open: true,
    });
  };

  const [mergetable, setmergetable] = useState([])
  useEffect(async() => {
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const mergecart = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/cartRequestLists`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data:{
          "data":{
              "customer_id":user?.id,
              "type_id":2
          }
       }       
      })
      setmergetable(mergecart?.data)
    } catch(e) {
      console.log(e)
    }
  }, [])


  const columns = [
    { name: "user_name", label: "User Name" },
    { name: "hub", label: "HUB" },
    {
      name: "date",
      label: "Date",
      options: {
        customBodyRender: (value) => {
          return <div className="mergecarts__date">{moment(value).format("DD/MM/YYYY")}</div>;
        },
      },
    },
    { name: "items_qty", label: "Items Qty" },
    {
      name: "subtotal",
      label: "Subtotal",
      options: {
        customBodyRender: (value) => {
          return <div className="mergecarts__subtotal">{value}</div>;
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
              className="mergecarts__item"
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
            <div className="mergecart__action_main">
              <div className="mergecarts__action" onClick={() => merge(value)}>Merge</div>
              <div className="mergecarts__action delete" onClick={() => deletecart(value)}>Delete</div>
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
            {/* <img src={NodataFound} alt="No data Found" /> */}
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const PaginateDataSplit = (event) => {
    if (mergetable?.length === 0) return setTableData([]);
    setTableData(event);
  };

  const merge = async(value) => {
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const mergerequest = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/cartMergeByMainUser`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "data" :{
              "id" : value,
              "login_id": user?.id
          }
       }
      })
    } catch(e) {
      console.log(e)
    }
  }

  const deletecart = async(value) => {
    let user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const mergerequest = await axios({
        method: 'post',
        url: `${Constant?.baseUrl()}/deleteRequests`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "data" :{
              "id" : value,
              "login_id": user?.id
          }
       }
      })
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <div className="mergecarts">
      <div className="mergecarts__footer">
        <div className="mergecarts__container">
          <Link to={`/${customnostore ? customnostore : geo?.country_name}/buyerdashboard/dashboard`}>
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
          {/* <div className="merge__cart_button">
            <Button className="merge_btn" >Merge</Button>
            <Button className="Delete_btn">Delete</Button>
          </div> */}
        </div>
      </div>
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="mergecarts__table"
      />
      {mergetable?.length > 0 ?
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={mergetable?.length ? mergetable : []}
          PagePerRow={10}
        />
        :
        ""
      }
    </div>
  );
}

export default MergeCarts;
