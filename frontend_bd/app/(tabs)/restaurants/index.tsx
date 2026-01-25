import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RestaurantCard } from "./components";

export default function RestaurantsScreen() {
  const restaurants = [
    {
      id: "1",
      name: "Frisby - Pollo",
      deliveryTime: "49 min",
      minPrice: 1800,
      distance: "1.4 km",
      rating: 4.0,
      reviewCount: 573,
      hasFreeDelivery: false,
    },
    // ... más restaurantes
  ];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restaurantes</Text>

      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} {...restaurant} />
      ))}
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
