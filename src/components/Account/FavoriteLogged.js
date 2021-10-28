import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Toast from "react-native-easy-toast";

import { closeSession, getCurrentUser } from "../../utils/actions";
import InfoUser from "./InfoUser";

export default function FavoriteLogged() {
  const toastRef = useRef();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser(user));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ¡Vaya! Aún no agregas nada a tus favoritos
      </Text>
      <Text style={styles.description}>
        para poder agregar favoritos, presiona el icono que aparece en la parte
        superior derecha de cada Post, ve al inicio y agrega unos cuantos
        presionando el boton de abajo
      </Text>
      <Button
        color="#008fff"
        mode="contained"
        onPress={() => navigation.navigate("Unsplash")}
      >
        Ir a inicio
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogout: {
    marginHorizontal: 100,
  },
  container: {
    marginTop: 100,
    marginHorizontal: 30,
  },
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
