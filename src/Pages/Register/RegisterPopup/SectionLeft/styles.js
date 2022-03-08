const styles = (theme) => ({
  section_main: {
    height: "81vh",
    zIndex: "1",
    display: "flex",
    width: "100%",
    overflow: "auto",
    gap: "6em",
    "@media (max-width:768px)": {
      flexDirection: "column",
      overflowY: "scroll",
    },
    "@media (max-width:1080px)": {
      gap: "0em",
    },
  },
  section_main_buyer: {
    backgroundImage: "url('/Images/user_selection_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  section_main_seller: {
    backgroundImage: "url('/Images/buyer_regirtration_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "8%",
    "@media (max-width:768px)": {
      margin: "1%",
    },
  },
  // section one css
  section_left: {
    padding: "3.5%",
    margin: "1.5%",
    width: "45%",
    height: "max-content",
    backgroundImage: "url('/Images/user_selection_leftbg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    "@media (max-width:768px)": {
      width: "97%",
      height: "max-content",
    },
  },
  welcome_column: {
    display: "flex",
    alignItems: "center",
  },
  welcome_text: {
    fontSize: "30px",
    color: "#ffffff",
    lineHeight: "64px",
    width: "50%",
    flex: "1",
    display: "flex",
    "@media (max-width:1190px)": {
      fontSize: "22px",
    },
    "@media (max-width:768px)": {
      fontSize:"28px"
    },
  },
  welcome_texub_logo: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%",
    "& img": {
      width: "100%",
    },
    "@media (max-width:768px)": {
      width: "30%",
    },
    "@media (max-width:580px)": {
      width: "45%",
    },
  },
  tagline_text: {
    color: "#DDB363",
    fontSize: "24px",
    lineHeight: "30px",
    letterSpacing: "0.72px",
    fontWeight: "600",
    marginTop: "4%",
    marginBottom: "6%",
    "@media (max-width:1190px)": {
      fontSize: "16px",
    },
    "@media (max-width:768px)": {
      marginTop: "2%",
      fontSize: "20px",
    },
    "@media (max-width:390px)": {
      fontSize: "18px",
    },
  },
  row_info_points: {
    display: "flex",
    alignItems: "center",
    marginTop: "1%",
  },
  thumb_image: {
    width: "62px",
    height: "62px",
    margin: "inherit",
    "& img": {
      height: "auto",
      maxWidth: "100%",
    },
  },
  arrow_image: {
    width: "22px",
    verticalAlign: "middle",
    marginLeft: "8px",
    "& img": {
      width: "100%",
    },
    "@media (max-width:1200px)": {
      marginLeft: "0px",
      width: "18px",
    },
  },
  point_info_text: {
    fontSize: "16px",
    lineHeight: "38px",
    color: "#ffffff",
    marginLeft: "2%",
    "@media (max-width:1190px)": {
      fontSize: "12px",
    },
    "@media (max-width:980px)": {
      fontSize: "11px",
    },
    "@media (max-width:768px)": {
      fontSize: "16px",
    },
    "@media (max-width:390px)": {
      fontSize: "12px",
    },
  },

  // section two css
  section_right: {
    width: "55%",
    padding: "4% 2% 2%",
    position: "relative",
    "@media (max-width:768px)": {
      width: "100%",
      padding: "4%",
    },
  },
});
export default styles;
