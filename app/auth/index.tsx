import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, AppState } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function Auth() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');

  useEffect(() => {
    const handleAppStateChange = (state) => {
      if (state === 'active') {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  const sendOtp = async () => {
    if (!phoneNumber) {
      Toast.show({ type: 'error', text1: 'Please enter a valid phone number.' });
      return;
    }
    
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: `+${callingCode}${phoneNumber}` });
      if (error) throw error;
      setIsOtpSent(true);
      Toast.show({ type: 'success', text1: 'OTP has been sent to your phone.', visibilityTime: 3000 });
    } catch (err) {
      Toast.show({ type: 'error', text1: err.message || 'An unexpected error occurred.' });
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      Toast.show({ type: 'error', text1: 'Please enter the OTP.' });
      return;
    }
    
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: `+${callingCode}${phoneNumber}`,
        token: otp,
        type: 'sms',
      });
      if (error) throw error;
      Toast.show({ type: 'success', text1: 'Logged in successfully!', visibilityTime: 3000 });
      router.replace('/(tabs)');
    } catch (err) {
      Toast.show({ type: 'error', text1: err.message || 'An unexpected error occurred.' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Login</Text>
      {!isOtpSent ? (
        <View style={styles.phoneInputContainer}>
        <CountryPicker
          withCallingCode={true}
          withFlag={true}
          withFilter={true}
          withCountryNameButton={true}
          countryCode={countryCode || 'IN'} // Ensure default value is assigned
          onSelect={(country) => {
            setCountryCode(country?.cca2 || 'IN');
            setCallingCode(country?.callingCode?.[0] || '91');
          }}
        />

          <Text style={styles.callingCode}>+{callingCode}</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={isOtpSent ? verifyOtp : sendOtp}>
        <Text style={styles.buttonText}>{isOtpSent ? 'Verify OTP' : 'Send OTP'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  callingCode: {
    fontSize: 16,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
