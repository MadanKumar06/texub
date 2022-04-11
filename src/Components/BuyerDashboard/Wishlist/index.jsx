import React, { useState, useEffect } from "react";
import "./styles.scss";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";
import WhishlistTableData from "./whishlistJson";
import WhislistTable from "./WhishlistTable";
import axios from 'axios'
import Constant from '../../../Constant'

const Whislist = () => {
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };

  console.log(WhishlistTableData)

  const [wishdata, setwishdata] = useState([])
  useEffect(async() => {
    const user = JSON.parse(localStorage.getItem('userdata'))
    try {
      const wishlistdata = await axios({
        method: 'post',
        url: `${Constant.baseUrl()}/getwishlist`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "requestParams":{
            "customer_id":user?.id
          }     
        }
      })
      console.log(wishlistdata.data)
    } catch(e) {
      console.log(e)
    }
  }, [])

  const [folderdata, setfolderdata] = useState([])

  useEffect(async() => {
    let user = JSON.parse(localStorage.getItem('userdata'))
    console.log(user)
    try {
      const wishlistdata = await axios({
        method: 'post',
        url: `${Constant.baseUrl()}/wishlist/getNames`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: {
          "requestParams":{
            "customer_id":user?.id
          }
        }
      })
      console.log(wishlistdata.data)
      setfolderdata(wishlistdata.data)
    } catch(e) {
      console.log(e)
    }
  },[])

  console.log(folderdata)

  return (
    <div className="wishlist_main_container">
      <div className="wishlist__footer">
        <div className="wishlist__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
      
      <div>
        {tableData?.length &&
          tableData?.map((itm) => (
            <WhislistTable
              tableData={itm?.Product_details}
              tableDataHeader={itm?.Top_product}
              folderdata={folderdata}
            />
          ))}
      </div>
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={WhishlistTableData}
        PagePerRow={2}
      />

    </div>
  );
};

export default Whislist;
