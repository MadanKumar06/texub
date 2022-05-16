import React, { useState, useEffect } from "react";
import styles from "./styles";

import { withStyles } from "@mui/styles";
import MUITable from "../../Common/MUITable";
import { useStateValue } from "../../../store/state";
import Pagination from "../../Pagination";
import Constant from "../../../Constant";
import NodataFound from "../../../Assets/CommonImage/NodataFound.webp.png";

//Basic Need
import shortExpand_active_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1175.png";
import shortExpand_inactive_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1177.png";
import longExpand_active_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1178.png";
import longExpand_inactive_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1176.png";
const Productstable = ({
  classes,
  setProductFetchApi,
  productFetchApi,
  productData,
}) => {
  const [{}, dispatch] = useStateValue();
  const [tableData, setTableData] = useState([]);
  const [emptytableData, setemptyTableData] = useState([]);

  let {
    producttable,
    mui_datatable_main,
    productable_image,
    producttable_description,
    producttable_price,
    producttable_add_to_cart,
    producttable_price_block,
    producttable_heading_icon,
    check_price,
    guest_login,
  } = classes;

  const onRowHandleClick = (event, rowState, rowMeta) => {
    dispatch({
      type: "SET_PDP_POPUP_OPEN_CLOSE",
      value: true,
      data: { event, tableData },
    });
  };

  const handleClick = (event) => {
    event.stopPropagation();
    dispatch({
      type: "SET_SIGNIN_OPEN_CLOSE",
      value: true,
    });
  };
  function formatToCurrency(amount) {
    return amount
      .toString()
      .replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");

    // return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const [textsize, settextsize] = useState({
    size: 60,
    long_expand_view: true,
    short_expand_view: false,
    short_image: shortExpand_active_icon,
    long_image: longExpand_inactive_icon,
  });

  const descriptionChangeView = (event) => {
    settextsize((prevState) => ({
      ...prevState,
      size: event?.value,
      long_expand_view: event?.long,
      short_expand_view: event?.short,
      short_image:
        event?.short === true
          ? shortExpand_active_icon
          : shortExpand_inactive_icon,
      long_image:
        event?.long === true
          ? longExpand_active_icon
          : longExpand_inactive_icon,
    }));
  };
  const columns = [
    {
      name: "main_product",
      label: "BRAND NAME",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <div className={productable_image}>
              <img
                src={`${Constant.imageBaseUrl()}${value?.brand}`}
                alt="brand"
              />
            </div>
          );
        },
      },
    },
    {
      name: "main_product",
      label: "MODEL NAME",
      options: {
        customBodyRender: (value) => {
          return <div>{value?.model_number}</div>;
        },
      },
    },
    {
      name: "main_product",
      label: "PART NUMBER",
      options: {
        customBodyRender: (value) => {
          return <div>{value?.part_number}</div>;
        },
      },
    },
    {
      name: "main_product",
      label: "DESCRIPTION",
      options: {
        customBodyRender: (value) => {
          return (
            <div className={producttable_description}>
              {truncate(value?.description, textsize?.size)}
            </div>
          );
        },
      },
    },
    {
      name: "sub_products",
      label: "HUB",
      options: {
        customBodyRender: (value) => {
          return <div>{value?.[0]?.hub}</div>;
        },
      },
    },
    {
      name: "sub_products",
      label: "MOQ",
      options: {
        customBodyRender: (value) => {
          return <div>{value?.[0]?.moq}</div>;
        },
      },
    },
    {
      name: "sub_products",
      label: "PRICE",
      options: {
        customBodyRender: (value) => {
          return (
            <div className={producttable_price_block}>
              {!localStorage.getItem("isLoggedIn_auth") ? (
                <div
                  className={producttable_price}
                  onClick={(e) => handleClick(e)}
                >
                  <p className={guest_login}>Login</p>
                  <p className={check_price}>to see the prices</p>
                </div>
              ) : (
                localStorage.getItem("isLoggedIn_auth") && (
                  <div className={producttable_price}>
                    <span>{value?.[0]?.currency}</span>
                    {formatToCurrency(parseInt(value?.[0]?.price))}
                  </div>
                )
              )}
            </div>
          );
        },
      },
    },
    {
      name: "sub_products",
      label: "INSTOCK",
      options: {
        customBodyRender: (value) => {
          return <div>{value?.[0]?.in_stock}</div>;
        },
      },
    },
    {
      name: "main_product",
      label: "CONDITION",
      options: {
        customBodyRender: (value) => {
          return <div>{value?.condition}</div>;
        },
      },
    },
    {
      name: "main_product",
      label: (
        <div className={producttable_heading_icon}>
          <img
            src={textsize?.short_image}
            alt="short description"
            onClick={() =>
              descriptionChangeView({ short: true, long: false, value: 30 })
            }
          />
          <img
            src={textsize?.long_image}
            alt="long description"
            onClick={() =>
              descriptionChangeView({ short: false, long: true, value: 10000 })
            }
          />
        </div>
      ),
      options: {
        customBodyRender: (value) => {
          return (
            <p
              className={producttable_add_to_cart}
              value={value?.main_product_id}
              onClick={() => onRowHandleClick(value?.main_product_id)}
            >
              View Product
            </p>
          );
        },
      },
    },
    {
      name: "main_product",
      label: "CONDITION",
      options: {
        display: false,
      },
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
    // onCellClick: onRowHandleClick,
    // onRowClick: onRowHandleClick,
    search: false,
    textLabels: {
      body: {
        noMatch: (
          <div className="no_data_found">
            <img src={NodataFound} alt="No data Found" />
            <p>No data Found...</p>
          </div>
        ),
      },
    },
  };

  const PaginateDataSplit = (event) => {
    if (productData?.length === 0) return setTableData([]);
    setTableData(event);
  };
  return (
    <div className={producttable}>
      {productData?.length > 0 ? (
        <MUITable
          columns={columns}
          table={tableData}
          options={options}
          className={mui_datatable_main}
        />
      ) : (
        <MUITable
          columns={columns}
          table={emptytableData}
          options={options}
          className={mui_datatable_main}
        />
      )}

      {productData?.length > 0 ? (
        <Pagination
          PaginateData={PaginateDataSplit}
          DataList={productData?.length > 0 ? productData : []}
          PagePerRow={10}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default withStyles(styles)(Productstable);
