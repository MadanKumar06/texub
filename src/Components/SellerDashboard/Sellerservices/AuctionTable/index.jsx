import React, { useState } from 'react'
import './styles.scss'
import MUITable from '../../../Common/MUITable'
import { useNavigate } from "react-router-dom";
import hp from "../../../../Assets/sellerdashboard/inventory/hp.png";
import Pagination from "../../../Pagination";
import {useStateValue} from '../../../../store/state'
import NodataFound from "../../../../Assets/CommonImage/NodataFound.webp.png";


function Index({ setrequestform, setformtype }) {
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const history = useNavigate();
  const [{geo, customnostore}, dispatch] = useStateValue()

  const showformnew = () => {
    setrequestform(true);
    setformtype("New");
  };

  const showformupdate = () => {
    setrequestform(true);
    setformtype("Update");
  };

  const back = () => {
    history(`/${customnostore ? customnostore : geo?.country_name}`);
  };

  const options = {
    filter: false,
    filterType: "dropdown",
    responsive: "vertical",
    selectableRows: "none",
    pagination: false,
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

  const table = [
    {
      auctionid: "000006",
      startdate: "25 Dec 21 / 09:00 am",
      enddate: "05 Jan 22 / 09:00 am",
      pdetails: {
        title: "Pavilion Model14-Dv0054Tu",
        content:
          "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      },
      qty: "100",
      price: "68,99900",
      status: "Active",
      Action: "Update",
    },
    {
      auctionid: "000007",
      startdate: "05 July 21 / 09:00 am",
      enddate: "17 July 22 / 09:00 am",
      pdetails: {
        title: "Apple Macbook Pro",
        content: "Apple Macbook Pro Mvvj2Hn/A 2.6Ghz 6-Core 9Th-Gen I7, 16Gb",
      },
      qty: "80",
      price: "68,99900",
      status: "Active",
      Action: "Update",
    },
  ];

  const columns = [
    {
      name: "auctionid",
      label: "Auction ID",
      options: {
        customBodyRender: (value) => {
          return <div className="auctiontable__auctionid">{value}</div>;
        },
      },
    },
    { name: "startdate", label: "Start Date & Time" },
    { name: "enddate", label: "End Date & Time" },
    {
      name: "pdetails",
      label: "Product Details",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="auctiontable__pdetails">
              <div className="pdetails__image">
                <img src={hp} alt="" />
              </div>
              <div className="pdetails__details">
                <div className="details__title">{value.title}</div>
                <div className="details__content">{value.content}</div>
              </div>
            </div>
          );
        },
      },
    },
    { name: "qty", label: "Qty" },
    {
      name: "price",
      label: "Price",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="auctiontable__price">
              <span className="label">INR </span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="auctiontable__status">
              {value}
              <span className="status__active"></span>
            </div>
          );
        },
      },
    },
    {
      name: "Action",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="auctiontable__action" onClick={showformupdate}>
              {value}
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="auctiontable">

      <MUITable columns={columns} table={tableData} options={options}  />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />
      <div className="auctiontable__submit">
        <span className="auctiontable__back" onClick={back}>
          Back
        </span>
        <p onClick={showformnew} className="submit__new">
          Create New Request
        </p>
      </div>
    </div>
  );
}

export default Index;
