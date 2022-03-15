import React, { useState } from "react";
import styles from "./styles";

import { withStyles } from "@mui/styles";
import MUITable from '../../MUITable'
import PDPpopUp from "../../../Pages/PDPpopUp";
import { Link } from "react-router-dom";

import HP from "./../../../Assets/Productlist/hp_td_icon.png";
import Acer from "../../../Assets/Productlist/acer_icon_td.png";
import Apple from "../../../Assets/Productlist/apple_icon_td.png";
import Lenovo from "../../../Assets/Productlist/lenovo_icon_td.png";
import Samsung from "../../../Assets/Productlist/samsung_icon.png";
import shopping_cart from "../../../Assets/CommonImage/shopping-cart.png";
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
// import ViewListIcon from '@mui/icons-material/ViewList';
const Productstable = ({ classes }) => {
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
  const [isPDPpopUP, setIsPDPpopUP] = useState(false);
  const PDPPopUP = (event) => {
    setIsPDPpopUP(event);
  };
  const onRowHandleClick = (rowData, rowState, rowMeta) => {
    if (rowState?.colIndex !== 9) {
      setIsPDPpopUP(true);
    }
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
          return <div className={producttable_description}>{value}</div>;
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
      label:<div className={producttable_heading_icon}>
      <ListOutlinedIcon/>
      <ZoomOutMapOutlinedIcon/>
      </div>,
      options: {
        customBodyRender: (value) => {
          return (
            <Link to="/mycart">
              <p className={producttable_add_to_cart}>
                View Product
              </p>
            </Link>
          );
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
      DESCRIPTION: "Acer Laptop 14-ec0036AU,AMD",
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
      DESCRIPTION: "Apple Macbook 14-ec0036AU,AMD",
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
      DESCRIPTION: "Lenovo Laptop 14-ec0036AU,AMD",
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
      <MUITable columns={columns} table={Productstablelist} options={options} className={mui_datatable_main} />
      {isPDPpopUP && <PDPpopUp PDPPopUP={PDPPopUP} />}
    </div>
  );
};

export default withStyles(styles)(Productstable);
