import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getToken } from "../services/storage.service";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function redirect() {
      const token = await getToken();
      if (token) {
        router.replace("/welcome");
      } else {
        router.replace("/login");
      }
    }
    redirect();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#212529" />
    </View>
  );
}