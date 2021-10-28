import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Icon, Input } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utils/helpers";
import { loginSimple } from "../../utils/actions";
import { isEmpty } from "lodash";
import Loading from "../../components/Loading";

export default function LoginForm() {
  const [showpassword, setShowPassword] = useState(false);
  const [formData, setFormdata] = useState(defaultFormValues());
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFormdata({ ...formData, [type]: e.nativeEvent.text });
  };

  const doLogin = async () => {
    if (!validateData()) {
      return;
    }
    setLoading(true);
    const result = await loginSimple(formData.email, formData.password);
    setLoading(false);

    if (!result.statusResponse) {
      setErrorEmail(result.error);
      setErrorPassword(result.error);
      return;
    }
    navigation.navigate("Account");
  };

  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(formData.email)) {
      setErrorEmail("Debes ingresar un email valido.");
      isValid = false;
    }
    if (isEmpty(formData.password)) {
      setErrorPassword("Debes ingresar tu contraseña.");
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
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
      <Button
        mode="contained"
        color="#008fff"
        style={styles.btncontainer}
        onPress={() => doLogin()}
      >
        Iniciar Sesion
      </Button>

      {/* <Loading loading={loading} /> */}
    </View>
  );
}
const defaultFormValues = () => {
  return { email: "", password: "" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  input: {
    width: "100%",
  },
  btncontainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});
