import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@/hooks/users/useUser";

export default function RegisterScreen() {
  const router = useRouter();
  const { createUser, isLoading, error } = useUser();

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    primer_nombre: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    const result = await createUser(form);
    if (result.success) {
      Alert.alert("Success", "User registered successfully!");
      router.replace("/login");
    } else {
      Alert.alert("Error", result.error || "Registration failed.");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="First Name"
        value={form.primer_nombre}
        onChangeText={(text) => handleChange("primer_nombre", text)}
        style={{ borderWidth: 1, marginBottom: 10, width: 200, padding: 5 }}
      />

      <TextInput
        placeholder="Username"
        value={form.username}
        onChangeText={(text) => handleChange("username", text)}
        style={{ borderWidth: 1, marginBottom: 10, width: 200, padding: 5 }}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />

      <Pressable
        style={[styles.button, isLoading && styles.disabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Registering..." : "Register"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.replace("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    marginTop: 16,
    color: "#1e90ff",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
});
