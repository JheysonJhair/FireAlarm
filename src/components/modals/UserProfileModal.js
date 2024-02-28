import React from "react";
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const UserProfileModal = ({ visible, avatar, userName, onClose, onChatPress, onInformationPress }) => {
  const navigation = useNavigation();

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={onChatPress}>
              <Icon name="comment" size={24} color="#40A5E7" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onInformationPress}>
              <Icon name="info-circle" size={24} color="#40A5E7"  style={styles.icon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={24} color="#ededed" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
  },
  avatar: {
    width: "100%", 
    aspectRatio: 1, 
  },
  userNameContainer: {
    position: "absolute",
    width:"100%",
    backgroundColor: "rgba(0, 12, 43, 0.2)", 
    padding: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ededed", 
  },
  iconContainer: {
    flexDirection: "row",
    width: "100%", 
    justifyContent: "center",
    backgroundColor:"#212834",
    padding:10
  },
  icon: {
    marginHorizontal: 10, 
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default UserProfileModal;
