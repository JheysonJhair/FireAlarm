import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const Reporte = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reporte Realizado</Text>
      <View style={styles.reportContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.reportTitle}>
            Medida de prevención contra incendios
          </Text>
          <Text style={styles.location}>Olivo- Abcany</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>12/12/12</Text>
        </View>
      </View>
      <Button title="Volver" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  reportContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
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
    borderRadius: 25,
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
