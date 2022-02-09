import React from "react";
import "./Products.css";
import Productsbrands from "../../Components/ProductPage/Productbrands/Productsbrands";
import Productlists from "../../Components/ProductPage/Productlists/Productlists";
import Productstable from "../../Components/ProductPage/Producttable/Productstable";
import Slider from "react-slick";

export const Products = () => {
  return (
    <div className="products">
      <Productlists />
      <Productsbrands />
      <Productstable />
    </div>
  );
};
