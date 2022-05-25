import React, { useState, useEffect } from "react";
import {
  Typography,
  Pagination,
  Autocomplete,
  TextField,
  PaginationItem,
} from "@mui/material";
import "./styles.scss";
import { useStateValue } from "../../store/state";

const firstIndex = 0;
const PaginationControlled = ({ PaginateData, DataList, PagePerRow }) => {
  const [{ geo, customnostore }, dispatch] = useStateValue();
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
    window.scrollTo(0, 0);
  }, [PagePerRow, DataList]);

  const handleChange = (event, value) => {
    setPage((prevState) => ({
      ...prevState,
      page: value,
      jumptopage: value?.toString(),
    }));
    PaginateData(
      DataList?.slice(firstIndex + PagePerRow * (value - 1), PagePerRow * value)
    );
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/invoiceslist`
    ) {
      localStorage.setItem("invoicepage", JSON.stringify(value));
    } else {
      localStorage.setItem("invoicepage", JSON.stringify(1));
    }
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wishlist`
    ) {
      localStorage.setItem("wishpage", JSON.stringify(value));
    } else {
      localStorage.setItem("wishpage", JSON.stringify(1));
    }
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wanttobuy`
    ) {
      localStorage.setItem("wtbpage", JSON.stringify(value));
    } else {
      localStorage.setItem("wtbpage", JSON.stringify(1));
    }
    if (
      window.location.pathname ===
      `/${customnostore ? customnostore : geo?.country_name}/products`
    ) {
      localStorage.setItem("productpage", JSON.stringify(value));
    } else {
      localStorage.setItem("productpage", JSON.stringify(1));
    }

    if (
      window.location.pathname ===
      `/${customnostore ? customnostore : geo?.country_name}/sellerdashboard/directenquiries`
    ) {
      localStorage.setItem("enquirypage", JSON.stringify(value));
    } else {
      localStorage.setItem("enquirypage", JSON.stringify(1));
    }
    if (
      window.location.pathname ===
      `/${customnostore ? customnostore : geo?.country_name}/sellerdashboard/smart-recommendation`
    ) {
      localStorage.setItem("smartpage", JSON.stringify(value));
    } else {
      localStorage.setItem("smartpage", JSON.stringify(1));
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let storedpage = 1;
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/invoiceslist`
    ) {
      let invoicepage = JSON.parse(localStorage.getItem("invoicepage"));
      storedpage =
        parseInt(invoicepage) > page?.option?.length
          ? page?.option?.length
          : parseInt(invoicepage);
    }
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wishlist`
    ) {
      let wishpage = JSON.parse(localStorage.getItem("wishpage"));
      storedpage =
        parseInt(wishpage) > page?.option?.length
          ? page?.option?.length
          : parseInt(wishpage);
    }
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/buyerdashboard/wanttobuy`
    ) {
      let wanttobuy = JSON.parse(localStorage.getItem("wtbpage"));
      storedpage =
        parseInt(wanttobuy) > page?.option?.length
          ? page?.option?.length
          : parseInt(wanttobuy);
    }
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/sellerdashboard/directenquiries`
    ) {
      let enquirypage = JSON.parse(localStorage.getItem("enquirypage"));
      storedpage =
        parseInt(enquirypage) > page?.option?.length
          ? page?.option?.length
          : parseInt(enquirypage);
    }
    if (
      window.location.pathname ===
      `/${customnostore ? customnostore : geo?.country_name}/products`
    ) {
      let productpage = JSON.parse(localStorage.getItem("productpage"));
      storedpage =
        parseInt(productpage) > page?.option?.length
          ? page?.option?.length
          : parseInt(productpage);
    }
    if (
      window.location.pathname ===
      `/${
        customnostore ? customnostore : geo?.country_name
      }/sellerdashboard/smart-recommendation`
    ) {
      let smartpage = JSON.parse(localStorage.getItem("smartpage"));
      storedpage =
        parseInt(smartpage) > page?.option?.length
          ? page?.option?.length
          : parseInt(smartpage);
    }
    if (storedpage === null) return;
    setPage((prevState) => ({
      ...prevState,
      page: storedpage,
      jumptopage: storedpage?.toString(),
    }));
    PaginateData(
      DataList?.slice(
        firstIndex + PagePerRow * (storedpage - 1),
        PagePerRow * storedpage
      )
    );
  }, [
    localStorage.getItem("wishpage"),
    PagePerRow,
    customnostore,
    geo,
    page?.option?.length,
    DataList
  ]);

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
          value={page?.jumptopage}
          name="jump_to_page"
          onChange={(event, newValue) => {
            handleChange(event, newValue);
          }}
          id="controllable-states-demo"
          options={page?.option}
          getOptionLabel={(option) => option?.toString()}
          renderInput={(params) => (
            <TextField
              type="number"
              placeholder="1"
              className="inputfield-box"
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
