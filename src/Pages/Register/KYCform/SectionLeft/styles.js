const styles = (theme) => ({
  buyer_kyc_section_left_container: {
    minHeight: "70vh",
    height: "77vh",
    backgroundColor: "#ffffff",
    zIndex: "1",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 8%",
  },
  // header section  css
  header_section: {
    width: "100%",
    background: "#F8F0E0",
    height: "74px",
    position: "relative",
    "& p": {
      color: "#333C42",
      fontSize: "40px",
      fontWeight: "700",
      paddingLeft: "22px",
      margin: "0",
      height: "74px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      "@media (max-width:1800px)": {
        fontSize: "30px",
      },
      "@media (max-width:1660px)": {
        fontSize: "26px",
        height: "54px",
      },
    },
  },
  clear_btn: {
    position: "absolute",
    top: "22px",
    right: "13px",
    color: "#ffffff",
    background: "#002D56",
    borderRadius: "3px",
    cursor: "pointer",
    width: "1.5em !important",
    height: "1.5em !important",
    "@media (max-width:1660px)": {
      width: "1em !important",
      height: "1em !important",
      top: "16px",
    },
  },

  sections: {
    display: "flex",
    flexDirection: "row",
    overflowY: "scroll",
    "@media (max-width:767px)": {
      flexDirection: "column",
    },
  },
  auto_complete_input: {
    "& .MuiOutlinedInput-root": {
      padding: "5px !important",
    },
    "& .MuiAutocomplete-input": {
      padding: "7.5px 4px 7.5px 6px !important",
    },
  },
  validation_error: {
    whiteSpace: "unset !important",
    marginLeft: "4px !important",
    fontSize: "14px !important",
    color: "#FF0000 !important",
    width: "100%",
  },
  input_div: {
    // display: "flex",
    // gap: "20px",
    position: "relative",
  },
  datepicker: {
    position: "absolute",
    right: "8%",
    bottom: "7%",
    cursor: "pointer",
    opacity: "0.5",
  },
  // section left css
  section_left: {
    width: "50%",
    borderRight: "1px solid #E8E8E8",
    height: "max-content",
    margin: "40px 0",
    padding: "0px 3%",
    "@media (max-width:767px)": {
      width: "100%",
    },
  },

  info_text: {
    fontSize: "24px",
    color: "#20639B",
    fontWeight: "600",
    padding: "20px 0px 10px",
    "@media (max-width:767px)": {
      textAlign: "center",
    },
  },
  info_text_lineNote_one: {
    color: "#333333",
    fontSize: "36px",
    marginBottom: "1.2em",
    marginTop: "0",
    fontWeight: "600",
    letterSpacing: "1.08px",
    "@media (max-width:1660px)": {
      fontSize: "22px",
    },
  },
  info_text_lineNote_two: {
    color: "#333333",
    fontSize: "36px",
    margin: "0",
    marginTop: "17px",
    fontWeight: "600",
    letterSpacing: "1.08px",
    "@media (max-width:1660px)": {
      fontSize: "22px",
    },
  },
  input_fields: {
    width: "100%",
    padding: "2% 0%",
    borderRadius: "4px",
    "@media (max-width:767px)": {
      padding: "2% 5%",
    },
    "& .MuiFormControl-root": {
      marginTop: "2.5em",
      "& ::placeholder": {
        fontSize: "20px",
        color: "#CDD5DD",
        opacity: "1",
        "@media(max-width:1440px)": {
          fontSize: "18px",
        },
        "@media (max-width:767px)": {
          fontSize: "16px",
        },
      },
      "& .MuiInputLabel-root": {
        fontSize: "18px",
        fontWeight: "600",
        color: "#3E3E3E",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        // padding: "12.5px 14px",
        font: "unset",
      },
      "& fieldset": {
        "& legend": {
          fontSize: "1em",
        },
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #DDB363",
    },
  },
  asterisk: {
    color: "red",
  },
  checkbox_label: {
    "& .MuiTypography-root": {
      color: "#5C6369",
      fontWeight: "600",
      fontSize: "20px",
      "@media (max-width:1660px)": {
        fontSize: "16px",
      },
    },
    "& .MuiSvgIcon-root ": {
      width: "1.2em",
      height: "1.2em",
      "@media (max-width:1600px)": {
        width: "1em",
        height: "1em",
      },
    },
  },
  media_upload: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2em",
    "@media (max-width:767px)": {
      flexDirection: "column",
    },
    "@media (max-width:1023px)": {
      marginTop: "1em",
    },
  },
  sub_media_upload_container: {
    width: "100%",
    display: "flex",
    gap: "8px",
    "& small": {
      color: "#272727",
      fontSize: "14px",
      whiteSpace: "nowrap",
    },
    "@media (max-width:1023px and min-width:767px)": {
      flexDirection: "column",
      gap: "0",
    },
    "@media (max-width:780px)": {
      flexDirection: "column",
      gap: "0",
    },
    "@media (max-width:580px)": {
      flexDirection: "column",
      gap: "0",
    },
  },
  sub_media_upload_part: {
    display: "flex",
    flexDirection: "row",
    width: "max-content",
    "& p": {
      margin: "0",
      fontSize: "16px",
      color: "#002D56",
      fontWeight: "600",
      letterSpacing: "0.54px",
      "@media (max-width:1660px)": {
        fontSize: "14px",
      },
    },
    "& span": {
      color: "red",
    },
    "& label": {
      width: "auto !important",
    },
  },
  sub_media_upload_label: {
    marginLeft: "1em",
    width: "100%",
    cursor: "pointer",
    "& input": {
      display: "none",
    },
    "@media (max-width:767px)": {
      marginLeft: "12px",
    },
  },
  input_image_name: {
    width: "100%",
    display: "flex",
    position: "relative",
    flexWrap: "wrap",
    background: "#E8E8E8",
    alignItems: "center",
    borderRadius: "4px",
    flexDirection: "row",
    justifyContent: "center",
    padding: "13px",
    textAlign: "center",
    height: "48px",
    marginTop: "12px",
    "& p": {
      margin: "0",
    },
    "@media (max-width:767px)": {
      width: "100%",
      marginTop: "15px",
      padding: "12px",
    },
  },
  input_image_name_clear_btn: {
    position: "absolute",
    top: "-6px",
    fontSize: "17px !important",
    right: "-6px",
    background: "#DDB363",
    color: "#ffffff",
    borderRadius: "14px",
    cursor: "pointer",
  },
  box: {
    display: "flex",
    width: "100%",
    gap: "20px",
    "@media (max-width:1040px) and (min-width: 768px)": {
      flexWrap: "wrap",
    },
    "@media (max-width:490px)": {
      flexWrap: "wrap",
    },
  },
  button_selected: {
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #ffd788 0%, #ad7c20 100%)",
    color: "#ffffff !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029 !important",
    fontWeight: "600 !important",
    letterSpacing: "1px !important",
    textTransform: "capitalize !important",
    transition: "transform .2s !important",
    width: "calc(100%/3)",
    fontSize: "18px !important",
    "@media (max-width:1660px)": {
      fontSize: "14px !important",
    },
    "@media (max-width:1040px) and (min-width: 768px)": {
      width: "100%",
    },
    "@media (max-width:490px)": {
      width: "100%",
    },
  },
  button_notselected: {
    borderRadius: "45px !important",
    border: "none !important",
    background: "linear-gradient(180deg, #F0F0F0 0%, #F0F0F0 100%)",
    color: "#333C42 !important",
    cursor: "pointer",
    boxShadow: "0px 3px 6px #00000029 !important",
    fontWeight: "600 !important",
    letterSpacing: "1px !important",
    textTransform: "capitalize !important",
    transition: "transform .2s !important",
    width: "calc(100%/3)",
    fontSize: "18px !important",
    "@media (max-width:1660px)": {
      fontSize: "14px !important",
    },
    "@media (max-width:1040px) and (min-width: 768px)": {
      width: "100%",
    },
    "@media (max-width:490px)": {
      width: "100%",
    },
  },

  // section rigth css
  section_right: {
    width: "50%",
    height: "max-content",
    padding: "0px 1%",
    "@media (max-width:767px)": {
      width: "100%",
    },
  },
});
export default styles;
