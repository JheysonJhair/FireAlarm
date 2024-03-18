import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
    onImageSelected(pickerResult.uri); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Subir evidencia</Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      {!image && (
        <View style={styles.placeholder}>
          <Ionicons name="md-arrow-down" size={54} color="#3c4e70" />
          <Text style={styles.placeholderText}>Selecciona una imagen</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    width: "100%",
    height: 200,
  },
  button: {
    backgroundColor: "#3c4e70",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 45,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: "stretch",
    marginTop: 4,
    borderRadius: 5,
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 50, 0.1)",
    width: "100%",
  },
  placeholderText: {
    color: "#3c4e70",
    marginTop: 10,
  },
});

export default ImagePickerComponent;
