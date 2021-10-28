import firebase from "firebase/app";
//import { FireSQL } from "firesql";
import "firebase/auth";

//const db = firebase.firestore();

export const isUserLogged = () => {
  let isLogged = false;
  firebase.auth().onAuthStateChanged((user) => {
    user !== null && (isLogged = true);
  });
  return isLogged;
};
export const getCurrentUser = () => {
  return firebase.auth().currentUser;
};

export const closeSession = () => {
  return firebase.auth().signOut();
};

export const registerUser = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Este correo ya ha sido registrado";
  }
  return result;
};

export const loginSimple = async (email, password) => {
  const result = { statusResponse: true, error: null };
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    result.statusResponse = false;
    result.error = "Correo y/o contraseña incorrecto";
  }
  return result;
};

export const addDocumentWithoutId = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    await db.collection(collection).add(data);
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const getIsFavorite = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    const response = await db
      .collection("favorites")
      .where("data", "==", "data")
      .where("idUser", "==", getCurrentuser().uid)
      .get();
    result.iFavorite = response.docs.lenght > 0;
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};

export const deleteFavorite = async (collection, data) => {
  const result = { statusResponse: true, error: null };
  try {
    const response = await db
      .collection("favorites")
      .where("data", "==", "data")
      .where("idUser", "==", getCurrentuser().uid)
      .get();
    response.forEach(async (doc) => {
      const favoriteId = doc.id;
      await db.collection("favorites").doc(favoriteId).delete();
    });
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
