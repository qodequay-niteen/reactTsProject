import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Color from "../theme/Color";
import { scale } from "../theme/Scalling";

const Loader = (props) => {
  return (
    <Modal visible={props.visible} transparent={true} animationType={"fade"}>
      <View style={styles.activityI}>
        <ActivityIndicator
          visible={true}
          color={Color.TEXTFONT_COLOR}
          size="large"
        />
        <View
          style={{
            alignItems: "center",
            marginTop: scale(15),
          }}
        >
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
const styles = StyleSheet.create({
  activityI: {
    alignContent: "center",
    // margin: 50,
    // backgroundColor: "rgba(612,612,612,0.15)",
    // backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    height: scale(960),
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
