import { FlatList, StyleSheet, Text, View } from "react-native";

const HOBBIES = [
  "🎮 Videojuegos",
  "🚗 Coches",
  "💻 Programación",
  "🎵 Música",
  "⚽ Fútbol",
  "📚 Leer",
];

export default function Hobbies() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Hobbies</Text>
      <FlatList
        data={HOBBIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#212529",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#212529",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "600",
  },
});