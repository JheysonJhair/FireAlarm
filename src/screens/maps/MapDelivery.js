import React, { useState, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import AsyncStorage from "@react-native-async-storage/async-storage";


function MapDelivery({ route }) {
  const { latitudDestination, longitudDestination } = route.params;

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: latitudDestination,
    longitude: longitudDestination,
  });

  const retrieveLocationData = async () => {
    try {
      const locationData = await AsyncStorage.getItem("locationData");
      if (locationData !== null) {
        const { latitude, longitude } = JSON.parse(locationData);
        setOrigin({ latitude, longitude });
      } else {
        console.log("No hay datos de ubicación guardados.");
      }
    } catch (error) {
      console.error("Error al recuperar datos de ubicación:", error);
    }
  };

  useEffect(() => {
    retrieveLocationData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          origin
            ? {
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04,
              }
            : null
        }
      >
        {origin && <Marker coordinate={origin}></Marker>}
        <Marker coordinate={destination} ></Marker>
        {origin && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={""}
            strokeColor="#40A5E7"
            strokeWidth={4}
          />
        )}
        {origin && (
          <Polyline
            coordinates={[origin, destination]}
            strokeColor="#40A5E7"
            strokeWidth={4}
          ></Polyline>
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

export default MapDelivery;
