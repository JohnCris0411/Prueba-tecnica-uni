import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Input, Icon } from "react-native-elements";
import { validateEmail } from "../utils/helpers";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../utils/actions";
import Loading from "../components/Loading";

export default function RegisterForm() {
  const [showpassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormdata({ ...formData, [type]: e.nativeEvent.text });
  };

  const doRegisterUser = async () => {
    if (!validateData()) {
      return;
    }
    setLoading(true);
    const result = await registerUser(formData.email, formData.password);
    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      return;
    }
    navigation.navigate("Account");
  };
  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirm("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email valido.");
      isValid = false;
    }

    if (size(formData.password) < 6) {
      setErrorPassword(
        "Debes ingresar una contraseña de almenos 6 caracteres."
      );
      isValid = false;
    }
    if (size(formData.confirm) < 6) {
      setErrorConfirm("Debes ingresar una contraseña de almenos 6 caracteres.");
      isValid = false;
    }

    if (formData.password !== formData.confirm) {
      setErrorPassword("Las contraseñas no coinciden");
      setErrorConfirm("Las contraseñas no coinciden");
      isValid = false;
    }

    return isValid;
  };
  return (
    <View style={styles.form}>
      <Input
        placeholder="Ingresa E-mail"
        containerStyle={styles.input}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
        defaultValue={formData.email}
      />
      <Input
        placeholder="Ingresa Contraseña"
        onChange={(e) => onChange(e, "password")}
        errorMessage={errorPassword}
        defaultValue={formData.password}
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showpassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showpassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showpassword)}
          />
        }
      />
      <Input
        placeholder="Confirmar Contraseña"
        onChange={(e) => onChange(e, "confirm")}
        errorMessage={errorConfirm}
        defaultValue={formData.confirm}
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!showpassword}
        rightIcon={
          <Icon
            type="material-community"
            name={showpassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.icon}
            onPress={() => setShowPassword(!showpassword)}
          />
        }
      />
      <Button
        mode="contained"
        color="#008fff"
        style={styles.btncontainer}
        onPress={() => doRegisterUser()}
      >
        Registrar
      </Button>
      {/* <Loading loading={loading} /> */}
    </View>
  );
}
const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginHorizontal: 5,
  },
  input: {
    width: "100%",
  },
  btncontainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  icon: {
    color: "#c1c1c1",
  },
});
