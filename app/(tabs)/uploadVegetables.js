// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';
// //import { availableVegetables, inventory } from './vegetablesData';
// import { availableVegetables, inventory } from './vegetablesData';

// // Function to upload data to Firebase
// const uploadVegetablesToFirebase = async () => {
//   try {
//     // Combine availableVegetables and inventory into one array
//     const allVegetables = [ ...inventory];
//     // const allVegetables = [...availableVegetables, ...inventory];

//     // Reference the Firestore collection
//     const vegetableCollection = collection(db, 'test');

//     for (const vegetable of allVegetables) {
//       await addDoc(vegetableCollection, vegetable);
//       //console.log(Added ${vegetable.vegetable} to Firestore);
//     }

//     console.log('All vegetables uploaded successfully!');
//   } catch (error) {
//     console.error('Error uploading vegetables:', error);
//   }
// };

// // Call the function
// uploadVegetablesToFirebase();