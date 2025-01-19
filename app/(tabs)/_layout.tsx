import React, {useEffect} from 'react';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import * as Location from 'expo-location';
import {  updateVehicleInfo } from './firebase';
export default function TabLayout() {
  const colorScheme = useColorScheme();
/////


//////
useEffect(()=>{
  const fetchDircections = async ()=>{
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let myLocation = await Location.getCurrentPositionAsync({});
    updateVehicleInfo(1122334455, myLocation.coords.longitude, myLocation.coords.longitude)
  };
  setInterval(fetchDircections, 5*60*1000);
}, []);


  return (
    <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: true,
    //   }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <FontAwesome name="list" color={color} size={24} />,
        }}
      />
      {/* <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart Summary',
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-cart" color={color} size={24} />,
        }}
      /> */}
    </Tabs>
  );
}
