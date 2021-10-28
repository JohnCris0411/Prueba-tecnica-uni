import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.viewBody}>
      <Text style={styles.title}>¡Vaya! Aún no inicias sesion</Text>
      <Text style={styles.description}>
        Para poder disfrutar de todas las opciones disponibles debes contar con
        un usuario, inicia sesion o registrate en el boton de abajo
      </Text>
      <Button
        mode="outlined"
        color="#008fff"
        onPress={() => navigation.navigate("Login")}
      >
        Click aqui
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "justify",
    marginBottom: 20,
    color: "#a65273",
  },
});
