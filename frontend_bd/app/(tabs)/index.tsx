import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.city}>Bogotá</Text>
        <Text style={styles.address}>Cra 12 # 2-12</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="¿Qué quieres hoy?" style={styles.searchInput} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput placeholder="PROMOCIONES" style={styles.searchInput} />
      </View>

      {/* CATEGORÍAS GRANDES */}
      <View style={styles.bigCategories}>
        <TouchableOpacity
          style={styles.bigCard}
          onPress={() => router.push("restaurants")}
        >

          ;

          
          <Text style={styles.bigText}>Restaurantes</Text>
          <Image
            style={{ width: 50, height: 50, marginTop: 10 }}
            source={{
              uri: "https://img.icons8.com/fluency/48/000000/restaurant.png",
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigCard}>
          <Text style={styles.bigText}>Supermercados</Text>
          <Image
            style={{ width: 50, height: 50, marginTop: 10 }}
            source={{
              uri: "https://img.icons8.com/fluency/48/000000/shopping-cart.png",
            }}
          />
        </TouchableOpacity>
      </View>

      {/* CATEGORÍAS PEQUEÑAS - SCROLL HORIZONTAL */}
      <View style={styles.smallCategoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.smallCard}>
            <Text>Mercado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Text>Farmacia</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Text>Tiendas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smallCard}>
            <Text>Otros</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    padding: 16,
  },

  city: {
    fontSize: 18,
    fontWeight: "bold",
  },

  address: {
    fontSize: 14,
    color: "#666",
  },

  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  searchInput: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
  },

  bigCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  bigCard: {
    width: "48%",
    height: 120,
    backgroundColor: "#f6fcbaa7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  bigText: {
    fontSize: 16,
    fontWeight: "600",
  },

  smallCategoriesContainer: {
    paddingLeft: 16,
  },

  smallCard: {
    width: 90,
    height: 90,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
