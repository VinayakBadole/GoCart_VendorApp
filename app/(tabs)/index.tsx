import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  StyleSheet,
} from "react-native";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";
import {database} from "../../firebaseConfig";
import * as Location from "expo-location";
import { ref, set } from "firebase/database";



interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Order {
  id: string; // Firestore document ID
  VendorName: string;
  cart: CartItem[];
  date: string;
  location: string;
  status: string;
  total: number;
  vendorContactNo: number;
}

const VendorApp: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [location, setLocation] = useState(null);


  // Fetch orders from Firebase
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const ordersData: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log("Fetched order data:", data); // Log data
        if (!data.VendorName || typeof data.VendorName !== "string") {
          console.error("Invalid VendorName in order:", data);
        }
        ordersData.push({ id: doc.id, ...data } as Order);
      });
      setOrders(sortOrders(ordersData));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  useEffect(() => {
  
    fetchOrders();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      // Watch user's location
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 1 },
        (loc) => {
          const { latitude, longitude } = loc.coords;
          setLocation({ latitude, longitude });

          //const ContactNo = "1234567890"; // Replace with dynamic user ID
          const userDocRef = doc(db, "vendors", "6MAkW7hqob18YFbmKkRb");

          updateDoc(userDocRef, {
            latitude,
            longitude,
          });

          // const userId = 1234567890; // Replace with dynamic user ID
          // set(ref(database,`/VendorLocations/${userId}`), {
          //   latitude,
          //   longitude,
          //   timestamp: Date.now(),
          // });
        }
      );
    })();
  }, []);


  // Sort orders by status (Pending first, then Accepted)
  const sortOrders = (orders: Order[]) => {
    return orders
      .filter((order) => order.status !== "Rejected") // Exclude rejected orders
      .sort((a, b) => (a.status === "Pending" ? -1 : 1));
  };

  // Accept order and update Firebase
  const acceptOrder = async (id: string) => {
    try {
      const orderRef = doc(db, "orders", id); // Use the document ID
      await updateDoc(orderRef, { status: "Accepted" });
      setOrders(
        sortOrders(
          orders.map((order) =>
            order.id === id ? { ...order, status: "Accepted" } : order
          )
        )
      );
      Alert.alert("Order Status", "Order has been accepted!");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  // Reject order and update Firebase
  const rejectOrder = async (id: string) => {
    try {
      const orderRef = doc(db, "orders", id); // Use the document ID
      await updateDoc(orderRef, { status: "Rejected" });
      setOrders(sortOrders(orders.filter((order) => order.id !== id)));
      Alert.alert("Order Status", "Order has been rejected!");
    } catch (error) {
      console.error("Error rejecting order:", error);
    }
  };

  // Track order action
  const trackOrder = (id: string) => {
    Alert.alert("Track Order", `Tracking information for Order ID: ${id}`);
  };

  // Render individual order
  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Vendor Name:</Text> {item.VendorName}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Location:</Text> {item.location}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Date:</Text> {item.date}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Status:</Text> {item.status}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.boldText}>Total:</Text> ₹{item.total}
      </Text>

      {item.status === "Pending" && (
        <View style={styles.buttonContainer}>
          <Button title="Accept" onPress={() => acceptOrder(item.id)} color="green" />
          <View style={styles.spacing} />
          <Button title="Reject" onPress={() => rejectOrder(item.id)} color="red" />
        </View>
      )}

      {item.status === "Accepted" && (
        <View style={styles.trackContainer}>
          <Button title="Track Order" onPress={() => trackOrder(item.id)} color="blue" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders available.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  orderContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  trackContainer: {
    marginTop: 10,
  },
  spacing: {
    width: 10,
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 50,
  },
});

export default VendorApp;
