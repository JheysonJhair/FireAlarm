import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Notification from "../../components/admin/Notification";
import * as Location from "expo-location";
import LoadingIndicator from "../../components/modals/LoadingIndicator";
import { fetchData } from "../../api/apiFire";
import { useNavigation } from "@react-navigation/native";
function Notify() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setNotifications(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const handleNotificationPress = (notification) => {
    navigation.navigate("Information", { notification });
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
      } catch (error) {
        console.error("Error obtaining addresses:", error);
      }
    };
  }, [notifications]);

  const formatDate = (dateString) => {
    const dateParts = dateString.split("T");
    return dateParts[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notificaciones</Text>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <ScrollView>
            {notifications.map((notification, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleNotificationPress(notification)}
              >
                <Notification
                  imageSource={require("../../assets/logo.png")}
                  status={"amarillo"}
                  location={notification.latitud + notification.longitud}
                  date={formatDate(notification.date)}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    paddingTop: 18,
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Notify;