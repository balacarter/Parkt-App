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
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Map from "../Components/Map";
import { ADD_PARKING_SPOT } from "../store/actions/types";
import { addParkingSpot, getParkingSpots } from "../store/actions/parking";

const Dashboard = () => {
  const [curLocation, setLocation] = useState(null);
  const [needsParking, setNeedsParking] = useState(true);
  //const [parkingSpots, setParkingSpots] = useState([]);
  const [searchText, onChangeSearchText] = useState("");
  //const [searchRadius, setSearchRadius] = useState();
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);

  const dispatch = useDispatch();
  const parkingSpots = useSelector(state => state.parking.parkingSpots);
  const searchRadius = useSelector(state => state.parking.radius);
  //console.log(parkingSpots);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if ("granted" !== status) {
      setLocation("Permission to access location was denied");
    } else {
      setLocationPermission(true);
    }

    let location = await Location.getCurrentPositionAsync({});

    setLocation(location);
  };
  useEffect(() => {
    getLocationAsync();
    dispatch(getParkingSpots());
  }, []);

  const parseRadius = (radius) => {
    let temp = parseInt(radius);
    if (temp) {
      setSearchRadius(temp);
    }
  };
  const toggleSwitch = () => {
    setNeedsParking(!needsParking);
  };

  const sendParkingSpot = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let key = Math.floor(Math.random() * Date.now());
    const parkingSpot = {
      key: key,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      
    };
    dispatch(addParkingSpot(parkingSpot));
  };

  const findParking = async () => {
    //Find parking spots in radius
    if (needsParking && hasLocationPermissions) {
      let location;
      if (searchText) {
        //console.log(searchText);
        location = await Location.geocodeAsync(searchText);
      } else {
        location = await Location.getCurrentPositionAsync({});
      }
      setSearchLocation(location[0]);
      //setParkingSpots(selector(state => state.parkingSpots));
      //console.log(parkingSpots);
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
              </View>

              <Pressable style={styles.button} onPress={findParking}>
                <Text style={styles.buttonText}>Search</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.addArea}>
              <Pressable style={styles.button} onPress={sendParkingSpot}>
                <Text style={styles.buttonText}>Add ParkingSpot</Text>
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
    backgroundColor: "#33bdb4",
  },
  head: {
    flex: 1,
    flexDirection: "column",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  body: {
    flex: 4,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  inputArea: {
    flex: 1,
    flexDirection: "row",
  },
  searchInputs: {
    flexDirection: "row",
  },
  addressInput: {
    flex: 1,
  },
  radiusInput: {
    flex: 1,
  },
  button: {

    borderRadius: 10,
    backgroundColor: "#4287f5",
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
    padding: 5,
    marginTop: 9,
    
  },
  buttonText: {
    color: "#FFFF",
  },
  addArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  textInput: {},
  text: {
    color: "#FFFF",
    fontWeight: "500",
  },
  inputLabel: {
    flexDirection: "row",
    justifyContent: "center",
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
