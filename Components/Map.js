import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch, TextInput } from "react-native";
import MapView from "react-native-maps";
import Constants from "expo-constants";

const Map = (props) => {
  const curLocation = props.curLocation;
  const hasLocationPermissions = props.hasLocationPermissions;
  const needsParking = props.needsParking;
  const searchRadius = props.searchRadius;


  if (curLocation === null) {
    return <Text>Finding your current location...</Text>;
  }

  if (hasLocationPermissions === false) {
    return <Text>Location permissions are not granted.</Text>;
  }

  return (
    <MapView
      style={styles.map}
      region={{
        latitude: curLocation.latitude,
        longitude: curLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01,
      }}
    >
      <MapView.Marker coordinate={{latitude: curLocation.latitude, longitude: curLocation.longitude}} />
      {needsParking ? (
        <MapView.Circle
          center={{
            latitude: curLocation.latitude,
            longitude: curLocation.longitude,
          }}
          radius={500}
          strokeWidth={2}
          strokeColor="#3399ff"
          fillColor="rgba(109, 195, 252, 0.4)"
        />
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
