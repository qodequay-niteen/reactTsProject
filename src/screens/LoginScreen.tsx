import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { emailValidator, passwordValidator } from "../core/utils";
import { Navigation } from "../types";

import { userProfileDetails } from "../redux/slice";
import { useDispatch } from "react-redux";

type props = {
  navigation: Navigation;
};

const LoginScreen: React.FC<props> = (props) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const dispatch = useDispatch();

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    dispatch(
      userProfileDetails({ email: email.value, password: password.value })
    );
    props.navigation.navigate("DashboardScreen");
  };

  return (
    <Background>
      <View
        style={{
          padding: 20,
          width: "100%",
          maxWidth: 340,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo />
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 24, margin: 10 }}>
            Login
          </Text>
        </View>

        <TextInput
          label="Email Id"
          placeholder="Enter email id here"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          placeholder="Enter password here"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button mode="contained" onPress={onLoginPressed}>
          Submit
        </Button>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
