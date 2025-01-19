// import React from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// // Assume this is the order structure
// interface Order {
//   id: number;
//   customerName: string;
//   vegetable: string;
//   quantity: number;
//   status: string; // Can be 'pending', 'accepted', or 'rejected'
// }

// interface Props {
//   acceptedOrders: Order[];
// }

// const OrderHistoryScreen: React.FC<Props> = ({ acceptedOrders }) => {
//   const renderOrder = ({ item }: { item: Order }) => (
//     <View style={styles.orderContainer}>
//       <Text style={styles.text}><Text style={styles.boldText}>Customer:</Text> {item.customerName}</Text>
//       <Text style={styles.text}><Text style={styles.boldText}>Vegetable:</Text> {item.vegetable}</Text>
//       <Text style={styles.text}><Text style={styles.boldText}>Quantity:</Text> {item.quantity} kg</Text>
//       <Text style={styles.text}><Text style={styles.boldText}>Status:</Text> {item.status}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Order History</Text>
//       {acceptedOrders.length === 0 ? (
//         <Text style={styles.noOrdersText}>No accepted orders yet.</Text>
//       ) : (
//         <FlatList
//           data={acceptedOrders}
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
//   noOrdersText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#888',
//   },
// });

// export default OrderHistoryScreen;
