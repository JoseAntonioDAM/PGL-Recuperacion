import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Car, Category } from "../types/Car";
import { CATEGORIES } from "../data/Categories";

type CarItemProps = {
  car: Car;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

export function CarItem({ car, onDelete, onToggle }: CarItemProps) {
  return (
    <Pressable
      onPress={() => onToggle(car.id)}
      style={[styles.card, car.marcado && styles.cardMarcado]}
    >
      <Image
        style={styles.imagen}
        source={CATEGORIES[car.categoria].imagen}
      />

      <View style={styles.info}>
        <Text style={[styles.nombre, car.marcado && styles.nombreTachado]}>
          {car.nombre}
        </Text>
        <Text style={styles.categoria}>
          {CATEGORIES[car.categoria].label}
        </Text>
        <Text style={styles.precio}>
          {car.precio.toLocaleString("es-ES")} €
        </Text>
      </View>

      <View style={styles.rightSection}>
        {car.marcado && (
          <Text style={styles.checkmark}>✓</Text>
        )}
        <Pressable onPress={() => onDelete(car.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>🗑️</Text>
        </Pressable>
      </View>

    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardMarcado: {
    backgroundColor: "#d4edda",
    borderLeftWidth: 5,
    borderLeftColor: "#28a745",
  },
  imagen: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#212529",
  },
  nombreTachado: {
    textDecorationLine: "line-through",
    color: "#6c757d",
  },
  categoria: {
    fontSize: 13,
    color: "#6c757d",
    marginTop: 2,
  },
  precio: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginTop: 4,
  },
  rightSection: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  checkmark: {
    fontSize: 22,
    color: "#28a745",
    fontWeight: "bold",
  },
  deleteBtn: {
    padding: 4,
  },
  deleteText: {
    fontSize: 20,
  },
});