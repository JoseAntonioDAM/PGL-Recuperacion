import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { login } from "../services/auth.service";
import { saveToken } from "../services/storage.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleLogin() {
    if (!validateEmail(email)) {
      Alert.alert("Error", "El email no es válido");
      return;
    }
    if (password.trim() === "") {
      Alert.alert("Error", "La contraseña no puede estar vacía");
      return;
    }

    setLoading(true);
    try {
      const response = await login({ email, pswd: password });
      console.log("RESPUESTA LOGIN:", JSON.stringify(response));
      await saveToken(response.object.token);
      router.replace("/welcome");
    } catch (error: any) {
      console.log("TIPO ERROR:", typeof error);
      console.log("ERROR COMPLETO:", error);
      console.log("ERROR MESSAGE:", error?.message);
      console.log("ERROR STATUS:", error?.status);
      console.log("ERROR STRINGIFIED:", JSON.stringify(error));

      if (error.status === 401) {
        Alert.alert("Error", "Email o contraseña incorrectos");
      } else if (error.status === 400) {
        Alert.alert("Error", "Datos inválidos");
      } else {
        Alert.alert("Error", `Mensaje: ${error?.message}\nStatus: ${error?.status}`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <Text style={styles.subtitle}>Bienvenido de nuevo 👋</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/register")}>
          <Text style={styles.linkText}>
            ¿No tienes cuenta? <Text style={styles.link}>Regístrate</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#212529",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 32,
  },
  form: { gap: 12 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    backgroundColor: "#ffffff",
    color: "#212529",
  },
  btn: {
    backgroundColor: "#212529",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnDisabled: { backgroundColor: "#adb5bd" },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  linkText: {
    textAlign: "center",
    color: "#6c757d",
    marginTop: 8,
  },
  link: {
    color: "#212529",
    fontWeight: "700",
  },
});