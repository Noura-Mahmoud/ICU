import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {
  LineChart,
   BarChart,
   PieChart,
   ProgressChart,
   ContributionGraph,
   StackedBarChart
 } from "react-native-chart-kit";
 import {Dimensions} from 'react-native'
 const screenWidth = Dimensions.get("window").width*0.8
export default function PatientTwo() {
  let [temp_chart,setTemp_chart]=useState([1,2,3,4,5]);
  let [pressure_chart,setPressure_chart]=useState([5,4,3,2,1]);
  let [showPress, setShowPress] = useState(true)
  let [showTemp, setShowTemp] = useState(false)
  let[sec,setSec]= useState(0)


var label=[]
  for (let i=0;i<20;i++)
  {
    label.push(i)
  }

  //Temperature Readings
  async function getDataTemp()
  {
    let response = await fetch("http://localhost:8090/temp")
    let json = await response.json()
    setTemp_chart(json)
    console.log(json)
    console.log(response)

  }
  setInterval(() => {
    setSec(sec+=1)
  }, 1000);
  useEffect(()=>getDataTemp(),[sec])


//Pressure Readings
  async function getDataPress()
  {
    let response = await fetch("http://localhost:8090/pres")
    let json = await response.json()
    setPressure_chart(json)
    console.log(json)

  }
  setInterval(() => {
    setSec(sec+=1)
  }, 1000);
  useEffect(()=>getDataPress(),[sec])

  let [swap,setSwap]=useState(temp_chart) //swap between temperature and pressure data visualization.
  function Togglepress() //to show pressure data chart
  {
    setSwap(pressure_chart)
    setShowPress((prev)=>!prev)
    setShowTemp((prev)=>!prev)
  }
  function ToggleTemp()//to show temperature data chart
  {
    setSwap(temp_chart)
    setShowTemp((prev)=>!prev)
    setShowPress((prev)=>!prev)
  }
  return (
    <>
<View style={styles.container}>
  {/* <Text>Bezier Line Chart</Text> */}
  <Text style={styles.title}> Readings visulaization</Text>
  <LineChart style={{flex:1,flexDirection: "column"}}
    data={{
//this is x-axis data
      labels: label.map((index) => index),
      datasets: [
        {label: `${label.length} Temperature Readings`,
          //this is y-axis       
/*you need to add your data here from JSON, and remember the data you are requesting should be integer because it is line chart*/
          
          data:swap.map((item)=>item) 
        }
      ]
    }}
    width={500} // from react-native
    height={500}
    yAxisInterval={2} // optional, defaults to 1
    chartConfig={{
      // backgroundColor: "blue",
      backgroundGradientFrom: "blue",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
  />
</View>
<View style={styles.space}>
{showPress&&<Button style={styles.button} title='Go to Pressure' onPress={()=>Togglepress()}/>}
{showTemp&&<Button style={styles.button} title='Go to Temperature' onPress={()=>ToggleTemp()}/>}</View>
  <Text style={{textAlign:"center"}}>{new Date().toLocaleTimeString()} </Text>
</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: 'rgba(127, 255, 212, 0.062)',
    alignItems: 'center',
    justifyContent: 'center',
    marginStart:10
  },
  button:{
    display:'flex',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:150,
    marginBottom:250,
    padding:3,

  },
  space:
  {
    width:200,
    height:50,
    margin:'auto'

  },
  title:
  {   display:"flex",
      justifyContent:"center",
      alignItems:"flex-start",
      fontSize:30,
      fontWeight:'100',
      marginTop:60,
      color:'#2196f3',
      fontWeight:'bold'
      

  },
});

