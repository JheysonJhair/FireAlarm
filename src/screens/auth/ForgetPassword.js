import React, { useState } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import VerificationInput from "../../components/forms/VerificationInput ";
import StatusModal from "../../components/modals/StatusModal ";

import {
  useFonts,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

import { recoverPassword } from "../../api/apiLogin";
import { verifyCode } from "../../api/apiLogin";

const ForgetPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const [fontsLoaded] = useFonts({
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return null;
  }

  const handleSendVerificationCode = async () => {
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Correo invalido");
      setText2(
        "Por favor, ingresa una dirección de correo electrónico válida."
      );
      return;
    }

    const verificationResponse = await recoverPassword(email);

    if (verificationResponse.status === 200) {
      setModalStatus("loading");
      setModalVisible(true);
      setText("Verificando...");
      setText2(
        "Te hemos enviado un código a tu correo. Por favor, verifica en la carpeta de spam si no lo encuentras en la bandeja de entrada."
      );
      setTimeout(() => {
        setModalVisible(false);
      }, 3000);
      setIsEmailVerified(true);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const verificationResponse = await verifyCode(verificationCode, email);
      if (verificationResponse.value == true) {
        setIsVerified(true);
        navigation.navigate("NewPassword", { email });
      } else {
        setModalStatus("error");
        setModalVisible(true);
        setText("Error");
        setText2(
          "Hubo un problema al verificar el codigo. Por favor, inténtalo de nuevo."
        );
        setTimeout(() => {
          setModalVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {!isEmailVerified ? (
        <>
          <Text style={styles.h1}>Contraseña Olvidada</Text>
          <Text style={styles.h2}>
            Te enviaremos tu código de recuperación a tu correo electrónico.
          </Text>
          <View style={styles.formContainer}>
            <Input
              placeholder="Correo Electrónico"
              onChangeText={(text) => setEmail(text)}
              value={email}
              isVerified={isEmailVerified}
            />
            <Button title="Siguiente" onPress={handleSendVerificationCode} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.h1}>Contraseña Olvidada</Text>
          <Text style={styles.h2}>Ingresa el código de recuperación.</Text>
          <View style={styles.formContainer}>
            <VerificationInput
              placeholder="D- xxxxxx"
              onChangeText={(text) => setVerificationCode(text)}
              value={verificationCode}
              isVerified={isVerified}
            />
            <Button title="Verificar" onPress={handleVerifyCode} />
          </View>
        </>
      )}

      <View style={styles.terminos}>
        <Text style={styles.h3}>Nuestros Términos y Condiciones</Text>
      </View>
      <StatusModal
        visible={modalVisible}
        status={modalStatus}
        text={text}
        text2={text2}
      />
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
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    width: "60%",
    textAlign: "center",
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 36,
    color: "#000",
    marginBottom: 5,
    marginTop: 20,
  },
  h2: {
    width: "100%",
    textAlign: "center",
    color: "#A3AABF",
    fontSize: 17,
    marginBottom: 20,
    marginTop: 10,
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

export default ForgetPassword;
