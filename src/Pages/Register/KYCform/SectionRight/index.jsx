import React, { useState, useEffect } from "react";
import { TextField, Checkbox } from "@mui/material";

import axios from "axios";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import clsx from "clsx";
import OfficeAddressDetails from "./OfficeAddressDetails";
import ValidationForKycForm from "../ValidationForKycForm";

import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Constant from "../../../../Constant";

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
  const handleCallValidation = (event) => {
    setValidationFieldMessage(event);
  };
  const [kycCategoryList, setKycCategoryList] = useState([]);

  //API for fetch dropdown values
  useEffect(() => {
    const fetchCountryData = () => {
      axios
        .get(Constant.baseUrl() + "/getkyccategories", {
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
            value={FormValues?.categorylist}
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
            onChange={(event, newValue) => {
              SetFormValues((prevState) => ({
                ...prevState,
                categorylist: newValue,
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Category List" />
            )}
          />
          {FormValues?.categorylist?.some(
            (itm) => itm?.category_name === "Others"
          ) && (
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
