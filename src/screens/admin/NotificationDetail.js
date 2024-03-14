import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

function NotificationDetail({ route }) {
  const { notification } = route.params;
  const [selectedStatus, setSelectedStatus] = useState("Incendio");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log("Nuevo estado:", status);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.date}>{notification.date}</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 20,
    color: "#777",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#ccc",
  },
  selectedButton: {
    backgroundColor: "#FF6347",
  },
  selectedButton2: {
    backgroundColor: "#47a0ff",
  },
  selectedButton3: {
    backgroundColor: "#47ff93",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default NotificationDetail;
