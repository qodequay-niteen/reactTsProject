import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

type Props = { children: React.ReactNode };

const MenuButton = ({ children }: Props) => (
  <TouchableOpacity style={styles.container}>
    <Image style={styles.image} source={require("../assets/menu.png")} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(MenuButton);