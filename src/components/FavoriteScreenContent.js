import React, { useState, useEffect, useCallback } from "react";
import firebase from "../utils/Firebase";
import { StyleSheet, ActivityIndicator } from "react-native";
import { getCurrentUser, isUserLogged } from "../utils/actions";

import { useFocusEffect } from "@react-navigation/native";
import FavoriteLogged from "./Account/FavoriteLogged";
import FavoriteGuest from "./Account/FavoriteGuest";

export default function favoriteScreencontent() {
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

  return login ? <FavoriteLogged /> : <FavoriteGuest />;
}

const styles = StyleSheet.create({});
