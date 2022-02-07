const styles = (theme) => ({
  section_main: {
    minHeight: "70vh",
    backgroundImage: "url('/Images/user_selection_bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    zIndex: "1",
    display: "flex",
    width: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "8%",
  },
  // section one css
  section_left: {
    padding: "3.5%",
    margin: "1.5%",
    width: "45%",
    minHeight: "70vh",
    backgroundImage: "url('/Images/user_selection_leftbg.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
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
    "@media (max-width:1190px) and (min-width:768px)": {
      fontSize: "18px",
    },
  },
  welcome_texub_logo: {
    display: "flex",
    justifyContent: "flex-end",
    width: "50%",
    "& img": {
      height: "auto",
      maxWidth: "100%",
    },
  },
  tagline_text: {
    color: "#DDB363",
    fontSize: "20px",
    lineHeight: "30px",
    letterSpacing: "0.72px",
    fontWeight: "600",
    marginTop: "4%",
    marginBottom: "6%",
    "@media (max-width:1190px) and (min-width:768px)": {
      fontSize: "16px",
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
    height: "18px",
    verticalAlign: "middle",
    marginLeft: "8px",
  },
  point_info_text: {
    fontSize: "16px",
    lineHeight: "38px",
    color: "#ffffff",
    marginLeft: "2%",
    "@media (max-width:1190px) and (min-width:980px)": {
      fontSize: "12px",
    },
    "@media (max-width:1298px) and (min-width:1000px)": {
      // fontSize: "12px",
    },
  },

  // section two css
  section_right: {
    width: "55%",
    padding: "4% 2% 2%",
  },
});
export default styles;
