import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import * as firebase from "firebase";

export default function Login() {
  // TODO: add firebase login function later
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(setErrorMessage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.login}>Login/Sign Up</Text>

      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={styles.textInput}
        autoCapitalize="none"
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />
      <Pressable
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4287f5",
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "500",
    color: "#7f78d2",
  },
  login: {
    fontSize: 36,
    fontWeight: "bold",
    padding: 15,
  },
  textInput: {
    backgroundColor: "#FFFF",
    width: "70%",
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    width: 270,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#33bdb4",
  },
  buttonText: {
    color: "#ffe2ff",
    fontSize: 24,
    marginRight: 5,
  },
});
