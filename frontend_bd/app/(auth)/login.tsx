// app/(auth)/login.tsx
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const clearStorage = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    Alert.alert("Storage limpiado");
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert(`Error: ${error}`, "Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* 👇 Botón temporal para limpiar */}
      <TouchableOpacity onPress={clearStorage}>
        <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          🗑️ Limpiar Storage (temporal)
        </Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <Link href="/register">
        <Text>Registrate</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
