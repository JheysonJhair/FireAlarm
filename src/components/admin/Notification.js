import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Notification = ({ imageSource, location, date, status }) => {
  let statusIcon;
  switch (status) {
    case "amarillo":
      statusIcon = <Icon name="exclamation-circle" size={20} color="#FFC107" />;
      break;
    case "rojo":
      statusIcon = (
        <Icon name="exclamation-triangle" size={20} color="#FF0000" />
      );
      break;
    case "verde":
      statusIcon = <Icon name="check-circle" size={20} color="#4CAF50" />;
      break;
    default:
      statusIcon = <Icon name="circle" size={20} color="#000000" />;
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Olivo/Abancay/Apurimac</Text>
        <Text style={styles.location}>{date}</Text>
      </View>
      {statusIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
});

export default Notification;
