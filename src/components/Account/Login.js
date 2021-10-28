import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "./LoginForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/new_user2.png")}
        style={styles.image}
      />
      <View style={styles.contaner}>
        <LoginForm />
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
    </KeyboardAwareScrollView>
  );
}

function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text
      style={styles.register}
      onPress={() => navigation.navigate("Register")}
    >
      ¿Aún no tienes una cuenta?{" "}
      <Text style={styles.btnRegister}>Registrate</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "20%",
    height: 100,
    marginTop: 20,
    marginLeft: "40%",
    borderRadius: 200,
  },
  contaner: {
    marginHorizontal: 40,
    marginTop: 10,
  },
  divider: {
    backgroundColor: "#008FFF",
    margin: 40,
  },
  register: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  btnRegister: {
    color: "#008FFF",
    fontWeight: "bold",
  },
});
