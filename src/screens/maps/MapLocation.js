import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View, Image } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";


function MapLocation() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [temperature, setTemperature] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -13.6394,
          longitude: -72.8814,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation}>
            <Image
              source={require("../../assets/img/fuego.png")} 
              style={{ width: 30, height: 34 }} 
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapLocation;
