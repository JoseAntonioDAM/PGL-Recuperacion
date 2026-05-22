import { useEffect, useState } from "react";
import { Slot, useRouter, usePathname } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { getToken, removeToken } from "../services/storage.service";

export default function RootLayout() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkToken();
  }, [pathname]);

  async function checkToken() {
    try {
      const savedToken = await getToken();
      setToken(savedToken);
      setLoading(false);
      if (!savedToken && pathname !== "/register") {
        router.replace("/login");
      }
    } catch (error) {
      setLoading(false);
      router.replace("/login");
    }
  }

  async function handleLogout() {
    try {
      await removeToken();
      setToken(null);
      setDrawerOpen(false);
      router.replace("/login");
    } catch (error) {
      console.log("ERROR EN LOGOUT:", error);
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#212529" />
      </View>
    );
  }

  if (!token) {
    return <Slot />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => setDrawerOpen(!drawerOpen)} style={styles.menuBtn}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>PGL Recuperacion</Text>
      </View>

      {drawerOpen && (
        <Pressable style={styles.overlay} onPress={() => setDrawerOpen(false)} />
      )}

      {drawerOpen && (
        <View style={styles.drawer}>
          <Text style={styles.drawerTitle}>Menú</Text>
          <Pressable
            style={styles.drawerItem}
            onPress={() => { setDrawerOpen(false); router.push("/welcome"); }}
          >
            <Text style={styles.drawerItemText}>🏠 Bienvenida</Text>
          </Pressable>
          <Pressable
            style={[styles.drawerItem, styles.drawerItemLogout]}
            onPress={handleLogout}
          >
            <Text style={styles.drawerItemTextLogout}>🚪 Cerrar sesión</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#212529",
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 16,
    gap: 16,
  },
  menuBtn: { padding: 4 },
  menuIcon: { color: "#ffffff", fontSize: 24 },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 260,
    backgroundColor: "#212529",
    zIndex: 20,
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  drawerTitle: {
    color: "#adb5bd",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 16,
    letterSpacing: 1,
  },
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  drawerItemLogout: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#343a40",
  },
  drawerItemText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  drawerItemTextLogout: {
    color: "#dc3545",
    fontSize: 16,
    fontWeight: "600",
  },
  content: { flex: 1 },
});