import React from "react";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";

export const Products = () => {
  return (
    <div className="products">
      <Productlists />
      <Productsbrands />
      <Productstable />
    </div>
  );
};
