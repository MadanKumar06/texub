import React, { useState } from "react";
import "./styles.scss";
import MUITable from "../../../Common/MUITable";
import hp from "../../../../Assets/sellerdashboard/inventory/hp.png";
import Pagination from "../../../Pagination";
function Index({ registerproduct, gridData }) {
  console.log(gridData)
  const [tableData, setTableData] = useState([]);
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

  const columns = [
    {
      name: "logo",
      label: " ",
      options: {
        customBodyRender: (value) => {
          return <img src={value} alt="" />;
        },
      },
    },
    {
      name: "pname",
      label: "PRODUCT NAME",
      options: {
        customBodyRender: (value) => {
          return <div className="product">{value} </div>;
        },
      },
    },
    {
      name: "category",
      label: "CATEGORY",
    },
    {
      name: "sku",
      label: "SKU",
    },
    {
      name: "product_id",
      label: "ACTION",
      options: {
        customBodyRender: (value) => {
          return (
            <div
              className="productGrid__action"
              onClick={() => registerproduct("addproduct", value,"addNew")}
            >
              Sell Yours
            </div>
          );
        },
      },
    },
  ];

  const table = [
    {
      logo: hp,
      pname:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      category: "Laptop",
      sku: "SK-3102",
    },
    {
      logo: hp,
      pname: "Lenovo Dpin Yoga 6 Convertible (Amd Ryzen 7-5700U/16Gb/1Tb Ssd/…",
      category: "Laptop",
      sku: "SK-3102",
    },
    {
      logo: hp,
      pname: "Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd/…",
      category: "Laptop",
      sku: "SK-3102",
    },
    {
      logo: hp,
      pname: "Apple Macbook Pro Mvvj2Hn/A 2.6Ghz 6-Core 9Th-Gen I7, 16Gb, …",
      category: "Laptop",
      sku: "SK-3102",
    },
    {
      logo: hp,
      pname: "Apple Macbook Pro Mvvj2Hn/A 2.6Ghz 6-Core 9Th-Gen I7, 16Gb, …",
      category: "Laptop",
      sku: "SK-3102",
    },
  ];
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  return (
    <div className="productGrid_inventory">
      <MUITable
        columns={columns}
        table={tableData}
        options={options}
        className="productGrid__table"
      />

      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={gridData}
        PagePerRow={4}
      />
    </div>
  );
}

export default Index;
