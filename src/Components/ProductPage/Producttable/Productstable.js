import React, { useEffect, useState } from "react";
import "./Productstable.scss";
import "./Producttable_Media.css";
import HP from "./../../../Assets/Productlist/hp_td_icon.png";
import Acer from "../../../Assets/Productlist/acer_icon_td.png";
import Apple from "../../../Assets/Productlist/apple_icon_td.png";
import Lenovo from "../../../Assets/Productlist/lenovo_icon_td.png";
import Samsung from "../../../Assets/Productlist/samsung_icon.png";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const Productstable = () => {
  const [isClick, setisClick] = useState(false);
  const [onClick, setonClick] = useState(false);
  const SortBy = () => {
    setonClick(!onClick);
  };
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
      PRICE: "INR 66,999 ",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 1,10,999",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 66,999",
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
      PRICE: "INR 66,999",
      INSTOCK: "100",
      CONDITION: "New",
    },
  ];

  const headings = [
    {
      field: "BRANDNAME",
      headerName: "BRAND NAME",
      width: 200,
      height: 100,
      renderCell: (params) => <img src={params.BRANDNAME} />,
    },
    { field: "MODELNAME", headerName: "MODEL NAME", width: 200 },
    { field: "PARTNUMBER", headerName: "PART NUMBER", width: 120 },
    { field: "DESCRIPTION", headerName: "DESCRIPTION", width: 300 },
    { field: "HUB", headerName: "HUB", width: 150 },
    { field: "MOQ", headerName: "MOQ", width: 150 },
    { field: "PRICE", headerName: "Price", width: 150 },
    { field: "INSTOCK", headerName: "IN STOCK", width: 150 },
    { field: "CONDITION", headerName: "CONDITION", width: 150 },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="producttable" style={{ height: "60vh", width: "97%" }}>
      <DataGrid
        columns={headings}
        rows={Productstablelist}
        pageSize={10}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default Productstable;
