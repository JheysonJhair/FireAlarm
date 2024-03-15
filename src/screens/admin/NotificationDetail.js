import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Button from "../../components/forms/Button";

function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function NotificationDetail({ route }) {
  const { notification } = route.params;
  const [selectedStatus, setSelectedStatus] = useState("Incendio");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  const onDelete = () => {};
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>UBICACIÓN: Olivo/Abancay/Apurímac</Text>
        <Text style={styles.date}>
          Fecha del suceso: {formatDateString(notification.date)}
        </Text>
        <Text style={styles.title2}>Indicación:</Text>
        <Text style={styles.description}>
          Se està incendiando una casa serca de aqui por el ovalo del olivo, el
          Incendio es muy fuerte
        </Text>
        <View style={styles.linea}>
          <Text style={styles.title2}>Tomar medidas del caso</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === "Incendio" && styles.selectedButton,
            ]}
            onPress={() => handleStatusChange("Incendio")}
          >
            <Text style={styles.buttonText}>Incendio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === "En camino" && styles.selectedButton2,
            ]}
            onPress={() => handleStatusChange("En camino")}
          >
            <Text style={styles.buttonText}>En camino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedStatus === "Controlado" && styles.selectedButton3,
            ]}
            onPress={() => handleStatusChange("Controlado")}
          >
            <Text style={styles.buttonText}>Controlado</Text>
          </TouchableOpacity>
        </View>
        <Button title="Eliminar notificacion" onPress={() => onDelete()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  title2: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linea: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    paddingTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#676770",
  },
  selectedButton: {
    backgroundColor: "#FF6347",
  },
  selectedButton2: {
    backgroundColor: "#47a0ff",
  },
  selectedButton3: {
    backgroundColor: "#0a9b77",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default NotificationDetail;
