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
      case "map":
        navigation.navigate("Explore");
        break;
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        style={{
          ...styles.absoluteIcon,
          backgroundColor: isSelected ? "#1c2536" : "#FFF",
        }}
        onPress={handlePress}
      >
        <Icon name={iconName} size={27} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  absoluteIcon: {
    marginHorizontal: 21,
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
  },
};

export default Footer;
