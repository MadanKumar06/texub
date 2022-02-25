import React from "react";
import "./styles.scss";

import WhishlistTableData from "./whishlistJson";
import WhislistTable from "./WhishlistTable";

const Whislist = () => {
  return (
    <div className="wishlist_main_container">
      <div>
        {WhishlistTableData?.map((itm) => (
          <WhislistTable
            tableData={itm?.Product_details}
            tableDataHeader={itm?.Top_product}
          />
        ))}
      </div>
    </div>
  );
};

export default Whislist;
