import React from "react";
import "./styles.scss";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  Box,
} from "@mui/material";
import Icon2 from "../../../Assets/Productlist/Deals_Icon.png";
import Icon3 from "../../../Assets/Productlist/Downloader.png";
import Icon4 from "../../../Assets/Productlist/Up_arrow.png";
import Icon5 from "../../../Assets/Productlist/Download_icon.png";
import { Tune, Search } from "@mui/icons-material";
const Productlists = () => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="productlist">
      <div className="sidebar-toggle">
        <Tune className="product_menu_filter" />
      </div>
      <div className="productlist__deal">
        <div className="productlist__deal__image">
          <img src={Icon2} alt="" />
        </div>
        <span className="productlist__todaytext">Today's Deal</span>
      </div>

      <div className="productlist__down">
        <img src={Icon3} alt="" />
      </div>

      <div className="productlist__up">
        <img src={Icon4} alt="" />
      </div>

      <div className="productlist__search">
        <TextField
          size="small"
          placeholder="Search Products Here…"
          variant="standard"
          className="search_input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="search_icon"></Search>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_hub">
          <InputLabel id="demo-simple-select-label">All Hubs</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_condition">
          <InputLabel id="demo-simple-select-label">All Conditions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth className="product_dropdown_price">
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div className="productlist__download">
        <img src={Icon5} alt="" />
      </div>
    </div>
  );
};

export default Productlists;
