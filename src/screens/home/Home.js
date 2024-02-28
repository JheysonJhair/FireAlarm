import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import TextArea from "../../components/forms/TextArea";
import Footer from "../../components/utils/Footer";
import LoadingIndicator from "../../components/utils/LoadingIndicator";
import { useUser } from "../../components/utils/UserContext";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Para ti");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUser();
  const navigation = useNavigation();
  const [descripcion, setDescripcion] = useState("");
  const MAX_CARACTERES = 71;
  const [email, setEmail] = useState("");
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
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <View>
              <Text style={styles.h1}>FireAlarm</Text>
              <Text style={styles.h2}>Hola, Bienvenido de nuevo</Text>
            </View>
            <View>
              <Text>SUBIR IAMGENES</Text>
              <TextArea
                placeholder="Descripción"
                onChangeText={handleDescripcionChange}
                value={descripcion}
              />
            </View>
            <View style={styles.formSection}>
              <Text style={styles.label}>Descripción Corta</Text>
              <TextArea
                placeholder="Descripción"
                onChangeText={handleDescripcionChange}
                value={descripcion}
              />
              <Text style={styles.caracteresRestantes}>
                {MAX_CARACTERES - descripcion.length} caracteres restantes
              </Text>
            </View>
            <View>
              <Text>UBICACION EN TIEMPO REAL</Text>
              <TextArea
                placeholder="Descripción"
                onChangeText={handleDescripcionChange}
                value={descripcion}
              />
            </View>
            <View>
              <Input
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
              <Button
                title="Iniciar Sesión"
                onPress={() => console.log("xs")}
              />
            </View>
          </View>
          {showProfileOptions && (
            <TouchableWithoutFeedback onPress={toggleProfileOptions}>
              <View style={styles.overlay}></View>
            </TouchableWithoutFeedback>
          )}
          <View style={styles.absoluteIconsContainer}>
            <Footer iconName="home" selectedIcon={"home"} />
            <Footer iconName="map" selectedIcon={null} />
            <Footer iconName="cog" selectedIcon={null} />
          </View>
          {showProfileOptions && (
            <TouchableWithoutFeedback onPress={toggleProfileOptions}>
              <View style={styles.profileOptionsContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MiCodigoQR")}
                  style={styles.profileOption}
                >
                  <Icon name="qrcode" size={20} color="#000" />
                  <Text style={styles.profileOptionText}>Mi código QR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MiCodigoQR")}
                  style={styles.profileOption}
                >
                  <Icon name="gear" size={20} color="#272728" />
                  <Text style={styles.profileOptionText}>
                    Ajustes y privacidad
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => clearUserData()}
                  style={styles.profileOption}
                >
                  <Icon name="sign-out" size={20} color="#272728" />
                  <Text style={styles.profileOptionText}>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFF",
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
    fontSize: 36,
    color: "#000000",
    marginBottom: 5,
    marginTop: 20,
    textAlign: "center",
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    flex: 1, // Para que ocupe todo el espacio disponible
    padding: 20,
  },
  //
  absoluteIconsContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#FFFFFF",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
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
});
