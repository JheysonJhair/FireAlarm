import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "../../components/forms/Button";
import { useNavigation } from "@react-navigation/native";

const Reporte = () => {
  const navigation = useNavigation();
  const handleHome = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.reportContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.reportTitle}>Incendio Reportado</Text>
          <Text style={styles.location}>Olivo/Abancay/Apurimac</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>06/12/2024</Text>
        </View>
      </View>
      <Button title="Otro reporte" onPress={() => handleHome()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  dateContainer: {
    alignItems: "flex-end",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
});

export default Reporte;
