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
//   typography: {
//     fontFamily: "sans-serif",
//     fontSize: 16,
//     body2: {
//       fontSize: 16,
//     },
//     body1: {
//       fontSize: 18
//     },
//     subtitle2: {
//       fontSize: 14,
//       fontWeight: 700,
//     },
//     subtitle1: {
//       fontWeight: 700,
//     },
//   },
});

export default theme;
