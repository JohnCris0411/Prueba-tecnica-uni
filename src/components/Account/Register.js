import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RegisterForm from "../RegisterForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function Register() {
  return (
    <KeyboardAwareScrollView>
      <RegisterForm />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
