import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { Avatar } from 'react-native-elements';
import AddChat from './screens/AddChat';

const Stack = createStackNavigator();

export default function App() {

  // const globalscreenoptions ={
    
  // }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {
          headerStyle:{backgroundColor:"#2C6BED"},
          headerTitleStyle:{color:'white'},
          headerTintColor:"white",
          headerTitleAlign:'center',
          
        }
      }
      // initialRouteName="Home"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
