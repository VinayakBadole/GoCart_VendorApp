import {firestore} from "../../firebaseConfig";
import {ToastAndroid} from 'react-native';
import { 
    addDoc, 
    collection, 
    onSnapshot, 
    doc, 
    updateDoc,
    query, 
    where, 
    setDoc, 
    deleteDoc 
} from 'firebase/firestore';
let vendorRef = collection(firestore, "vendors");
export const updateVehicleInfo =(ContactNo, latitude, longitude)=>{

    let vendorQuery = query(vendorRef, where('ContactNo', '==', ContactNo));
  
    onSnapshot(vendorQuery, response =>{
        let docId = response.docs.map((docs)=>{
            return docs.id;
        });
        console.log(docId);
        let postToEdit = doc(vendorRef, docId);
  
        updateDoc(postToEdit, {latitude: latitude, longitude: longitude})
        .then((res) => {
            ToastAndroid.show('Coordinates Updated', ToastAndroid.SHORT);
        })
        .catch((err) =>{
            ToastAndroid.show('Error', ToastAndroid.SHORT);
        })
    })
  }