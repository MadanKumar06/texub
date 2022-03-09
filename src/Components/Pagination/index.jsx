import React, { useState, useEffect } from "react";
import { Typography, Pagination, Autocomplete, TextField } from "@mui/material";
import "./styles.scss";

const firstIndex = 0;
const PaginationControlled = ({ PaginateData, DataList, PagePerRow }) => {
  const [pageSize, setPageSize] = useState(PagePerRow);
  const [page, setPage] = useState(1);

  useEffect(() => {
    PaginateData(DataList?.slice(0, pageSize));
  }, [pageSize]);

  const handleChange = (event, value) => {
    setPage(value);
    PaginateData(
      DataList?.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };

  //Jump to page
  const handleJumpToPage = (event, value) => {
    setPage(value);
    PaginateData(
      DataList?.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };
  const options = [10, 20, 30, 40, 50];
  return (
    <div className="pagination_top_container">
      <div className="pagination_sub_container">
        <Typography>Page :</Typography>
        <Pagination
          count={Math.ceil(DataList?.length / pageSize)}
          page={page}
          onChange={handleChange}
          hideNextButton={true}
          hidePrevButton={true}
        />
      </div>
      <div className="jump_to_page">
        <p>Jump to page :</p>
        <Autocomplete
        //   value={pageSize}
          name="jump_to_page"
        //   onChange={(event, newValue) => {
        //     handleJumpToPage(event, newValue);
        //   }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => (
            <TextField
              type="number"
              placeholder="10"
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};
export default PaginationControlled;
