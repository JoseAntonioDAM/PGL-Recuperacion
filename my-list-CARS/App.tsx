import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Crypto from "expo-crypto";

import { Car, Category } from "./types/Car";
import { CarItem } from "./components/CarItem";
import { AddCarModal } from "./components/AddCarModal";

export default function App() {
  const [coches, setCoches] = useState<Car[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // --- Contadores ---
  const totalCoches = coches.length;
  const cochesMarcados = coches.filter((c) => c.marcado).length;
  const precioTotal = coches
    .filter((c) => c.marcado)
    .reduce((acc, c) => acc + c.precio, 0);

  // --- Acciones ---
  function handleAdd(nombre: string, categoria: Category, precio: number) {
  const nuevoCoche: Car = {
    id: Crypto.randomUUID(),
    nombre,
    categoria,
    precio,
    marcado: false,
  };
  setCoches((prev) => [...prev, nuevoCoche]);
}

  function handleDelete(id: string) {
    setCoches((prev) => prev.filter((c) => c.id !== id));
  }

  function handleToggle(id: string) {
    setCoches((prev) =>
      prev.map((c) => (c.id === id ? { ...c, marcado: !c.marcado } : c))
    );
  }

  function handleClearAll() {
    setCoches([]);
  }

  return (
    <View style={styles.container}>

      {/* CABECERA */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🚗 Mi Lista de Coches</Text>
      </View>

      {/* CONTADORES */}
      <View style={styles.countersRow}>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>{totalCoches}</Text>
          <Text style={styles.counterLabel}>Total</Text>
        </View>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>{cochesMarcados}</Text>
          <Text style={styles.counterLabel}>Marcados</Text>
        </View>
        <View style={styles.counterBox}>
          <Text style={styles.counterNumber}>
            {precioTotal.toLocaleString("es-ES")} €
          </Text>
          <Text style={styles.counterLabel}>Precio marcados</Text>
        </View>
      </View>

      {/* LISTA O MENSAJE VACÍO */}
      {coches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🏁</Text>
          <Text style={styles.emptyText}>No hay coches en la lista</Text>
          <Text style={styles.emptySubtext}>
            Pulsa el botón + para añadir uno
          </Text>
        </View>
      ) : (
        <FlatList
          data={coches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarItem
              car={item}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* BOTONES INFERIORES */}
      <View style={styles.bottomRow}>
        <Pressable
          onPress={handleClearAll}
          disabled={coches.length === 0}
          style={[
            styles.btnClearAll,
            coches.length === 0 && styles.btnDisabled,
          ]}
        >
          <Text style={styles.btnClearAllText}>🗑️ Borrar todo</Text>
        </Pressable>

        <Pressable
          onPress={() => setModalVisible(true)}
          style={styles.btnAdd}
        >
          <Text style={styles.btnAddText}>+</Text>
        </Pressable>
      </View>

      {/* MODAL */}
      <AddCarModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAdd}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#212529",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
  },
  countersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#343a40",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  counterBox: {
    alignItems: "center",
  },
  counterNumber: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "800",
  },
  counterLabel: {
    color: "#adb5bd",
    fontSize: 12,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  emptyEmoji: {
    fontSize: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#495057",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#adb5bd",
  },
  listContent: {
    paddingVertical: 8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
  },
  btnClearAll: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnDisabled: {
    backgroundColor: "#adb5bd",
  },
  btnClearAllText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  btnAdd: {
    backgroundColor: "#212529",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  btnAddText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "300",
    lineHeight: 36,
  },
});