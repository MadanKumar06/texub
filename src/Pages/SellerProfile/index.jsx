import React, { useState, useEffect } from "react";
import "./styles.scss";
import bg from "../../Assets/sellerdashboard/bg.png";
import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import notification from "../../Assets/sellerdashboard/notification.png";
import hp from "../../Assets/sellerdashboard/inventory/hp.png";
import MUITable from "../../Components/Common/MUITable";
import Pagination from "../../Components/Pagination";
import axios from "axios";
import Constant from "../../Constant";
import { useParams } from "react-router-dom";

const Index = () => {
  const { id } = useParams();
  const [tableData, setTableData] = useState([]);
  const [serllerProfileList, setSellerProfileList] = useState([]);

  const sidemenu = [
    { label: "Seller Code", value: "INDS20222" },
    { label: "Seller Country", value: "INDIA" },
    { label: "Completed Orders", value: 118 },
  ];

  useEffect(() => {
    let data = {
      sellercode: id,
    };
    axios
      .post(Constant.baseUrl() + "/getSellerList", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSellerProfileList(res?.data);
      })
      .catch((error) => {});
  }, []);

  console.log(serllerProfileList)

  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const columns = [
    {
      name: "product_image",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="sellerprofile__image">
              <img src={value} alt="" />
            </div>
          );
        },
      },
    },
    { name: "product_name", label: "PRODUCT NAME" },
    { name: "category_name", label: "CATEGORY" },
    { name: "sku", label: "SKU" },
    {
      name: "in_stock",
      label: "IN STOCK",
      options: {
        customBodyRender: (value) => {
          return <div className="sellerprofile__instock">{value}</div>;
        },
      },
    },
    {
      name: "product_moq",
      label: "MOQ",
      options: {
        customBodyRender: (value) => {
          return <div className="sellerprofile__moq">{value}</div>;
        },
      },
    },
    {
      name: "price",
      label: "MY PRICE",
      options: {
        customBodyRender: (value) => {
          return <div className="sellerprofile__myprice">{value}</div>;
        },
      },
    },
    { name: "product_hub", label: "HUB" },
    {
      name: "rank",
      label: "RANK",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="sellerprofile__rank">
              {value}
              {/* <p>th</p> */}
            </div>
          );
        },
      },
    },
  ];

  const table = [
    {
      logo: hp,
      productname: "pname1",
      category: "Laptop",
      sku: "sku1",
      instock: 2000,
      moq: 50,
      myprice: 65999,
      hub: "Mumbai",
      rank: "4",
    },
    {
      logo: hp,
      productname: "pname2",
      category: "Desktop",
      sku: "sku5",
      instock: 4500,
      moq: 200,
      myprice: 55699,
      hub: "Banglore",
      rank: "4",
    },
  ];

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

  return (
    <div className="sellerprofile">
      {/* <img src={bg} alt="" /> */}
      <div className="sellerprofile__bg">
        <div className="sellerprofile__sidebar">
          <ul>
            {/* {sidemenu.map((data, i) => (
              <li
                key={i}
                className={`${data.label === "Seller Code" && "bgcolor1"}
                    ${data.label === "Seller Country" && "bgcolor2"}
                    ${data.label === "Completed Orders" && "bgcolor3"}
                    `}
              >
                <p className="sellerprofile__label">{data.label}</p>
                <p className="sellerprofile__value">{data.value}</p>
              </li>
            ))} */}
            <li className="bgcolor1">
              <p className="sellerprofile__label">Seller Code</p>
              <p className="sellerprofile__value">
                {id}
              </p>
            </li>
            <li className="bgcolor2">
              <p className="sellerprofile__label">Seller Country</p>
              <p className="sellerprofile__value">
                {serllerProfileList?.[0]?.seller_country}
              </p>
            </li>
            <li className="bgcolor2">
              <p className="sellerprofile__label">Completed Orders</p>
              <p className="sellerprofile__value">
                {/* {serllerProfileList?.[0].seller_country} */}
                0
              </p>
            </li>
          </ul>
        </div>
        <div className="sellerprofile__main">
          <div className="sellerprofile__search">
            <Paper
              className="sellerprofile__searchinput"
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search google maps" }}
                className="sellerprofile__input"
              />
            </Paper>
            <div className="sellerprofile__notiIcon">
              <img src={notification} alt="" />
            </div>
            <span>Notification</span>
          </div>
          <MUITable
            columns={columns}
            table={tableData}
            options={options}
            className="sellerprofile__table"
          />
          {serllerProfileList?.[1]?.length && (
            <Pagination
              PaginateData={PaginateDataSplit}
              DataList={
                serllerProfileList?.[1]?.length ? serllerProfileList?.[1] : []
              }
              PagePerRow={10}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
