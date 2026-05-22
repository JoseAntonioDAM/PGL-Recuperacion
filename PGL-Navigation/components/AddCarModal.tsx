import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Category } from "../types/Car";
import { CATEGORIES } from "../data/categories";

type AddCarModalProps = {
  visible: boolean;
  onClose: () => void;
  onAdd: (nombre: string, categoria: Category, precio: number) => void;
};

export function AddCarModal({ visible, onClose, onAdd }: AddCarModalProps) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Category>("deportivo");

  function handleAdd() {
    if (nombre.trim() === "") {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }
    if (precio.trim() === "" || isNaN(Number(precio)) || Number(precio) <= 0) {
      Alert.alert("Error", "El precio debe ser un número válido mayor que 0");
      return;
    }
    onAdd(nombre.trim(), categoriaSeleccionada, Number(precio));
    setNombre("");
    setPrecio("");
    setCategoriaSeleccionada("deportivo");
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Añadir coche</Text>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Ferrari 488"
            value={nombre}
            onChangeText={setNombre}
          />
          <Text style={styles.label}>Precio (€)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 250000"
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Categoría</Text>
          <View style={styles.categoriasRow}>
            {(Object.keys(CATEGORIES) as Category[]).map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setCategoriaSeleccionada(cat)}
                style={[
                  styles.categoriaBtn,
                  categoriaSeleccionada === cat && styles.categoriaBtnActivo,
                ]}
              >
                <Text
                  style={[
                    styles.categoriaBtnText,
                    categoriaSeleccionada === cat && styles.categoriaBtnTextActivo,
                  ]}
                >
                  {CATEGORIES[cat].emoji} {CATEGORIES[cat].label}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.botonesRow}>
            <Pressable onPress={onClose} style={styles.btnCancelar}>
              <Text style={styles.btnCancelarText}>Cancelar</Text>
            </Pressable>
            <Pressable onPress={handleAdd} style={styles.btnAnadir}>
              <Text style={styles.btnAnadirText}>Añadir</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    color: "#212529",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 4,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: "#212529",
  },
  categoriasRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  categoriaBtn: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoriaBtnActivo: {
    backgroundColor: "#212529",
    borderColor: "#212529",
  },
  categoriaBtnText: {
    fontSize: 13,
    color: "#495057",
  },
  categoriaBtnTextActivo: {
    color: "#ffffff",
    fontWeight: "700",
  },
  botonesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  btnCancelar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  btnCancelarText: {
    color: "#495057",
    fontWeight: "600",
  },
  btnAnadir: {
    flex: 1,
    backgroundColor: "#212529",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  btnAnadirText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
});