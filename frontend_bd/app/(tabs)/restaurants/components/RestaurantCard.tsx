import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const RestaurantCard = ({
  name,
  deliveryTime,
  minPrice,
  distance,
  rating,
  reviewCount,
  hasFreeDelivery,
}: RestaurantCardProps) => {
  return (
    <TouchableOpacity style={styles.container}>
      {/* Imagen placeholder por ahora */}
      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.deliveryTime}>
          {deliveryTime} • ${minPrice}
        </Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    height: 150,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  deliveryTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  distance: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
export default RestaurantCard;

export interface RestaurantCardProps {
  id: string;
  name: string;
  deliveryTime: string;
  minPrice: number;
  distance: string;
  rating: number;
  reviewCount: number;
  hasFreeDelivery: boolean;
  imageUrl?: string;
  tags?: string[];
}
