import React, { useState, useEffect } from "react";
import {
  Typography,
  Pagination,
  Autocomplete,
  TextField,
  PaginationItem,
} from "@mui/material";
import "./styles.scss";

const firstIndex = 0;
const PaginationControlled = ({ PaginateData, DataList, PagePerRow }) => {
  const [pageSize, setPageSize] = useState(PagePerRow);
  const [page, setPage] = useState({
    page: "1",
    jumptopage: [],
    option: [],
  });

  useEffect(() => {
    PaginateData(DataList?.slice(0, pageSize));
    var RoundedValue = Math.round(DataList?.length / PagePerRow);
    var JumpToPageOptionValues = Array(RoundedValue === 0 ? 1 : RoundedValue)
      ?.fill(1)
      ?.map((item, idx) => (idx + 1).toString());
    setPage((prevState) => ({
      ...prevState,
      option: JumpToPageOptionValues,
    }));
  }, [pageSize]);

  const handleChange = (event, value) => {
    setPage((prevState) => ({
      ...prevState,
      page: value?.toString(),
    }));
    PaginateData(
      DataList?.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };

  //Jump to page
  const handleJumpToPage = (event, value) => {
    setPage((prevState) => ({
      ...prevState,
      page: value,
    }));
    PaginateData(
      DataList?.slice(firstIndex + pageSize * (value - 1), pageSize * value)
    );
  };
  return (
    <div className="pagination_top_container">
      <div className="pagination_sub_container">
        <Typography>Page :</Typography>
        <Pagination
          count={Math.ceil(DataList?.length / pageSize)}
          page={page?.page}
          onChange={handleChange}
          renderItem={(item) => <PaginationItem {...item} />}
          hideNextButton={true}
          hidePrevButton={true}
        />
      </div>
      <div className="jump_to_page">
        <p>Jump to page :</p>
        <Autocomplete
          value={page?.page}
          name="jump_to_page"
          onChange={(event, newValue) => {
            handleJumpToPage(event, newValue);
          }}
          id="controllable-states-demo"
          options={page?.option}
          renderInput={(params) => (
            <TextField
              type="number"
              placeholder="1"
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
