import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async (sourceType) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult;
    if (sourceType === "camera") {
      pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    } else {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
    }

    if (pickerResult.cancelled === true) {
      return;
    }

    setImage(pickerResult.uri);
    onImageSelected(pickerResult.uri);
  };

  const selectFromCamera = () => {
    pickImage("camera");
  };

  const selectFromGallery = () => {
    pickImage("gallery");
  };

  return (
    <View style={styles.container}>
    <View style={styles.contButton}>
      <TouchableOpacity style={[styles.button, styles.buttonLarge]} onPress={selectFromGallery}>
        <Text style={styles.buttonText}>Seleccionar de galería</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonSmall]} onPress={selectFromCamera}>
        <Text style={styles.buttonText}><Ionicons name="camera" size={24} color="white" /></Text>
      </TouchableOpacity>
    </View>

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
    marginBottom: 10,
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
  //
  contButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSmall: {
    flex: 1, 
    marginLeft: 10, 
  },
  buttonLarge: {
    flex: 10, 
  },
});

export default ImagePickerComponent;
