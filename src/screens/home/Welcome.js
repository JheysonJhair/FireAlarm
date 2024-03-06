import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Vibration,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import * as Notifications from "expo-notifications";
import Button from "../../components/forms/Button";
import ButtonTwo from "../../components/forms/ButtonTwo";
import { schedulePushNotification } from "../../hooks/NotificationService";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Welcome = () => {
  const ONE_SECOND_IN_MS = 1000;
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    Notifications.addNotificationReceivedListener(handleNotificationReceived);
    return () => {
      Notifications.removeNotificationReceivedListener(
        handleNotificationReceived
      );
    };
  }, []);

  const handleNotificationReceived = () => {
    
    Vibration.vibrate(5 * ONE_SECOND_IN_MS);
  };

  if (!fontsLoaded) {
    return null;
  }

  const handleScheduleNotification = () => {
    const scheduledTime = new Date();
    scheduledTime.setSeconds(scheduledTime.getSeconds() + 10);
    schedulePushNotification("Probando notificacion", scheduledTime);
  };
  
  

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.h1}>FireAlarm</Text>
      <Text style={styles.h2}>Bienvenido!</Text>

      <View style={styles.formContainer}>
        <Button
          title="Crear Cuenta"
          onPress={() => navigation.navigate("Register")}
        />
        <ButtonTwo
          title="Ingresar"
          onPress={() => navigation.navigate("Login")}
        />
        <ButtonTwo
          title="Programar Notificación"
          onPress={handleScheduleNotification}
        />
      </View>

      <View style={styles.terminos}>
        <Text style={styles.h3}>Nuestros Términos y Condiciones</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181f2b",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  formContainer: {
    width: "80%",
  },
  h1: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 34,
    color: "#ffffff",
    marginBottom: 5,
    marginTop: 20,
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#fff",
    fontSize: 20,
    marginBottom: 20,
  },
  terminos: {
    position: "absolute",
    bottom: 70,
  },
  h3: {
    color: "#A3AABF",
    fontSize: 13,
  },
});

export default Welcome;
