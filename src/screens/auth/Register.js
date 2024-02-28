import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GoogleButton from "../../components/forms/GoogleButton";
import FacebookButton from "../../components/forms/FacebookButton";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import VerificationInput from "../../components/forms/VerificationInput ";
import StatusModal from "../../components/modals/StatusModal ";

import { verifyEmail, verifyCode } from "../../api/apiLogin";

export default function Register() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [isVerified, setIsVerified] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isReceivingCode, setIsReceivingCode] = useState(false);

  const onHandleLogin = () => {
     if (!email || !password || !confirmPassword) {
       setModalStatus("error");
       setModalVisible(true);
       setText("Campos vacios");
       setText2("Complete todos los campos, es necesario!");
       return;
     }
     if (password !== confirmPassword) {
       setModalStatus("warning");
       setModalVisible(true);
       setText("Advertencia");
       setText2("Las contraseñas no coinciden!");
       return;
     }
     if (password.length < 8) {
       setModalStatus("error");
       setModalVisible(true);
       setText("Error");
       setText2("Asegurate de que las contraseñas sea minimo de 8 caracteres!");
       return;
     }

    navigation.navigate("RegisterTwo", { email, password });
    clearForm();
  };

  const handleReceiveCode = async () => {
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

    const verificationResponse = await verifyEmail(email);

    if (verificationResponse.status === 200) {
      setModalStatus("loading");
      setModalVisible(true);
      setText("Verificando...");
      setText2(
        "Te hemos enviado un código a tu correo. Por favor, verifica en la carpeta de spam si no lo encuentras en la bandeja de entrada."
      );
      setIsReceivingCode(true);
    }
  };

  const handleVerficar = async () => {
    try {
      const verificationResponse = await verifyCode(verificationCode, email);
      if (verificationResponse.value === true) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);

        setIsVerified(true);
        setIsCorrect(true);
      } else {
        setModalStatus("error");
        setModalVisible(true);
        setText("Error");
        setText2(
          "Hubo un problema al verificar el codigo. Por favor, inténtalo de nuevo."
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (modalVisible) {
      const timeout = setTimeout(() => {
        setModalVisible(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [modalVisible]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.h1}>FireAlarm</Text>
      <Text style={styles.h2}>Crea tu nueva cuenta</Text>

      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          isVerified={isReceivingCode}
        />
        {isReceivingCode ? (
          <View style={styles.formContainer2}>
            <VerificationInput
              placeholder="Ingrese el código"
              onChangeText={(text) => setVerificationCode(text)}
              value={verificationCode}
              isVerified={isVerified}
            />
            {isCorrect ? (
              <View style={styles.formContainer2}>
                <InputPassword
                  placeholder="Contraseña"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  editable={isVerified}
                />
                <InputPassword
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  editable={isVerified}
                />
                <Button
                  title="Siguiente paso"
                  onPress={() => onHandleLogin()}
                />
              </View>
            ) : (
              <Button title="Verificar" onPress={() => handleVerficar()} />
            )}
          </View>
        ) : (
          <Button title="Recibir Código" onPress={() => handleReceiveCode()} />
        )}
      </View>

      <View style={styles.texto}>
        <Text style={styles.h3}>
          Tienes cuenta?{" "}
          <Text style={styles.span} onPress={handleLogin}>
            Iniciar Sesión
          </Text>
        </Text>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine}></View>
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine}></View>
      </View>
      <View style={styles.socialButtonsContainer}>
        <GoogleButton
          onPress={() => console.log("Botón de Google presionado")}
        />
        <FacebookButton
          onPress={() => console.log("Botón de Facebook presionado")}
        />
      </View>
      <StatusModal
        visible={modalVisible}
        status={modalStatus}
        text={text}
        text2={text2}
      />
    </KeyboardAvoidingView>
  );
}

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
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer2: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 34,
    color: "#000",
    marginBottom: 3,
    marginTop: 20,
  },
  h2: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 25,
  },
  texto: {
    marginTop: 15,
  },
  h3: {
    color: "#A3AABF",
    fontSize: 13,
  },
  span: {
    color: "#2e4466",
    fontWeight: "bold",
  },
  //Linea
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  dividerLine: {
    width: "32%",
    height: 1,
    backgroundColor: "#000",
  },
  dividerText: {
    color: "#000",
    marginHorizontal: 10,
    fontFamily: "Montserrat_800ExtraBold",
  },
  //Google y Facebook
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "95%",
  },
});
