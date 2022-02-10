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
    margin: "8%",
  },
  // header section  css
  header_section: {
    width: "100%",
    background: "#F8F0E0",
    height: "74px",
    position: "relative",
    "& p": {
      color: "#333C42",
      fontSize: "34px",
      fontWeight: "600",
      paddingLeft: "22px",
      margin: "0",
      height: "74px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  clear_btn: {
    position: "absolute",
    top: "22px",
    right: "13px",
    color: "#ffffff",
    background: "#002D56",
    borderRadius: "3px",
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
  },
  input_div: {
    display: "flex",
    gap: "20px",
  },
  // section left css
  section_left: {
    width: "50%",
    borderRight: "1px solid #E8E8E8",
    height: "max-content",
    marginTop:"40px",
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
    fontSize: "22px",
    marginBottom: "37px",
    marginTop: "0",
    fontWeight: "600",
  },
  info_text_lineNote_two: {
    color: "#333333",
    fontSize: "22px",
    marginBottom: "37px",
    fontWeight: "600",
  },
  input_fields: {
    width: "100%",
    padding: "10% 0%",
    borderRadius: "4px",
    "@media (max-width:767px)": {
      padding: "7% 5%",
      marginBottom: "30px",
    },
    "& .MuiFormControl-root": {
      marginBottom: "20px",
      "& ::placeholder": {
        textTransform: "capitalize",
        fontSize: "12px",
      },
      "& .MuiInputLabel-root": {
        fontWeight: "600",
        fontSize: "1.2rem",
      },
    },
    "& .MuiOutlinedInput-root": {
      "& input": {
        padding: "12px",
        font: "unset",
      },
      "& fieldset": {
        "& legend": {
          fontSize: "0.9em",
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
    },
  },
  media_upload: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5px",
    marginBottom: "20px",
  },
  sub_media_upload_container: {
    width: "50%",
    "& small": {
      color: "#272727",
    },
  },
  sub_media_upload_part: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    "& p": {
      margin: "0",
      fontSize: "16px",
    },
    "& span": {
      color: "red",
    },
  },
  sub_media_upload_label: {
    margin: "auto",
    "& input": {
      display: "none",
    },
  },
  input_image_name: {
    width: "50%",
    position: "relative",
    background: "#E8E8E8",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      margin: "0",
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
  },
  box: {
    display: "flex",
    width: "100%",
    gap: "20px",
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
  },

  // section rigth css
  section_right: {
    width: "50%",
    height: "max-content",
    padding: "0px 3%",
    "@media (max-width:767px)": {
      width: "100%",
    },
  },
});
export default styles;
