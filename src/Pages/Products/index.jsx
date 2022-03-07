import React from "react";
import "./styles.scss";
import Productsbrands from "../../Components/ProductPagePLP/Productbrands";
import Productlists from "../../Components/ProductPagePLP/Productlists";
import Productstable from "../../Components/ProductPagePLP/Producttable";

export const Products = () => {
  return (
    <div className="products">
      <Productlists />
      <Productsbrands />
      <Productstable />
      <div className="products_want_to_buy">
        <p>
          <span>Want to buy</span>
        </p>
      </div>
    </div>
  );
};
