import React, { useState } from "react";
import "./Products.css";
import Productsbrands from "../../Components/ProductPage/Productbrands/Productsbrands";
import Productlists from "../../Components/ProductPage/Productlists/Productlists";
import Productstable from "../../Components/ProductPage/Producttable/Productstable";
import PDPpopUp from "../PDPpopUp";

export const Products = () => {
  const [isPDPpopUP, setIsPDPpopUP] = useState(false);
  const PDPPopUP = (event) => {
    setIsPDPpopUP(event);
  };
  return (
    <div className="products">
      <div>
        <button onClick={() => setIsPDPpopUP(true)}>PDP Popup</button>
      </div>
      <Productlists />
      <Productsbrands />
      <Productstable />
      {isPDPpopUP && <PDPpopUp PDPPopUP={PDPPopUP} />}
    </div>
  );
};
