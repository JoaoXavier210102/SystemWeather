import React from "react";
import Template from "./Template";
import { ThemeProvider, createTheme } from "@material-ui/core";
import Home from "./Pages/Home";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: "#022B3A"
      },
      secondary: {
        main: "#1F7A8C"
      },
      error: {
        main: "#EF626C"
      },
      warning: {
        main: "#F2BB05"
      },
      info: {
        main: "#DBF9F4"
      },
      success: {
        main: "#379634"
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Template />
        <div style={{ margin: "15px" }}>
          <Home />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
