import { Platform, Vibration } from "react-native"; // Agregar Vibration
import * as Notifications from "expo-notifications";

export async function schedulePushNotification(texto, scheduledTime) {
  let bodyMessage = texto;

  // Calcula la diferencia de tiempo hasta la hora programada
  const now = new Date();
  const scheduledDate = new Date(scheduledTime);
  const timeDiff = scheduledDate.getTime() - now.getTime();

  // Si la hora programada ya pasó, no se programa la notificación
  if (timeDiff <= 0) {
    console.warn("La hora programada ya ha pasado.");
    return;
  }

  // Configura la vibración
  const vibrationPattern = [0, 250, 250, 250]; // Ejemplo de patrón de vibración (vibra, pausa, vibra, pausa, vibra)
  const vibrationConfig = {
    vibrate: vibrationPattern,
  };

  // Programa la notificación para la hora especificada
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "¡Llegó la notificación!",
      body: bodyMessage,
      sound: "default",
      ...vibrationConfig, // Agregar configuración de vibración
      icon: Platform.OS === "android" ? require("../assets/logo.png") : null,
    },
    trigger: {
      seconds: timeDiff / 1000, // Convertir la diferencia de tiempo a segundos
    },
  });
}
