import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

export async function schedulePushNotification(texto, scheduledTime) {
  let bodyMessage = texto;

  const now = new Date();
  const scheduledDate = new Date(scheduledTime);
  const timeDiff = scheduledDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    console.warn("La hora programada ya ha pasado.");
    return;
  }


  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Llegó la notificación!",
      body: bodyMessage,
      sound: require("../assets/sonido.mp3"), 
      icon: Platform.OS === "android" ? require("../assets/logo.png") : null,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    },
    trigger: {
      seconds: timeDiff / 1000, 
    },
  });
}
