import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View>
      <ActivityIndicator
        size="large"
        color="#8FB5BF"
        style={{ backgroundColor: "transparent" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
