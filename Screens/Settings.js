import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Constants from "expo-constants";
import firebase from "firebase";
import { setRadius } from "../store/actions/parking";




const Settings = () => {
  const radius = useSelector(state => state.parking.radius);
  console.log(radius);
  const dispatch = useDispatch();
  
  
  const setNewRadius = (newRadius) => {
    let intRadius = parseInt(newRadius);
    if(!intRadius) {
      intRadius = 0;
    }
    dispatch(setRadius(intRadius));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settings}>
        <View style={styles.settingBox}>
          <Text style={styles.settingsText}>Search Radius:</Text>
          <TextInput
            style={styles.settingsInput}
            onChangeText={setNewRadius}
            value={radius + ''}
          />
          <Text style={styles.settingsText}>feet</Text>
        </View>
        <Pressable
          style={styles.settingBox}
          onPress={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                console.log("signed out");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          <Text style={styles.settingsText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    //paddingLeft: 5,
    flexDirection: "column",
    backgroundColor: "#33bdb4",
  },
  settings: {
    flex: 3,
    padding: 10,
  },
  header: {
    paddingLeft: 10,
    flex: 0.5,
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFF",
  },
  settingBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: 100,
  },
  settingsInput: {
    borderBottomWidth: 2,
    width: 150,
  },
  settingsText: {
    fontSize: 18,
  },
});

export default Settings;
