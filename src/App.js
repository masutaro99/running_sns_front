import React from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Navbar from "./components/Navbar";

const theme = createMuiTheme({
  pallete: {
    primary: indigo,
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    frontfamily: "Comic Neue",
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <AmplifySignOut />
    </MuiThemeProvider>
  );
}

export default withAuthenticator(App);
