import React from "react";
import "./styles.scss";

import { Clear } from "@mui/icons-material";

const FilterViewList = ({ handleSideBarClose }) => {
  return (
    <div className="filterView_list_main">
      <Clear
        className="clear_btn"
        onClick={() => handleSideBarClose("left", false)}
      />
      <div className="filter_view_cards">
        <div className="sub_filter_view_cards">
          <div className="filter_by_condtion">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterViewList;
