// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import * as Location from "expo-location";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "../../firebaseConfig";

// const UpdateLocation: React.FC<{ vendorId: string }> = ({ vendorId }) => {
//   const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     const requestLocationPermission = async () => {
//       try {
//         // Request location permission
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert("Permission Denied", "Location permission is required to update your location.");
//           return;
//         }

//         // Get initial location and update Firestore
//         const initialLocation = await Location.getCurrentPositionAsync({});
//         updateLocationInFirestore(initialLocation.coords.latitude, initialLocation.coords.longitude);

//         // Set up interval to update location every 5 minutes
//         interval = setInterval(async () => {
//           const newLocation = await Location.getCurrentPositionAsync({});
//           setLocation({
//             latitude: newLocation.coords.latitude,
//             longitude: newLocation.coords.longitude,
//           });

//           // Update Firestore
//           updateLocationInFirestore(newLocation.coords.latitude, newLocation.coords.longitude);
//         }, 5 * 60 * 1000); // 5 minutes
//       } catch (error) {
//         console.error("Error requesting location permission:", error);
//       }
//     };

//     requestLocationPermission();

//     return () => {
//       if (interval) clearInterval(interval); // Cleanup interval on unmount
//     };
//   }, []);

//   const updateLocationInFirestore = async (latitude: number, longitude: number) => {
//     try {
//       const vendorRef = doc(db, "vendors", vendorId); // Reference to the vendor document
//       await updateDoc(vendorRef, { latitude, longitude });
//       console.log("Location updated in Firestore:", { latitude, longitude });
//     } catch (error) {
//       console.error("Error updating location in Firestore:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Vendor Location Update</Text>
//       {location ? (
//         <Text style={styles.text}>
//           Current Location: Latitude: {location.latitude}, Longitude: {location.longitude}
//         </Text>
//       ) : (
//         <Text style={styles.text}>Fetching location...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,r
//   },
//   text: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 10,
//   },
// });

// export default UpdateLocation;
