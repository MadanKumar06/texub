import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router-dom";
import { withStyles } from "@mui/styles";
import styles from "./styles";
import OfficeAddressDetails from "./OfficeAddressDetails";
import ValidationForKycForm from "../ValidationForKycForm";

const BuyerKYCformSectionRight = ({
  classes,
  handleClose,
  SetFormValues,
  FormValues,
  validationFieldMessage,
  setValidationFieldMessage,
}) => {
  let { type } = useParams();
  let {
    section_right_container,
    info_text_lineNote_two,
    category_select_option,
    input_fields,
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
    debugger;
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
  ];
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className={section_right_container}>
      <OfficeAddressDetails
        SetFormValues={SetFormValues}
        FormValues={FormValues}
        validationFieldMessage={validationFieldMessage}
      />
      <div>
        <p className={info_text_lineNote_two}>Categories</p>
        <div className={input_fields}>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            fullWidth
            className={category_select_option}
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              return selected.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <ValidationForKycForm
        values={FormValues}
        handleCallValidation={handleCallValidation}
      />
    </div>
  );
};
export default withStyles(styles)(BuyerKYCformSectionRight);
