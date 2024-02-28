import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Footer = ({ iconName, selectedIcon }) => {
  const navigation = useNavigation();

  const isSelected = iconName === selectedIcon;
  const iconColor = isSelected ? "#3498db" : "#828282";

  const handlePress = () => {
    switch (iconName) {
      case "home":
        navigation.navigate("Home");
        break;
      case "explore":
        navigation.navigate("Explore");
        break;
      case "settings":
        navigation.navigate("Settings");
        break;
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{
          ...styles.absoluteIcon,
          backgroundColor: isSelected ? "#000" : "#FFF",
        }}
        onPress={handlePress}
      >
        <Icon name={iconName} size={25} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  absoluteIcon: {
    marginHorizontal: 21,
    alignItems: "center",
    paddingVertical: 0,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
};

export default Footer;
