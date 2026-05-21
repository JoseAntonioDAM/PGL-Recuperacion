import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "../services/storage.service";
import { getWelcome } from "../services/auth.service";

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const t = await getToken();
      if (!t) {
        router.replace("/login");
      }
    }
    check();
  }, []);

  async function handleWelcome() {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "No hay sesión activa");
        return;
      }
      const response = await getWelcome(token);
      Alert.alert("👋 Bienvenido", response.message);
    } catch (error: any) {
      Alert.alert("Error", "Token inválido o expirado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🚗</Text>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>
        Has iniciado sesión correctamente en PGL Recuperacion
      </Text>

      <Pressable
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={handleWelcome}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? "Cargando..." : "👋 Ver mensaje de bienvenida"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 16,
  },
  emoji: { fontSize: 80 },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#212529",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
  },
  btn: {
    backgroundColor: "#212529",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  btnDisabled: { backgroundColor: "#adb5bd" },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});