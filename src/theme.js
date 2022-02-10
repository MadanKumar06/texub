import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontFamily: `Source Sans Pro, Semibold`,
  },
  palette: {
    primary: {
      main: "#5C6369",
    },
    secondary: {
      main: "#20639B",
    },
    color_third: {
      main: "#DDB363",
    },
  },
});
export default theme;
