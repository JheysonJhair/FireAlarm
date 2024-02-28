import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import GoogleButton from "../../components/forms/GoogleButton";
import FacebookButton from "../../components/forms/FacebookButton";
import StatusModal from "../../components/modals/StatusModal ";

import { loginUser } from "../../api/apiLogin";
import { useUser } from "../../components/utils/UserContext";

export default function Login() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const { setUserInfo } = useUser();

  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(isChecked);
  const onHandleLogin = async (email, password) => {
    ///xddd
    navigation.navigate("Home");
    try {
      if (!email || !password) {
        setModalStatus("error");
        setModalVisible(true);
        setText("Campos vacios");
        setText2("Complete todos los campos, es necesario!");
        return;
      }

      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setModalStatus("error");
        setModalVisible(true);
        setText("Correo invalido");
        setText2("Por favor, utiliza una cuenta de Gmail.");
        return;
      }

      const user = await loginUser(email, password);

      if (user.msg == "Ingreso correctamente") {
        if (isChecked) {
          saveUserData();
        } 
        setUserInfo({
          IdUser: user.value.IdUser,
          FirstName: user.value.FirstName,
          LastName: user.value.LastName,
          BirthDate: user.value.BirthDate,
          Phone: user.value.Phone,
          ProfileImage: user.value.ProfileImage,
          UserName: user.value.UserName,
          Description: user.value.Description,
        });

        const birthDate = new Date(user.birthDate);
        const today = new Date();

        const age = today.getFullYear() - birthDate.getFullYear();
        if (age >= 16 || birthDate) {
          navigation.navigate("Home");
        } else {
          setModalStatus("warning");
          setModalVisible(true);
          setText("Opps! menor de edad");
          setText2("Usted no cumple con los requisitos mínimos");
        }
      } else {
        setModalStatus("error");
        setModalVisible(true);
        setText("Error de ingreso");
        setText2("Crea una cuenta, es muy rápido!");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };
  const handleForgotPassword = () => {
    navigation.navigate("ForgetPassword");
  };

  ///
  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify({ email, password }));
    } catch (error) {
      console.error("Error al guardar datos de usuario:", error);
    }
  }
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
    } catch (error) {
      console.error("Error al borrar datos de usuario:", error);
    }
  };
  ///
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
      <Text style={styles.h2}>Hola, Bienvenido de nuevo</Text>
      <Text style={styles.h3}>Introduce tus credenciales para continuar</Text>

      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <InputPassword
          placeholder="Contraseña"
          onChangeText={(text) => setPassword(text)}
          value={password}
          editable={true}
        />
        <View style={styles.checkboxContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.izquierda}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? "#2e4466" : undefined}
              />
              <Text style={styles.checkboxLabel}>Recuérdame</Text>
            </View>
            <View style={styles.derecha}>
              <Text
                style={styles.forgotPassword}
                onPress={handleForgotPassword}
              >
                Olvidaste tu contraseña?
              </Text>
            </View>
          </View>
        </View>
        <Button
          title="Iniciar Sesión"
          onPress={() => onHandleLogin(email, password)}
        />
      </View>

      <View style={styles.texto}>
        <Text style={styles.h3}>
          No tienes cuenta?{" "}
          <Text style={styles.span} onPress={handleRegister}>
            Registrate
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
  h1: {
    fontFamily: "Montserrat_800ExtraBold",
    fontSize: 36,
    color: "#000000",
    marginBottom: 5,
    marginTop: 20,
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 20,
    marginTop: 15,
  },
  texto: {
    marginTop: 15,
  },
  h3: {
    color: "#A3AABF",
    fontSize: 14,
    marginBottom: 25,
  },
  span: {
    color: "#2e4466",
    fontWeight: "bold",
  },
  //checkboxContainer
  checkboxContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
  },
  izquierda: {
    flexDirection: "row",
    alignItems: "center",
  },
  derecha: {
    width: 200,
    alignItems: "flex-end",
  },
  checkboxLabel: {
    color: "#000",
    fontSize: 13,
    marginLeft: 5,
  },
  forgotPassword: {
    color: "#2e4466",
    fontSize: 13,
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
    backgroundColor: "#1B2536",
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
    marginTop: 8,
    width: "95%",
  },
});
