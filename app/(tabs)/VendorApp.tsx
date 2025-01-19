// import React, { useState } from "react";
// import { View, Text, Button, Alert, FlatList, StyleSheet } from "react-native";

// // Assume this is the order structure
// interface Order {
//   id: number;
//   customerName: string;
//   vegetable: string;
//   quantity: number;
//   status: string; // Can be 'pending', 'accepted', or 'rejected'
// }

// const VendorApp: React.FC<{ navigation: any }> = ({ navigation }) => {
//   // Initial list of orders
//   const [orders, setOrders] = useState<Order[]>([
//     { id: 1, customerName: "John Doe", vegetable: "Tomato", quantity: 5, status: "pending" },
//     { id: 2, customerName: "Jane Smith", vegetable: "Potato", quantity: 3, status: "pending" },
//     { id: 3, customerName: "David Johnson", vegetable: "Carrot", quantity: 8, status: "pending" },
//   ]);

//   // Function to accept an order
//   const acceptOrder = (id: number) => {
//     setOrders(orders.map(order => 
//       order.id === id ? { ...order, status: "accepted" } : order
//     ));
//     Alert.alert("Order Status", "Order has been accepted!");
//   };

//   // Function to reject an order
//   const rejectOrder = (id: number) => {
//     setOrders(orders.filter(order => order.id !== id));
//     Alert.alert("Order Status", "Order has been rejected and removed!");
//   };

//   const renderOrder = ({ item }: { item: Order }) => (
//     <View style={styles.orderContainer}>
//       <Text style={styles.text}><Text style={styles.boldText}>Customer:</Text> {item.customerName}</Text>
//       <Text style={styles.text}><Text style={styles.boldText}>Vegetable:</Text> {item.vegetable}</Text>
//       <Text style={styles.text}><Text style={styles.boldText}>Quantity:</Text> {item.quantity}</Text>
//       <Text style={styles.text}><Text style={styles.boldText}>Status:</Text> {item.status}</Text>
//       {item.status === "pending" && (
//         <View style={styles.buttonContainer}>
//           <Button title="Accept" onPress={() => acceptOrder(item.id)} />
//           <View style={styles.spacing} />
//           <Button title="Reject" onPress={() => rejectOrder(item.id)} color="red" />
//         </View>
//       )}
//       {item.status === "accepted" && (
//         <Text style={styles.acceptedText}>Order has been accepted.</Text>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Vendor Dashboard</Text>
//       <Button
//         title="Go to Inventory"
//         onPress={() => navigation.navigate('InventoryScreen')}
//       />
//       {orders.length === 0 ? (
//         <Text style={styles.noOrdersText}>No pending orders.</Text>
//       ) : (
//         <FlatList
//           data={orders}
//           renderItem={renderOrder}
//           keyExtractor={item => item.id.toString()}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   orderContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   boldText: {
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   spacing: {
//     width: 10,
//   },
//   acceptedText: {
//     marginTop: 10,
//     fontStyle: 'italic',
//     color: 'green',
//   },
//   noOrdersText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default VendorApp;
