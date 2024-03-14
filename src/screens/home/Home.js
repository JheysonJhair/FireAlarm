import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import TextArea from "../../components/forms/TextArea";
import ImagePickerComponent from "../../components/forms/ImagePickerComponent ";
import { useNavigation } from "@react-navigation/native";


const maps = require("../../assets/img/maps.png");

export default function Home() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("Para ti");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const MAX_CARACTERES = 80;
  const [direccion, setDireccion] = useState("");
  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        if (selectedCategory === "Para ti") {
        } else {
          await filterProductsByType(selectedCategory.toLowerCase());
        }
      } catch (error) {
        console.error("Error al obtener productos:", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  //
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      console.log("eliminadoo");
    } catch (error) {
      console.error("Error al borrar datos de usuario:", error);
    }
  };
  const handleDescripcionChange = (text) => {
    if (text.length <= MAX_CARACTERES) {
      setDescripcion(text);
    }
  };
  const handleUbication = () => {
    navigation.navigate("Explore");
  };
  return (
    <View style={styles.contentContainer}>
      <View style={styles.content}>
        <View>
          <Text style={styles.h1}>FireAlarm</Text>
          <Text style={styles.h2}>Hola, Bienvenido de nuevo</Text>
        </View>
        <ScrollView style={styles.containerBac}>
          <View>
            <ImagePickerComponent />
            <View style={styles.formSection}>
              <Text style={styles.label}>Descripción Corta</Text>
              <TextArea
                placeholder="Qué esta pasando??"
                onChangeText={handleDescripcionChange}
                value={descripcion}
              />
              <Text style={styles.caracteresRestantes}>
                {MAX_CARACTERES - descripcion.length} caracteres restantes
              </Text>
            </View>
            <View>
              <Text style={styles.label}>UBICACION EN TIEMPO REAL</Text>

              <View style={styles.containerImage}>
                <TouchableOpacity onPress={handleUbication}>
                  <ImageBackground
                    source={maps}
                    style={styles.imageBackground}
                    resizeMode="cover"
                  ></ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Input
                placeholder="Ingrese la dirección del incidente"
                onChangeText={(text) => setDireccion(text)}
                value={direccion}
              />
              <Button title="Notificar" onPress={() => console.log("xs")} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerBac: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
  },
  contentContainer: {
    flex: 1,
  },
  formSection: {
    marginBottom: 10,
  },
  caracteresRestantes: {
    fontSize: 12,
    color: "#8c8c8c",
  },
  //
  h1: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 29,
    color: "#000000",
    marginBottom: 5,
    marginTop: 40,
    textAlign: "center",
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  //
  profileOptionsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    width: "90%",
    borderTopWidth: 1,
    borderTopColor: "#ededed",
  },
  profileOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  label: {
    marginTop: 5,
    marginBottom: 14,
    fontSize: 16,
    color: "#000000",
    fontFamily: "Montserrat_800ExtraBold",
  },
  containerImage: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
