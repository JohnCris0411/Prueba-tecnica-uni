import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Toast from "react-native-easy-toast";

import { closeSession, getCurrentUser } from "../../utils/actions";
import InfoUser from "./InfoUser";

export default function UserLogged() {
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
      <InfoUser user={user} />
      <Button
        color="#008fff"
        mode="contained"
        style={styles.btnLogout}
        onPress={() => {
          closeSession();
          navigation.navigate("Unsplash");
        }}
      >
        Cerrar sesion
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnLogout: {
    marginHorizontal: 100,
  },
  container: {
    minHeight: "100%",
    marginTop: 100,
  },
});
