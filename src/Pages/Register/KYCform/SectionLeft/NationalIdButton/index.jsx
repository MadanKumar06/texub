import React, { useState, useEffect } from "react";
import styles from "../styles";
import { InputLabel, IconButton, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Clear, Info } from "@mui/icons-material";
import uploadImage from "../../../../../Assets/CommonImage/KYC Form/Icon.png";

const NationalIdButton = ({
  classes,
  SetFormValues,
  FormValues,
  validationFieldMessage,
  inputsValidations,
  setinputsValidations,
}) => {
  /* useEffect(() => {
    setInputValidation({ ...validationFieldMessage });
    setinputsValidations((prevState) => ({
      ...prevState,
      national_id_image: validationFieldMessage?.national_id_image,
    }));
  }, [validationFieldMessage]); */
  let {
    media_upload,
    sub_media_upload_container,
    sub_media_upload_part,
    sub_media_upload_label,
    input_image_name,
    input_image_name_clear_btn,
    validation_error,
  } = classes;

  const handleImageChange = (event) => {
    SetFormValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.files[0],
    }));
    // setInputValidation("");
    toBase64(event.target?.files[0], event.target?.files[0]?.type);
  };
  let localUserData = JSON.parse(localStorage?.getItem("userdata"));
  let infoForUploadImage = localUserData?.custom_attributes?.filter(
    (itm) => itm?.attribute_code === "customer_country"
  );
  const toBase64 = (File, type) => {
    var reader = new FileReader();
    reader.readAsDataURL(File);
    reader.onload = function () {
      if (type === "image/png") {
        let temp = reader.result?.replace("data:image/png;base64,", "png;");
        SetFormValues((prevState) => ({
          ...prevState,
          nationality_image_base64: temp,
        }));
      } else if (type === "application/pdf") {
        let temp = reader.result?.replace(
          "data:application/pdf;base64,",
          "pdf;"
        );
        SetFormValues((prevState) => ({
          ...prevState,
          nationality_image_base64: temp,
        }));
      } else if (type === "image/jpeg") {
        let temp = reader.result?.replace("data:image/jpeg;base64,", "jpeg;");
        SetFormValues((prevState) => ({
          ...prevState,
          nationality_image_base64: temp,
        }));
      }
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };
  const [inputValidation, setInputValidation] = useState({
    national_id_image: "",
  });
  return (
    <>
      <div className={media_upload}>
        <div className={sub_media_upload_container}>
          <div className={sub_media_upload_part}>
            <p>Attach National ID</p>
            <span>*</span>
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/jpeg,image/png,application/pdf"
                id="icon-button-file"
                type="file"
                name="national_id_image"
                // onChange={handleImageChange}
                onChange={(event) => {
                  handleImageChange(event);
                  setinputsValidations((prevState) => ({
                    ...prevState,
                    national_id_image: "",
                  }));
                }}
              />
              <img
                src={uploadImage}
                alt="auth"
                aria-label="upload picture"
                component="span"
              />
            </label>
            <Tooltip
              style={{
                padding: "0",
                width: "min-content ",
                marginLeft: "8px",
                color: "#002d56e8",
              }}
              placement="top"
              title={
                infoForUploadImage?.[0]?.value === "IN"
                  ? "Please upload a valid Aadhar or Pan card"
                  : infoForUploadImage?.[0]?.value === "US"
                  ? "Please upload a valid Driving license or Tax Id"
                  : infoForUploadImage?.[0]?.value === "AE"
                  ? "Please upload a valid Driving license or Emirates Id"
                  : "Please upload a valid National Id"
              }
            >
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </div>
          <small>(Supported format : .jpg/.png/.pdf)</small>
        </div>
        <InputLabel className={validation_error}>
          {inputsValidations?.national_id_image}
        </InputLabel>

        <div className={input_image_name}>
          {FormValues?.national_id_image?.name ? (
            <p>{FormValues?.national_id_image?.name}</p>
          ) : (
            <label
              className={sub_media_upload_label}
              htmlFor="icon-button-file"
            >
              <input
                accept="image/jpeg,image/png,application/pdf"
                id="icon-button-file"
                type="file"
                name="national_id_image"
                // onChange={handleImageChange}
                onChange={(event) => {
                  handleImageChange(event);
                  setinputsValidations((prevState) => ({
                    ...prevState,
                    national_id_image: "",
                  }));
                }}
              />
              <p>No File Chosen</p>
            </label>
          )}
          <Clear
            className={input_image_name_clear_btn}
            onClick={() =>
              SetFormValues((prevState) => ({
                ...prevState,
                national_id_image: "",
              }))
            }
          />
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(NationalIdButton);
