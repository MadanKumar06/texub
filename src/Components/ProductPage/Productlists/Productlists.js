import React, { useState } from "react";
import "./Productlists.scss";
import Products1 from "../../Filters";
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import Icon1 from "../../../Assets/Productlist/Slide_icon.png";
import Icon2 from "../../../Assets/Productlist/Deals_Icon.png";
import Icon3 from "../../../Assets/Productlist/Downloader.png";
import Icon4 from "../../../Assets/Productlist/Up_arrow.png";
import Icon5 from "../../../Assets/Productlist/Download_icon.png";

const Productlists = () => {
  const [isClick, setisClick] = useState(true);
  const List = () => {
    setisClick(!isClick);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="productlist">
      <div className="productlist__menu">
        <img src={Icon1} alt="" />
      </div>

      <div className="productlist__deal">
        <span className="productlist__deal__image">
          <img src={Icon2} alt="" />
        </span>
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
          id="standard-basic"
          label="Search Product Here..."
          variant="standard"
          className="productlist__search__field"
        />
      </div>

      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">All Hubs</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">
          All Conditions
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-helper-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <div className="productlist__download">
        <img src={Icon5} alt="" />
      </div>
    </div>
  );
};

export default Productlists;
