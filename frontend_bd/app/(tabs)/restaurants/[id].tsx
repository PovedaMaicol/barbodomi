import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useNegocios } from "@/hooks/negocios/useNegocios";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getAllNegocios } = useNegocios();

  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const response = await getAllNegocios();

      if (response?.success && Array.isArray(response.data)) {
        const found = response.data.find((item) => item.id.toString() === id);
        setRestaurant(found || null);
      }

      setLoading(false);
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  if (loading) {
    return <Text style={styles.center}>Cargando...</Text>;
  }

  if (!restaurant) {
    return <Text style={styles.center}>Restaurante no encontrado</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>

      <Text style={styles.text}>{restaurant.description}</Text>
      <Text style={styles.text}>📍 {restaurant.address}</Text>
      <Text style={styles.text}>📞 {restaurant.phone}</Text>
      <Text style={styles.text}>✉️ {restaurant.email}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  center: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
