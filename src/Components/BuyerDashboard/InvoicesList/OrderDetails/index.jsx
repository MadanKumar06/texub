import React, { useState, useEffect } from "react";
import OrderInfo from "../OrderDetails/OrderInfo";
import OrderSummary from "../OrderDetails/OrderSummary";

function Index() {
  return (
    <div className="Nav">
      <OrderInfo />
      <OrderSummary />
    </div>
  );
}

export default Index;

