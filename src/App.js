import React from "react";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import Navbar from "./components/Navbar";
import { Auth } from "aws-amplify";
import Main from "./components/Main";
import ApiContextProvider from "./context/ApiContext";

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

const user = Auth.currentAuthenticatedUser();

function App() {
  return (
    <ApiContextProvider>
      <MuiThemeProvider theme={theme}>
        <Navbar />
        <div className="container">
          <Main />
        </div>
        <AmplifySignOut />
      </MuiThemeProvider>
    </ApiContextProvider>
  );
}

export default withAuthenticator(App);
