import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const VerificationInput = ({
  placeholder,
  onChangeText,
  value,
  isVerified,
}) => {
  const handleTextChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    const truncatedText = numericText.slice(0, 6);

    onChangeText(truncatedText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isVerified && styles.disabledInput]}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        value={value}
        keyboardType="numeric"
        maxLength={6}
        autoCapitalize="none"
        placeholderTextColor="#C6CBD9"
        editable={!isVerified}
      />
      {isVerified && value.length === 6 && (
        <View style={styles.successContainer}>
          <Icon name="check-circle" size={20} color="#40A5E7" />
          <Text style={styles.successText}>Verificado con éxito</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    alignItems: "left",
    marginLeft: "5%",
  },
  input: {
    backgroundColor: "#edf0f7",
    borderColor: "#a8b0c4",
    borderWidth: 1,
    padding: 11,
    borderRadius: 6,
    color: "#000",
    fontSize: 16,
    width: "100%",
    marginBottom: 4,
  },
  disabledInput: {
    opacity: 0.6, 
  },
  successContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  successText: {
    color: "#40A5E7",
    marginLeft: 5,
  },
});

export default VerificationInput;
