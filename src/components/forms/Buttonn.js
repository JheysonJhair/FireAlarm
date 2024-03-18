import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Buttonn = ({ onPress, title, disabled }) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={disabled ? ["#29364c", "#29364c"] : ["#29364c", "#29364c"]}
        style={styles.linearGradient}
      >
        <Text style={styles.textoBoton}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
    width: "100%",
  },
  linearGradient: {
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 15,
    width: "100%",
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 19,
    fontFamily: "Montserrat_800ExtraBold",
  },
});

export default Buttonn;
