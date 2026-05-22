import { Image, StyleSheet, Text, View } from "react-native";

export function PortfolioHeader() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require("../assets/icon.png")}
      />
      <View style={styles.info}>
        <Text style={styles.name}>⚙️ Jose Engineering</Text>
        <Text style={styles.desc}>
          Soy José Antonio y estudio desarrollo de software con 19 años en
          Salesianos La Cuesta 📍
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#212529",
    padding: 16,
    gap: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  info: {
    flex: 1,
  },
  name: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  desc: {
    color: "#adb5bd",
    fontSize: 13,
    lineHeight: 18,
  },
});