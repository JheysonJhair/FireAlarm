import React from "react";
import { TouchableOpacity, Text } from "react-native";
import * as Facebook from "expo-auth-session/providers/facebook";

const FacebookButton = ({ onPress }) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "id",
  });
  return (
    <TouchableOpacity
      style={{ ...styles.socialButton, backgroundColor: "#2e4466" }}
      onPress={() => {
        promptAsync();
        onPress && onPress();
      }}
    >
      <Text style={styles.socialButtonText}>F</Text>
    </TouchableOpacity>
  );
};

const styles = {
  socialButton: {
    backgroundColor: "#2e4466",
    borderRadius: 25,
    marginEnd: 4,
    marginStart: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  socialButtonText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Montserrat_800ExtraBold",
  },
};

export default FacebookButton;
