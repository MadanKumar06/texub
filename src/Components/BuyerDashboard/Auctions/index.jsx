import React, { useState, useEffect } from "react";
import "./styles.scss";
import AuctionCard from "./AuctionCard/Index";
import { Button } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

function Index() {
  const [tableData, setTableData] = useState([]);

  const auctiondata = [
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
    {
      name: "Acer Sf314-42 Swift 3",
      content: "Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd/…",
      auctionstart: "03 Sep 21 / 09:00 am",
      auctionend: "21 Sep 21 / 09:00 am",
      active: 50,
      current: "68,999",
      bid: true,
      status: "Active",
      yourbid: "55999",
      lot: "Lot # AC-258",
    },
    {
      name: "Acer Sf314-42 Swift 3",
      content: "Acer Sf314-42 Swift 3 Laptop (Amd R5-4500U/8 Gb/512 Gb Hdd/…",
      auctionstart: "03 Sep 21 / 09:00 am",
      auctionend: "21 Sep 21 / 09:00 am",
      active: 50,
      current: "68,999",
      bid: true,
      status: "InActive",
      lot: "Lot # AC-355",
    },
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
    {
      name: "Pavilion Model14-Dv0054Tu",
      content:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      auctionstart: "25 Dec 21 / 09:00 am",
      auctionend: "05 Jan 22 / 09:00 am",
      active: 0,
      current: "68,999",
      bid: false,
      status: "Yet to Start",
      lot: "Lot # AC-234",
    },
  ];

  const auctiontype = [
    { name: "All Auctions" },
    { name: "Upcomming Auctions" },
    { name: "Live Auctions" },
    { name: "Completed Auctions" },
  ];
  const PaginateDataSplit = (event) => {
    setTableData(event);
  };
  const [type, settype] = useState();

  const selectorder = (value) => {
    settype(value);
  };

  useEffect(() => {
    selectorder(0)
  }, [])
  return (
    <div className="auctions">
      <div className="auctions__buttons">
        {auctiontype.map((data, i) => (
          <p
            className={`ordertypes ${type === i && "auctions__selected"}`}
            key={i}
            onClick={() => selectorder(i)}
          >
            {data.name}
          </p>
        ))}
      </div>

      <div className="auctions__card">
        {/* <AuctionCard /> */}
        <ul>
          {tableData?.map((data, i) => (
            <li key={i}>
              <AuctionCard data={data} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        PaginateData={PaginateDataSplit}
        DataList={auctiondata}
        PagePerRow={5}
      />

      <div className="auctions__footer">
        <div className="auctions__container">
          <Link to="/buyerdashboard/dashboard">
            <ArrowBackIosNew />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
