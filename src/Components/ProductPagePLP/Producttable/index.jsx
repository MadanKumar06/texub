import React, { useState, useEffect } from "react";
import styles from "./styles";

import { withStyles } from "@mui/styles";
import MUITable from "../../MUITable";
import { useStateValue } from "../../../store/state";

import HP from "./../../../Assets/Productlist/hp_td_icon.png";
import Acer from "../../../Assets/Productlist/acer_icon_td.png";
import Apple from "../../../Assets/Productlist/apple_icon_td.png";
import Lenovo from "../../../Assets/Productlist/lenovo_icon_td.png";
import Samsung from "../../../Assets/Productlist/samsung_icon.png";

//Basic Need
import shortExpand_active_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1175.png";
import shortExpand_inactive_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1177.png";
import longExpand_active_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1178.png";
import longExpand_inactive_icon from "../../../Assets/BasicNeeded/PLPIcons/Group 1176.png";
const Productstable = ({ classes }) => {
  const [{}, dispatch] = useStateValue();
  let {
    producttable,
    mui_datatable_main,
    productable_image,
    producttable_description,
    producttable_price,
    producttable_add_to_cart,
    producttable_price_block,
    producttable_heading_icon,
  } = classes;

  const onRowHandleClick = (rowData, rowState, rowMeta) => {
    dispatch({
      type: "SET_PDP_POPUP_OPEN_CLOSE",
      value: true,
    });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const [textsize, settextsize] = useState({
    size: 30,
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
      name: "BRANDNAME",
      label: "BRAND NAME",
      options: {
        filter: false,
        customBodyRender: (value) => {
          return (
            <div className={productable_image}>
              <img src={value} alt="" />
            </div>
          );
        },
      },
    },
    {
      name: "MODELNAME",
      label: "MODEL NAME",
    },
    {
      name: "PARTNUMBER",
      label: "PART NUMBER",
    },
    {
      name: "DESCRIPTION",
      label: "DESCRIPTION",
      options: {
        customBodyRender: (value) => {
          return (
            <div className={producttable_description}>
              {truncate(value, textsize?.size)}
            </div>
          );
        },
      },
    },
    {
      name: "HUB",
      label: "HUB",
    },
    {
      name: "MOQ",
      label: "MOQ",
    },
    {
      name: "PRICE",
      label: "PRICE",
      options: {
        customBodyRender: (value) => {
          return (
            <div className={producttable_price_block}>
              <div className={producttable_price}>
                <span>INR</span>
                {value}
              </div>
            </div>
          );
        },
      },
    },
    {
      name: "INSTOCK",
      label: "INSTOCK",
    },
    {
      name: "CONDITION",
      label: "CONDITION",
    },
    {
      name: "CONDITION",
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
          return <p className={producttable_add_to_cart}>View Product</p>;
        },
      },
    },
  ];

  const Productstablelist = [
    {
      id: 1,
      BRANDNAME: HP,
      MODELNAME: "Pavilion Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999 ",
      INSTOCK: "100",
      CONDITION: "New",
    },
    {
      id: 2,
      BRANDNAME: Acer,
      MODELNAME: "Acer Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION:
        "Acer Laptop 14-ec0036AU,AMD Acer Laptop 14-ec0036AU,AMD Acer Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "80",
      CONDITION: "New",
    },
    {
      id: 3,
      BRANDNAME: Apple,
      MODELNAME: "Apple Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION:
        "Apple Macbook 14-ec0036AU,AMD Apple Macbook 14-ec0036AU,AMD Apple Macbook 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "1,10,999",
      INSTOCK: "100",
      CONDITION: "New",
    },
    {
      id: 4,
      BRANDNAME: Lenovo,
      MODELNAME: " Lenovo Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION:
        "Lenovo Laptop 14-ec0036AU,AMD Lenovo Laptop 14-ec0036AU,AMD Lenovo Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "70",
      CONDITION: "New",
    },

    {
      id: 5,
      BRANDNAME: Samsung,
      MODELNAME: "Samsung Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION: "samsung Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "100",
      CONDITION: "New",
    },
    {
      id: 6,
      BRANDNAME: HP,
      MODELNAME: "HP Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION: "Xiaomi Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "90",
      CONDITION: "New",
    },
    {
      id: 7,
      BRANDNAME: Apple,
      MODELNAME: "Apple Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION: "HP Pavilion Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "100",
      CONDITION: "New",
    },
    {
      id: 8,
      BRANDNAME: Acer,
      MODELNAME: "Acer Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION: "HP Pavilion Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "100",
      CONDITION: "New",
    },
    {
      id: 9,
      BRANDNAME: Lenovo,
      MODELNAME: "Lenovo Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION: "HP Pavilion Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "100",
      CONDITION: "New",
    },
    {
      id: 10,
      BRANDNAME: HP,
      MODELNAME: "HP Model14",
      PARTNUMBER: "1135G7",
      DESCRIPTION: "HP Pavilion Laptop 14-ec0036AU,AMD",
      HUB: "Dubai",
      MOQ: "50",
      PRICE: "66,999",
      INSTOCK: "100",
      CONDITION: "New",
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
    onCellClick: onRowHandleClick,
    search: false,
  };

  return (
    <div className={producttable}>
      {/* <MUIDataTable
        title={""}
        data={Productstablelist}
        columns={columns}
        options={options}
        className={mui_datatable_main}
      /> */}
      <MUITable
        columns={columns}
        table={Productstablelist}
        options={options}
        className={mui_datatable_main}
      />
    </div>
  );
};

export default withStyles(styles)(Productstable);
