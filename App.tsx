import React from "react";
import { Provider as Prov } from "react-native-paper";
import App from "./src";
import { theme } from "./src/core/theme";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const Main = () => (
  <Provider store={store}>
    <Prov theme={theme}>
      <App />
    </Prov>
  </Provider>
);

export default Main;
