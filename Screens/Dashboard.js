import React, { useState, useEffect,} from "react";
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
import { useDispatch } from 'react-redux';
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Map from "../Components/Map";
import {ADD_PARKING_SPOT} from "../store/actions/types";

const Dashboard = () => {
  const [curLocation, setLocation] = useState(null);
  const [needsParking, setNeedsParking] = useState(true);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [searchText, onChangeSearchText] = useState("");
  const [searchRadius, setSearchRadius] = useState();
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);

  const dispatch = useDispatch();

  const addParkingSpot = (location) => dispatch({type: ADD_PARKING_SPOT, location: location});


  useEffect(() => {
    const getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if ("granted" !== status) {
        setLocation("Permission to access location was denied");
      } else {
        setLocationPermission(true);
      }

      let location = await Location.getCurrentPositionAsync({});
      
      setLocation(location);
    };

    getLocationAsync();
  }, []);

  const parseRadius = (radius) => {
    let temp = parseInt(radius);
    if(temp) {
      setSearchRadius(temp);
    }
  }; 
  const toggleSwitch = () => {
    setNeedsParking(!needsParking);
  };

  const sendParkingSpot = async () => {
    let location = await Location.getCurrentPositionAsync({});
    addParkingSpot(location);
  };

  const findParking = async () => {
    //Find parking spots in radius
    if(needsParking && hasLocationPermissions) {
      let location;
      if(searchText) {
        console.log(searchText);
        location = await Location.geocodeAsync(searchText);
      }
      else {
        location = await Location.getCurrentPositionAsync({});
      }
      setSearchLocation(location[0]);
    }
    
  };

  const ToggleArea = () => {
    return (
      <View style={styles.toggleContainer}>
        <Text style={styles.text}>I am leaving</Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#42b6f5", true: "81b0ff" }}
          thumbColor={needsParking ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={needsParking}
        />
        <Text style={styles.text}>I need parking</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <ToggleArea />
        <View style={styles.inputArea}>
          {needsParking ? (
            <View style={styles.searchArea}>
              <View style={styles.inputLabel}>
                <Text style={styles.text}>Address:</Text>
                <Text style={styles.text}>Radius:</Text>
              </View>
              <View style={styles.searchInputs}>
                <View style={styles.addressInput}>
                  <View style={styles.inputBox}>
                    <TextInput
                      styles={styles.textInput}
                      onChangeText={onChangeSearchText}
                      value={searchText}
                      placeholder="Enter address"
                    />
                  </View>
                </View>
                <View style={styles.radiusInput}>
                  <View style={styles.inputBox}>
                    <TextInput
                      styles={styles.textInput}
                      onChangeText={parseRadius}
                      value={searchRadius}
                      placeholder="Radius"
                    />
                  </View>
                </View>
              </View>

              <Pressable style={styles.button} onPress={findParking}>
                <Text style={styles.buttonText}>Search</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.addArea}>
              <Pressable style={styles.button} onPress={sendParkingSpot}>
                <Text>Add ParkingSpot</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      <View style={styles.body}>
        {curLocation && (
          <Map
            curLocation={searchLocation ? searchLocation : curLocation.coords}
            hasLocationPermissions={hasLocationPermissions}
            needsParking={needsParking}
            parkingSpots={needsParking && parkingSpots}
            searchRadius={searchRadius}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  head: {
    flex: 1,
    flexDirection: "column",
  },
  body: {
    flex: 4,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    borderBottomWidth: 1,
  },
  inputArea: {
    flex: 1,
    flexDirection: "row",
  },
  searchInputs: {
    flexDirection: "row",
  },
  addressInput: {
    flex: 4,
  },
  radiusInput: {
    flex: 1,
  },
  addArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textInput: {},
  text: {},
  inputLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginRight: 10,
  },
  inputBox: {
    backgroundColor: "#FFFF",
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  searchArea: {
    flex: 1,
  },
});
export default Dashboard;
