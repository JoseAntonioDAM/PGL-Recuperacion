import { Slot, useRouter, usePathname } from "expo-router";
import { useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function RootLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function navigate(route: string) {
  setDrawerOpen(false);
  if (route === "/") {
    router.replace("/");
  } else {
    router.push(route as any);
  }
}

  const ROUTES = [
  { label: " Bienvenida", route: "/" },
  { label: " Portfolio", route: "/(portfolio)/hobbies" },
  { label: " Mis Coches", route: "/lista" },
];
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => setDrawerOpen(!drawerOpen)} style={styles.menuBtn}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>
        <Text style={styles.headerTitle}>PGL Navigation</Text>
      </View>

      {/* DRAWER OVERLAY */}
      {drawerOpen && (
        <Pressable
          style={styles.overlay}
          onPress={() => setDrawerOpen(false)}
        />
      )}

      {/* DRAWER */}
      {drawerOpen && (
        <View style={styles.drawer}>
          <Text style={styles.drawerTitle}>Menú</Text>
          {ROUTES.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => navigate(item.route)}
              style={[
                styles.drawerItem,
                pathname === item.route && styles.drawerItemActive,
              ]}
            >
              <Text style={styles.drawerItemText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}

      {/* CONTENIDO */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  menuBtn: {
    padding: 4,
  },
  menuIcon: {
    color: "#ffffff",
    fontSize: 24,
  },
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
  drawerItemActive: {
    backgroundColor: "#343a40",
  },
  drawerItemText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
});