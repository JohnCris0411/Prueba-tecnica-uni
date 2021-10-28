import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

export default function InfoUser({ user }) {
  console.log(user);
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="large"
        source={require("../../../assets/new_user2.png")}
      />
      <View>
        <Text style={styles.name}>
          {user.displayName ? user.displayName : "Usuario"}
        </Text>
        <Text style={styles.mail}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  mail: {
    fontWeight: "bold",
    padding: 10,
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: -5,
  },
});
