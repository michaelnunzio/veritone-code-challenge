import { createTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#4C81B7 !important",
      light: "#fc3b6e",
      dark: "#444445",
    },
    // secondary: {
    //   main: "#577384",
    //   light: "#84bec4",
    //   dark: "#3e3f40",
    //   contrastText: '#5a4986',
    // },
  },
  typography: {
    fontFamily: [
      'Dosis !important'
    ].join(','),
  }
});

export default theme;
