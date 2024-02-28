import React from "react";
import { TextInput, StyleSheet } from "react-native";

const TextArea = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.textArea}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      placeholderTextColor="#C6CBD9"
      multiline
      numberOfLines={4}
    />
  );
};

const styles = StyleSheet.create({
  textArea: {
    backgroundColor: "#212834",
    borderColor: "#212834",
    borderWidth: 1,
    padding: 11,
    borderRadius: 6,
    color: "white",
    fontSize: 16,
    width: "100%",
    marginBottom: 8,
    textAlignVertical: "top",
  },
});

export default TextArea;
