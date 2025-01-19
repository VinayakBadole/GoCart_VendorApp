// import React from 'react';
// import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
// import { useRoute, RouteProp } from 'expo-router';

// type CartItem = {
//   id: string;
//   name: string;
//   quantity: string; // Changed to string for quantity display (e.g., "1kg")
//   price: number;
// };

// type CustomerDetails = {
//   customerName: string;
//   orderDate: string;
//   cart: CartItem[];
//   totalPrice: number;
// };

// type CartScreenRouteProp = RouteProp<{ params: CustomerDetails }, 'params'>;

// export default function CartScreen() {
//   const route = useRoute<CartScreenRouteProp>();
//   const { customerName, orderDate, cart, totalPrice } = route.params;

//   const renderItem = ({ item }: { item: CartItem }) => (
//     <View style={styles.cartItem}>
//       <Text style={styles.itemName}>{item.quantity} {item.name}</Text>
//       <Text style={styles.itemPrice}>₹{item.price}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.customerInfo}>
//         <Text style={styles.customerName}>Customer: {customerName}</Text>
//         <Text style={styles.orderDate}>Date: {orderDate}</Text>
//       </View>
//       <FlatList
//         data={cart}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         ListFooterComponent={() => (
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
//           </View>
//         )}
//       />
//       <View style={styles.buttonContainer}>
//         <Button title="Accept" onPress={() => alert('Order Accepted')} color="green" />
//         <Button title="Reject" onPress={() => alert('Order Rejected')} color="red" />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   customerInfo: {
//     marginBottom: 20,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   orderDate: {
//     fontSize: 16,
//     color: '#555',
//   },
//   cartItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   itemName: {
//     fontSize: 16,
//   },
//   itemPrice: {
//     fontSize: 16,
//   },
//   totalContainer: {
//     marginTop: 20,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     paddingVertical: 10,
//   },
//   totalText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
// });
