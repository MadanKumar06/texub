import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Select,
} from "@mui/material";

import axios from "axios";
import baseUrl from "../../../../Constant";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import clsx from "clsx";
import OfficeAddressDetails from "./OfficeAddressDetails";
import ValidationForKycForm from "../ValidationForKycForm";

import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const BuyerKYCformSectionRight = ({
  classes,
  handleClose,
  SetFormValues,
  FormValues,
  validationFieldMessage,
  setValidationFieldMessage,
  documentButton,
  setDocumentButton,
  checkbox_label,
}) => {
  let {
    section_right_container,
    info_text_lineNote_two,
    auto_complete_input,
    input_fields,
    download_link,
  } = classes;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleCallValidation = (event) => {
    setValidationFieldMessage(event);
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
    "other",
  ];
  const [kycCategoryList, setKycCategoryList] = useState([]);
  const [categorylist, setCategorylist] = React.useState();

  //API for fetch dropdown values
  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(baseUrl + "/getkyccategories", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setKycCategoryList(res?.data);
        })
        .catch((err) => {});
    };
    fetchCountryData();
  }, []);
  const handleChange = (event, value) => {
    setCategorylist(value);
  };

  const handleFormvalue = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <div className={section_right_container}>
      <OfficeAddressDetails
        SetFormValues={SetFormValues}
        FormValues={FormValues}
        validationFieldMessage={validationFieldMessage}
      />
      <>
        <p className={info_text_lineNote_two}>Categories</p>
        <div>
          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={kycCategoryList}
            disableCloseOnSelect
            className={clsx(auto_complete_input, "inputfield-box")}
            value={categorylist}
            getOptionLabel={(option) => option.category_name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.category_name}
              </li>
            )}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} placeholder="Category List" />
            )}
          />
          {categorylist?.some((itm) => itm?.category_name === "Others") && (
            <div className={clsx(input_fields)}>
              <TextField
                id="other category"
                label="Other Category"
                fullWidth
                className="inputfield-box"
                placeholder="other category"
                InputLabelProps={{
                  shrink: true,
                }}
                name="other_category"
                value={FormValues?.other_category}
                onChange={handleFormvalue}
                variant="outlined"
              />
            </div>
          )}
        </div>
      </>
      <FormControlLabel
        value="yes"
        control={<Checkbox color="secondary" />}
        label="By clicking here, I state that I have read and understood the terms of agreement"
        labelPlacement="end"
        className={download_link}
      />
      <ValidationForKycForm
        values={FormValues}
        handleCallValidation={handleCallValidation}
        setDocumentButton={setDocumentButton}
        documentButton={documentButton}
      />
    </div>
  );
};
export default withStyles(styles)(BuyerKYCformSectionRight);
