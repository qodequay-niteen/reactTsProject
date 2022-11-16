import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { HomeScreen, LoginScreen, DashboardScreen } from "./screens";

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    DashboardScreen,
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
