import React, { useState } from 'react'
import './styles.scss'
import MUITable from '../../../Common/MUITable'
import { useNavigate } from "react-router-dom";
import hp from "../../../../Assets/sellerdashboard/inventory/hp.png";
import Pagination from "../../../Pagination";
import { useStateValue } from '../../../../store/state';

function Index() {
  const history = useNavigate();
  const [{geo, customnostore}, dispatch] = useStateValue()
  const back = () => {
    history(`/${customnostore ? customnostore : geo?.country_name}`);
  };
  const [tableData, setTableData] = useState([]);
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
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

  const table = [
    {
      auctionid: "000000006",
      buyercode: "BU201200",
      pdetails: {
        title: "Pavilion Model14-Dv0054Tu",
        content:
          "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      },
      currentbid: "68,99900",
      buyerbid: "66,99900",
      action: "",
    },
    {
      auctionid: "000000007",
      buyercode: "BU201201",
      pdetails: {
        title: "Acer Sf314-42 Swift 3",
        content: "Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd",
      },
      currentbid: "68,99900",
      buyerbid: "67,99900",
      action: "",
    },
  ];

  const columns = [
    {
      name: "auctionid",
      label: "Auction ID",
      options: {
        customBodyRender: (value) => {
          return <div className="resulttable__auctionid">{value}</div>;
        },
      },
    },
    { name: "buyercode", label: "Buyer Code" },
    {
      name: "pdetails",
      label: "Product Details",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="resulttable__pdetails">
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
    {
      name: "currentbid",
      label: "Current Bid",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="resulttable__currentid">
              <span className="label">INR</span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "buyerbid",
      label: "Buyer`s Bid",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="resulttable__buyerid">
              <span className="label">INR</span>
              <span className="value">{value}</span>
            </div>
          );
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div className="resulttable__action">
              <span className="accept">Accept</span>
              <span className="reject">Reject</span>
            </div>
          );
        },
      },
    },
  ];

  return (
    <div className="resulttable">
      <MUITable columns={columns} table={tableData} options={options}  />
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={table}
        PagePerRow={10}
      />
      <div className="resulttable__submit">
        <span className="resulttable__back" onClick={back}>
          Back
        </span>
        <p className="submit__new">Create New Request</p>
      </div>
    </div>
  );
}

export default Index;
