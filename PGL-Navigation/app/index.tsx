import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Bienvenida() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚗</Text>
      <Text style={styles.title}>¡Bienvenido a PGL Navigation!</Text>
      <Text style={styles.subtitle}>
        Explora el portfolio y gestiona tu lista de coches
      </Text>
      <Image style={styles.image} source={require("../assets/icon.png")} />
      <Pressable
        style={styles.btn}
        onPress={() => router.push("/(portfolio)/hobbies")}
      >
        <Text style={styles.btnText}>Ver Portfolio →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  emoji: { fontSize: 72 },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#212529",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#6c757d",
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 24,
    marginVertical: 16,
  },
  btn: {
    backgroundColor: "#212529",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});