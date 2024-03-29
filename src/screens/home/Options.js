import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
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

  const windowWidth = Dimensions.get("window").width;

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/svg/option.png")}
          style={{
            width: windowWidth * 0.9,
            height: undefined,
            aspectRatio: 1,
          }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.formContainer}>
        <Button
          title="Mis Reportes"
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Options;
