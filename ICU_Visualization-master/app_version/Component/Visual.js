import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
const img = {uri:"voice.jpg"}
export default function Visual(props) {

       
  return (
      <>
    <ImageBackground  source={require('../assets/icu2.png')} resizeMode='cover'  style={styles.image}>

    <View style ={styles.container} >
      <View style={styles.spaceText}><Text style={styles.title}>ICU visualization</Text>
</View>
<View style={styles.space}>
    <Button 
      title= 'patient room "1"'
      onPress={() =>
       {props.navigation.navigate("PatientOne")}}
    /></View>
 <View style={styles.space}> 
        <Button style={styles.button1}
      title= 'Patient room "2"'
      onPress={() =>{props.navigation.navigate("PatientTwo")}}
    /></View>  
     <View style={styles.space}> 
        <Button style={styles.button1}
      title= 'Patient room "3"'
      onPress={() =>{props.navigation.navigate("PatientThree")}}
    /></View>  
    

    </View>
    </ImageBackground>
  </>
  )
}


const styles = StyleSheet.create({

    container:
    {
      
        flex:1,
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        fontSize:30,
       
    },
    button1:
    {
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        marginTop:50,
        marginBottom:50,
        padding:1,

    },
    title:
    {   display:"flex",
        justifyContent:"center",
        alignItems:"flex-start",
        fontSize:25,
        fontWeight:'100',
        // marginTop:10,
        color:'#2196f3',
        fontWeight:'bold'
        

    },
    image:
    {
      flex: 4,
      width:400,
      display:'flex',
      justifyContent: "center",
      alignItems:'center',
      margin:'auto',
      
    },
    space:
    {
      width:80,
      height:-20
    },
    spaceText:
    {
      height:100,

    }
});