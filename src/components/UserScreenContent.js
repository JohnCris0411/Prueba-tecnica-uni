import React, { useState, useEffect, useCallback } from "react";
import firebase from "../utils/Firebase";
import { StyleSheet, ActivityIndicator } from "react-native";
import { getCurrentUser, isUserLogged } from "../utils/actions";
import UserLogged from "./Account/UserLogged";
import UserGuest from "./Account/UserGuest";
import { useFocusEffect } from "@react-navigation/native";

export default function UserScreenContent() {
  const [login, setLogin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const user = getCurrentUser();
      user ? setLogin(true) : setLogin(false);
    }, [])
  );

  if (login == null) {
    return (
      <ActivityIndicator
        size="large"
        color="#8FB5BF"
        style={{ backgroundColor: "transparent" }}
      />
    );
  }

  return login ? <UserLogged /> : <UserGuest />;
}

const styles = StyleSheet.create({});
