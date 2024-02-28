import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import Button from "../../components/forms/Button";
import InputPassword from "../../components/forms/InputPassword";
import StatusModal from "../../components/modals/StatusModal ";

import { updatePassword } from "../../api/apiLogin";

const NewPassword = () => {
  const navigation = useNavigation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const route = useRoute();

  const email = route.params?.email || "";

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const actualizarContraseña = async () => {
    if (!password || !confirmPassword) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Campos vacios");
      setText2("Complete todos los campos, es necesario!");
      return;
    }
    if (password.length < 8) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Error");
      setText2("Asegurate de que las contraseñas sea minimo de 8 caracteres!");
      return;
    }
    if (password !== confirmPassword) {
      setModalStatus("warning");
      setModalVisible(true);
      setText("Advertencia");
      setText2("Las contraseñas no coinciden!");
      return;
    }

    try {
      const response = await updatePassword({
        Email: email,
        Password: password,
      });
      if (response.success) {
        setModalStatus("success");
        setModalVisible(true);
        setText("Actualizado con exito");
        setText2("Su contraseña se actualizo satisfactoriamente!.");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 3000);
      } else {
        console.error("Error al actualizar la contraseña:", response.error);
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
    }
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.h1}>Nueva Contraseña</Text>
      <Text style={styles.h2}>Tu identidad ha sido verificada!</Text>
      <View style={styles.formContainer}>
        <InputPassword
          placeholder="Contraseña"
          value={password}
          onChangeText={(text) => setPassword(text)}
          editable={true}
        />
        <InputPassword
          placeholder="Confirma tu contraseña"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          editable={true}
        />
        <Button title="Actualizar" onPress={actualizarContraseña} />
      </View>

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

export default NewPassword;
