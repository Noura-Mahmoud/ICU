
import React, { Component } from 'react';
import { Text, View,StyleSheet,Button } from "react-native";
import Visual from './Component/Visual';
import PatientOne from './Component/PatientOne';
import PatientThree from './Component/PatientThree';
import PatientTwo from './Component/PatientTwo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
export default function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Visual' component={Visual}/>      
      <Stack.Screen name='PatientOne' component={PatientOne}/>      
      <Stack.Screen name='PatientTwo' component={PatientTwo}/>      
      <Stack.Screen name='PatientThree' component={PatientThree}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
