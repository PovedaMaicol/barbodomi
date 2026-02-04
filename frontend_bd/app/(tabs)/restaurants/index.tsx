import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNegocios } from "@/hooks/negocios/useNegocios";
import { useState, useEffect } from "react";
import { RestaurantCard } from "./components"; 
import { Negocio } from "@/types/negocio.types";

export default function RestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Negocio[]>([]);

  const { getAllNegocios, isLoading, error } = useNegocios();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await getAllNegocios();

      console.log("Restaurantes cargados:", response?.data);

      if (response?.success && Array.isArray(response.data)) {
        setRestaurants(response.data);
      } else {
        setRestaurants([]);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restaurantes</Text>
      {isLoading && <Text>Cargando restaurantes...</Text>}
      {error && <Text>Error: {error}</Text>}
      {!isLoading && restaurants.length === 0 ? (
        <Text>No hay restaurantes</Text>
      ) : (
        restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id.toString()}
            name={restaurant.name}
            img_url={restaurant.img_url}
            deliveryTime="30-40 min"
            minPrice={15000}
            distance="1.2 km"
            rating={4.5}
            reviewCount={120}
            hasFreeDelivery={true}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 16,
  },
});
