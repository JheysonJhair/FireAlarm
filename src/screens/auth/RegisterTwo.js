import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import PhoneNumberInput from "../../components/forms/PhoneNumberInput ";
import StatusModal from "../../components/modals/StatusModal ";

import { registerUser, loginUser } from "../../api/apiLogin";
import { useUser } from "../../components/utils/UserContext";

export default function RegisterTwo() {
  const route = useRoute();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStatus, setModalStatus] = useState("error");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

  const { setUserInfo } = useUser();

  const email = route.params?.email || "";
  const password = route.params?.password || "";

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");

  const onHandleRegister = async () => {
    if (!nombre || !apellidos  || !telefono ) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Campos vacios");
      setText2("Complete todos los campos, es necesario!");
      return;
    }
    const phoneNumberRegex = /^\+51\d{9}$/;

    if (!phoneNumberRegex.test(telefono)) {
      setModalStatus("error");
      setModalVisible(true);
      setText("Error");
      setText2("Asegurate de que sea un número valido!");
      return;
    }
    try {
      const response = await registerUser({
        Email: email,
        Password: password,
        FirstName: nombre,
        LastName: apellidos,
        PhoneNumber: telefono,
        ProfileImage:
          "https://i.pinimg.com/736x/4b/a3/43/4ba343a87d8da59e1e4d0bdf7dc09484.jpg",
      });

      if (response.status === 201) {
        setModalStatus("succes");
        setModalVisible(true);
        setText("Registrado con exito");
        setText2("Usted se registro conrrectamente!");
        ////
        const user = await loginUser(email, password);
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
        navigation.navigate("Home");
        clearForm();
      } else {
        console.error(
          "Error en la solicitud de registro: Código de estado",
          response.status
        );
      }
    } catch (error) {
      console.error("Error en la solicitud de registro", error);
    }
  };
  const clearForm = () => {
    setNombre("");
    setApellidos("");
    setTelefono("");
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setTelefono(phoneNumber);
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
      <Text style={styles.h1}>Falta poco!</Text>
      <Text style={styles.h2}>Completa los campos</Text>

      <View style={styles.formContainer}>
        <Input
          placeholder="Nombre"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <Input
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={(text) => setApellidos(text)}
        />
        <PhoneNumberInput onPhoneNumberChange={handlePhoneNumberChange} />
        <Button title="REGISTRATE" onPress={() => onHandleRegister()} />
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
    fontSize: 34,
    color: "#000",
    marginBottom: 5,
    marginTop: 20,
  },
  h2: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000",
    fontSize: 15,
    marginTop: 5,
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
    color: "#40A5E7",
  },
  terminos: {
    position: "absolute",
    bottom: 30,
  },
  h3: {
    color: "#A3AABF",
    fontSize: 13,
  },
});
