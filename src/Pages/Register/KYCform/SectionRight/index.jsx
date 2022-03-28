import React from "react";
import {
  TextField,
  MenuItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Select,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import clsx from "clsx";
import OfficeAddressDetails from "./OfficeAddressDetails";
import ValidationForKycForm from "../ValidationForKycForm";

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
    category_select_option,
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
  const [categorylist, setCategorylist] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategorylist(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
        <div className={input_fields}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            fullWidth
            className={category_select_option}
            value={categorylist}
            onChange={handleChange}
            renderValue={(selected) => {
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {names?.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={categorylist?.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </div>
        {categorylist?.includes("other") && (
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
