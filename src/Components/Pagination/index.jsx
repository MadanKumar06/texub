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
  const [page, setPage] = useState({
    page: 1,
    jumptopage: "1",
    option: [],
  });

  useEffect(() => {
    //pagination data as props
    PaginateData(DataList?.slice(0, PagePerRow));

    let RoundedValue = DataList?.length / PagePerRow;
    let Rounded =
      RoundedValue % 1 === 0 ? RoundedValue : parseInt(RoundedValue + 1);

    //create array for jump to page options
    var JumpToPageOptionValues = Array(Rounded === 0 ? 1 : Rounded)
      ?.fill(1)
      ?.map((item, idx) => idx + 1);

    setPage((prevState) => ({
      ...prevState,
      option: JumpToPageOptionValues,
    }));
  }, [PagePerRow]);

  const handleChange = (event, value) => {
    setPage((prevState) => ({
      ...prevState,
      page: value,
    }));
    PaginateData(
      DataList?.slice(firstIndex + PagePerRow * (value - 1), PagePerRow * value)
    );
  };

  //Jump to page
  const handleJumpToPage = (event, value) => {
    setPage((prevState) => ({
      ...prevState,
      jumptopage: value?.toString,
    }));
    PaginateData(
      DataList?.slice(firstIndex + PagePerRow * (value - 1), PagePerRow * value)
    );
  };
  return (
    <div className="pagination_top_container">
      <div className="pagination_sub_container">
        <Typography>Page :</Typography>
        <Pagination
          count={Math.ceil(DataList?.length / PagePerRow)}
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
          value={page?.jumptopage?.toString()}
          name="jump_to_page"
          onChange={(event, newValue) => {
            handleJumpToPage(event, newValue);
          }}
          id="controllable-states-demo"
          options={page?.option}
          getOptionLabel={(option) => option?.toString()}
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
