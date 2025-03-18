import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,TouchableOpacity, Pressable } from "react-native";


export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Link href={"/page2"} style={{marginHorizontal:"auto" }} asChild >
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>
        Go to page2
        </Text>
     </TouchableOpacity>
      </Link>
      <Link href={"/page3"} style={{marginHorizontal:"auto" }} asChild >
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>
        Go to page2
        </Text>
     </TouchableOpacity>
      </Link>
      <Link href={"/page4"} style={{marginHorizontal:"auto" }} asChild >
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>
        Go to page2
        </Text>
     </TouchableOpacity>
      </Link>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    color: "white",
    borderWidth: 1,
    borderColor: "steelblue",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    backgroundColor: "steelblue",
    opacity: 0.8,
    shadowColor : "black",
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});
