import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserScreen from "../screens/UserScreen";
import Login from "../src/components/Account/Login";
import Register from "../src/components/Account/Register";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={UserScreen}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Iniciar Sesion" }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ title: "Registrar usuario" }}
      />
    </Stack.Navigator>
  );
}
