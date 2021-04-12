import 'react-native-gesture-handler'; //this needs to stay at the top for the navigation to work! the navigator works as a stack
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import LoginPage from './components/Login';
import HomePage from './components/Home';
import HomeTest from './components/HomeTest'

const Stack = createStackNavigator();


// GestureEnabled: false -> Does not allow user to swipe back
// HeaderLeft: false -> Does not allow user to hit back arrow
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name = "Login" component = {LoginPage} options = {{headerShown: false}}/>
        
        <Stack.Screen name = "Home" component = {HomeTest} options = {{headerShown: false, gestureEnabled: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
