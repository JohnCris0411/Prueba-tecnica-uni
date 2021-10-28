import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import AccountStack from "./AccountStack";
import Icon from "react-native-vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Unsplash"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Usuario"
          component={AccountStack}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoriteScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => (
              <Feather name="heart" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
