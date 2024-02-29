import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Load from "../screens/home/Load";
import Welcome from "../screens/home/Welcome";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Home from "../screens/home/Home";
import ForgetPassword from "../screens/auth/ForgetPassword";
import MapDelivery from "../screens/maps/MapDelivery";
import UserLocation from "../screens/maps/Userlocation";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Load"
        component={Load}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="mapLocation"
        component={MapDelivery}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#161B21",
          },
          headerTitleStyle: {
            color: "#fff",
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          title: "Ubicación de tienda",
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Explore"
        component={UserLocation}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#161B21",
          },
          headerTitleStyle: {
            color: "#fff",
            textAlign: "center",
          },
          headerTitleAlign: "center",
          headerTintColor: "#fff",
          title: "Ubicación en tiempo real",
        }}
      />
    </Stack.Navigator>
  );
}
