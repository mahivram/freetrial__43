import { useEffect } from "react";
import { Redirect } from "expo-router";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "./theme/colors";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.primary.main,
  },
});
