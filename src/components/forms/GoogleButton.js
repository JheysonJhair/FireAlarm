import React, { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

//WebBrowser.maybeCompleteAuthSession();

const GoogleButton = ({ onPress }) => {
  // const [user, setUser] = React.useState(null);
  // const [accessToken, setAccessToken] = React.useState(null);
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   androidClientId: "490423802615-8q3143kagidflgfvcp9mcf2vbst0m90l.apps.googleusercontent.com",
  // });

  // useEffect(() => {
  //   const authenticateOnStart = async () => {
  //     await promptAsync();
  //   };

  //   authenticateOnStart();
  // }, []);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     setAccessToken(response.authentication.accessToken);
  //     accessToken && fetchUserInfo();
  //   }
  // }, [response, accessToken]);

  // async function fetchUserInfo() {
  //   let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const userInfo = await response.json();
  //   setUser(userInfo);
  // }

  // const WelcomeMessage = () => {
  //   if (user) {
  //     return <Text>¡BIENVENIDO! Entraste</Text>;
  //   }
  //   return null;
  // };

  return (
    <TouchableOpacity
      style={{ ...styles.socialButton, backgroundColor: "#2e4466" }}
      onPress={() => {
        // promptAsync();
        // onPress && onPress();
      }}
    >
      <Text style={styles.socialButtonText}>G</Text>
      {/*<WelcomeMessage />*/}
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

export default GoogleButton;
