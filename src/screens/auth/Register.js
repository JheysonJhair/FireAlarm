import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneNumberInput from "../../components/forms/PhoneNumberInput ";
import GoogleButton from "../../components/forms/GoogleButton";
import FacebookButton from "../../components/forms/FacebookButton";
import Button from "../../components/forms/Button";
import Input from "../../components/forms/Input";
import InputPassword from "../../components/forms/InputPassword";
import StatusModal from "../../components/modals/StatusModal ";
import { registerUser, loginUser } from "../../api/apiLogin";
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
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");

  const onHandleRegister = async () => {
    if (!nombre || !apellidos || !telefono || !email || !password) {
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
    setEmail("");
    setApellidos("");
    setNombre("");
    setTelefono("");
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
  const handlePhoneNumberChange = (phoneNumber) => {
    setTelefono(phoneNumber);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.h1}>FireAlarm</Text>
      <Text style={styles.h2}>Crea tu nueva cuenta</Text>

      <View style={styles.formContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          isVerified={false}
        />
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
        <PhoneNumberInput onPhoneNumberChange={handlePhoneNumberChange} />
        <Button title="REGISTRATE" onPress={() => onHandleRegister()} />
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
