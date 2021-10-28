import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase/app";
import Toast from "react-native-easy-toast";
import { Icon } from "react-native-elements";
import {
  addDocumentWithoutId,
  getCurrentUser,
  getIsFavorite,
  deleteFavorite,
} from "../utils/actions";

var ACCESS_KEY = "x8dxbKh9g9kqDSSKgh2ukJS9vktpstouP_OSvDy_FDI";
var API_KEY = "oe-YGaL55PYw8Tj0OUayu9_Cho0Rni8blBHDfW0nU9I";

const API_URL =
  `https://api.unsplash.com/photos?page=1&per_page=50&order_by=popular&client_id=` +
  ACCESS_KEY;

const fetchDataFromApi = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const results = await data.json();
  return results;
};

function Item({
  user_name,
  user_image,
  feed_image,
  like_count,
  description_photo,
}) {
  const toastRef = useRef();

  const [info, setInfo] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  const addFavorite = async () => {
    if (!userLogged) {
      toastRef.current.show(
        "Para agregar a favoritos debes iniciar sesion",
        3000
      );
      return;
    }
    /* useEffect(() => {
      (async () => {
        if (userLogged && info) {
          const response = await getIsFavorite(info.id);
          response.statusResponse && setIsFavorite(response.isFavorite);
        }
      })();
    }, []); */

    const response = await addDocumentWithoutId("favorites", {
      idUser: getCurrentUser().uid,
      idPhoto: user_name,
      user_image,
      feed_image,
      like_count,
      description_photo,
    });
    if (response.statusResponse) {
      setIsFavorite(true);
      toastRef.current.show("Añadido a Favoritos", 3000);
    } else {
      toastRef.current.show(
        "No se pudo agregar a favoritos. Intenta mas tarde",
        3000
      );
    }
  };

  /* const removeFavorite = () => {
    const response = await deleteFavorite(
      idPhoto = user_name,
      user_image,
      feed_image,
      like_count,
      description_photo
    );

    if (response.statusResponse) {
      setIsFavorite(false);
      toastRef.current.show("Post eliminado de favoritos", 3000);
    } else {
      toastRef.current.show(
        "No se pudo agregar a favoritos. Intenta mas tarde",
        3000
      );
    }
  }; */

  return (
    <View style={styles.container}>
      <Toast ref={toastRef} position={"center"} opacity={0.8} />
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.userImage}
              source={{
                uri: user_image,
              }}
            />
            <Text style={styles.userName}>{user_name}</Text>
          </View>
          <View style={styles.headerRight}>
            <Icon
              type="Fontawesome"
              name={isFavorite ? "bookmark" : "bookmark-outline"}
              onPress={isFavorite ? removeFavorite : addFavorite}
              size={35}
            />
          </View>
        </View>
        <Image
          style={styles.feedImage}
          source={{
            uri: feed_image,
          }}
        />
        <View style={{ backgroundColor: "#fff" }}>
          <Text style={styles.location}>{description_photo}</Text>
        </View>
        <View style={styles.cardFooter}>
          <FontAwesome name="heart" style={styles.footerIcon} />
          <Text style={{ color: "#000", marginEnd: 290, padding: 2 }}>
            {like_count}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function HomeContent() {
  const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchDataFromApi();

      setImages(images);
    };

    fetchImages();
  }, []);

  if (!images) {
    return (
      <ActivityIndicator
        size="large"
        color="#8FB5BF"
        style={{ backgroundColor: "transparent" }}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Item
            user_name={item.user.name}
            user_image={item.user.profile_image.large}
            feed_image={item.urls.small}
            like_count={item.likes}
            description_photo={item.description}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    height: 480,
    borderRadius: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  headerLeft: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  headerRight: {
    backgroundColor: "transparent",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  userName: {
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 15,
    color: "#000000",
  },
  location: { color: "#000" },
  favIcon: {
    fontSize: 25,
    marginTop: 15,
    color: "grey",
  },
  feedImage: {
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  footerLeft: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  footerIcon: {
    fontSize: 30,
    backgroundColor: "#fff",
    color: "red",
  },
});
