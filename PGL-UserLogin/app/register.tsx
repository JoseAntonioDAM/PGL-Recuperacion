import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { register } from "../services/auth.service";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password: string): boolean {
    return password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password);
  }

  async function handleRegister() {
    if (fullname.trim() === "") {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "El email no es válido");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número"
      );
      return;
    }

    setLoading(true);
    try {
      await register({ fullname, email, pswd: password });
      Alert.alert("¡Éxito!", "Usuario registrado correctamente", [
        { text: "Iniciar sesión", onPress: () => router.replace("/login") },
      ]);
    } catch (error: any) {
      if (error.status === 409) {
        Alert.alert("Error", "Ya existe un usuario con ese email");
      } else if (error.status === 400) {
        Alert.alert("Error", "Datos inválidos");
      } else {
        Alert.alert("Error", "Ha ocurrido un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>Únete a PGL Recuperacion 🚗</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="José Antonio García"
          value={fullname}
          onChangeText={setFullname}
        />

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
          placeholder="Mínimo 8 caracteres, 1 mayúscula y 1 número"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? "Registrando..." : "Crear cuenta"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.replace("/login")}>
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta? <Text style={styles.link}>Inicia sesión</Text>
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
