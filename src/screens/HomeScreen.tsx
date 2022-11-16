import React, { useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Navigation } from "../types";
import { View, Text } from "react-native";
import { scale } from "../theme/Scalling";
import { useSelector } from "react-redux";
import { userProfileDetails } from "../redux/slice";
import { useDispatch } from "react-redux";
import MenuButton from "../components/MenuButton";
import { getStatusBarHeight } from "react-native-status-bar-height";

type props = {
  navigation: Navigation;
};

const HomeScreen: React.FC<props> = (props) => {
  let userData;
  userData = useSelector((state) => state.counter.userProfileDetails);
  useEffect(() => {
    console.log("Stored redux data:", userData);
  });

  const dispatch = useDispatch();

  const onLogoutPressed = () => {
    dispatch(userProfileDetails({}));
  };

  return (
    <Background>
      <MenuButton />
      <View
        style={{
          top: getStatusBarHeight() - 163,
        }}
      >
        <Header>Home</Header>
      </View>

      <View
        style={{
          alignItems: "center",
          padding: 50,
        }}
      >
        {userData.email != null ? (
          <View style={{ marginTop: -25 }}>
            <Logo />
          </View>
        ) : (
          <View style={{ marginTop: -5 }}>
            <Logo />
          </View>
        )}

        {userData.email != null ? (
          <Paragraph>
            Welcome to the Post-Comment application. Kindly check Dashboard to
            see post and comments count.
          </Paragraph>
        ) : (
          <Paragraph>
            Welcome to the Post-Comment application. Kindly login to continue.
            Once you login you will get Dashboard page and Logout button.
          </Paragraph>
        )}

        {userData.email != null ? (
          <Button mode="contained" onPress={onLogoutPressed}>
            Logout
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => props.navigation.navigate("LoginScreen")}
          >
            Login
          </Button>
        )}
        {userData.email == null ? (
          <Text></Text>
        ) : (
          <Button
            mode="outlined"
            onPress={() => props.navigation.navigate("DashboardScreen")}
          >
            DashBoard
          </Button>
        )}
      </View>
    </Background>
  );
};

export default HomeScreen;
