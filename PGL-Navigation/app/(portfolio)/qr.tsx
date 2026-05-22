import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QR() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ESCANÉA EL QR PARA IR AL REPOSITORIO</Text>
      <View style={styles.qrContainer}>
        <QRCode value="https://github.com/adhernea" size={200} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212529",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
    padding: 24,
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  qrContainer: {
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 16,
  },
});