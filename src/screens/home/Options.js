import React from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import Button from "../../components/forms/Button";
import ButtonTwo from "../../components/forms/ButtonTwo";

const Options = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.h2}>Seleccione una opcion!</Text>

      <View style={styles.formContainer}>
        <Button
          title="Ver Reporte"
          onPress={() => navigation.navigate("Reporte")}
        />
        <ButtonTwo
          title="Reportar"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFF",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  formContainer: {
    width: "80%",
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Options;
