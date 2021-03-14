import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import LoginPage from './components/Login';


export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#96CAF7', '#FFF']}>
        <LoginPage/>
    </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
