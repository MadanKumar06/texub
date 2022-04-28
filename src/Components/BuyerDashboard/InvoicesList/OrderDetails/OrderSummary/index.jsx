import React, { useState, useEffect } from "react";
import { ArrowBackIosNew } from "@mui/icons-material";
import { Link } from "react-router-dom";

import image from "../../../../../Assets/buyerdashboard/auctions/hp.png";
import minicart_new from "../../../../../Assets/Minicart/minicart_new.png";
import "./styles.scss";

function Index() {

   const [isCartData, setIsCartData] = useState(0);
   useEffect(() => {
     setIsCartData(minicartListJson);
   }, []);


  const minicartListJson = [
    {
      modal_image: { image },
      model_name: "PAVILION MODEL14-DV0054TU",
      description:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      quantity: "3",
      hub: "MUMBAI",
      symbol: "INR",
      price: " 2,000,000",
    },
    {
      modal_image: { image },
      modal_tag: { minicart_new },
      model_name: "PAVILION MODEL14-DV0054TU",
      description:
        "Hp 14-Dv0054Tu Pavilion Laptop (11Th Gen Intel Core I5-1135G7/…512Gb Sdd/Intel Iris Xe Graphics/Windows 10/Mso/Fhd), 35.56 Cm (14 Inch)",
      quantity: "3",
      hub: "MUMBAI",
      symbol: "INR",
      price: " 2,000,000",
    },
  ];

  return (
    <div className="order_summary_top">
      <div className="orde_summary_title">
        <span>Summary</span>
      </div>

      <div className="order_table_info">
        <div className="invoice_order_list_content">
          {isCartData?.length &&
            isCartData?.map((itm, index) => (
              <div className="order_summary_section">
                <div className="product_img">
                  <div className="logo_tag">
                    <img src={image} alt="" className="logo" />
                    <img src={minicart_new} alt="" className="tag" />
                  </div>
                </div>
                <div className="order_info_section">
                  <span className="product_name">{itm?.model_name}</span>
                  <span className="product_description">
                    {itm?.description}
                  </span>
                  <div className="product_hub_qty">
                    <span className="qty">
                      <span className="qty_title">Qty : </span>
                      {itm?.quantity}
                    </span>
                    <span className="hub">
                      <span className="hub_title">Hub : </span>
                      {itm?.hub}
                    </span>
                  </div>
                  <div className="total_block">
                    <span className="title">Price : </span>
                    <span className="value">
                      <span className="symbol">{itm?.symbol}</span> {itm?.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

       <div className="myorders">
          <div className="my_orders__footer">
            <div className="my_orders__container">
              <Link to={"/"}>
                <ArrowBackIosNew />
                <span>Back</span>
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Index;
