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
export default function PatientOne() {
  let [temp_chart,setTemp_chart]=useState([1,2,2,2,2]);
  let [pressure_chart,setPressure_chart]=useState([3,3,3,3,3]);
  let [showPress, setShowPress] = useState(true)
  let [showTemp, setShowTemp] = useState(false)
  let[status,showStatus]=useState(true)
  let[sec,setSec]= useState(0)
  let [state,ToggleStatus]= useState(["ON","OFF"])
  let [title,setTitle] = useState('Go to Temperature')
  let [modetitle,setmodeTitle]=useState("OFF")
var label=[]
  for (let i=0;i<50;i++)
  {
    label.push(i)
  }

  
//sensors Readings
  async function get_pateintTemp()
  {
    let response = await fetch("http://192.168.1.17:8090/patient_data?ID=1&reading=temp")
    let json = await response.json()
    let TempNum = json.temp
    // TempNum.forEach((item)=> setTemp_chart(item.split(",")))
    setSwap(TempNum)
    console.log(TempNum)
    console.log(temp_chart)
    // setTemp_chart(json.temp[0])
   
    // let tempNum= json.temp[0]
    // console.log(tempNum)
    // let temp =[]
    // for (let i=0;i<12;i+=3)
    // {
    //   temp.push(tempNum[i])
    // }
    // console.log(temp_chart)
    //   setTemp_chart(temp)
     
    // setSwap(temp_chart)
    //   console.log(temp_chart)
  
  }
  async function get_pateintpress()
  {
    let response = await fetch("http://192.168.1.17:8090/patient_data?ID=1&reading=pressure")
    let json = await response.json()
    let pressNum = json.pressure
    // let arrREs= pressNum.forEach((item)=> setPressure_chart( item.split(",")))
    // console.log(pressure_chart)
    console.log(pressNum)
    setSwap(pressNum)
    // let presNum= json.pressure[0]

    // console.log(json.pressure)
    // let pressure =[]
    // for (let i=0;i<8;i+=2)
    // {
    //   pressure.push(presNum[i])
    // }
    //   setPressure_chart(pressure)
      // setSwap(pressure_chart)
    //   console.log(pressure_chart)
    //   console.log(pressure)
  }

  setInterval(() => {
    setSec(sec+=1)
  }, 2000);

  let [swap,setSwap]=useState(pressure_chart) //swap between temperature and pressure data visualization.
  function Togglepress() //to show pressure data chart
  {
    console.log("togPre")

    setSwap(pressure_chart)
    console.log(pressure_chart)
    setShowPress((prev)=>!prev)
    setShowTemp((prev)=>!prev)
    // ToggleStatus('ON','OFF')
    console.log(state)
    setTitle('Go to Temperature')
  }
  function ToggleTemp()//to show temperature data chart
  {
    console.log("togTe")

    setSwap(temp_chart)
    console.log(temp_chart)
    setShowTemp((prev)=>!prev)
    setShowPress((prev)=>!prev)
    // ToggleStatus('OFF','ON')
    console.log(state)
    setTitle('Go to Pressure')

  }
  async function getStatus()
  {
    // console.log(state)
    // showStatus((prev)=>!prev)



   if (((modetitle =='ON') && (title=='Go to Pressure')) || ((modetitle =='OFF') && (title=='Go to Temperature')))
    { 
      // setmodeTitle("ON")   
      ToggleStatus(["OFF","ON"])
      // let new_chart=[]
      // for (let i=0;i<20;i++){
      // new_chart.push(0)
      // }
      // setPressure_chart(new_chart)
      console.log(state)
    }
    else if ((modetitle =='OFF' && title =='Go to Pressure') || (modetitle =='ON' && title =='Go to Temperature'))
    {
      // setmodeTitle("OFF")
      ToggleStatus(["ON","OFF"])
      console.log(state)
      // let new_chart=[]
      // for (let i=0;i<20;i++){
      // new_chart.push(0)
      // }
      // setTemp_chart(new_chart)
    }
    if(modetitle=='ON')
    {
      setmodeTitle("OFF")
    }else if(modetitle=='OFF'){ 
      showStatus((prev)=>!prev)
      // let new_chart=[]
      // for (let i=0;i<20;i++){
      // new_chart.push(0)
      // }
      // setPressure_chart(new_chart)
      // setTemp_chart(new_chart)
      setmodeTitle("ON")}
    if (modetitle=="OFF" && title=='Go to Pressure')
    {
      let new_chart=[]
      for (let i=0;i<20;i++){
      new_chart.push(0)
      }
      
      setTemp_chart(new_chart)
    } if (modetitle=="OFF" && title=='Go to Temperature')
    {
      let new_chart=[]
      for (let i=0;i<20;i++){
      new_chart.push(0)
      }
      
      setPressure_chart(new_chart)}
    let response =await fetch('http://192.168.1.17:8090/state', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temp: state[0],
        pressure:state[1]
      })
    });    

  }
  function switch_(){
    if (title=='Go to Temperature')
    {
       get_pateintpress()
    }else if (title=='Go to Pressure')
    {
      get_pateintTemp()
    }
  }
  
  useEffect(()=>
    // if(!status)
    // {
    //   return
    // }
    switch_(),[sec])

  
  


  return (
    <>
<View style={styles.container}>
  {/* <Text>Bezier Line Chart</Text> */}
  <Text style={styles.title}> Readings visualization</Text>
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
    width={300} // from react-native
    height={300}
    yAxisInterval={2} // optional, defaults to 1
    chartConfig={{
      // backgroundColor: "blue",
      backgroundGradientFrom: "#2196f3",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
      borderRadius:80,
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
{status&&<Button style={styles.button} title={modetitle} onPress={()=>getStatus()}/>}

{status||<Button style={styles.button} title={modetitle} onPress={()=>getStatus()}/>}</View>
<View style={styles.space}>
{showPress&&<Button style={styles.button} title={title} onPress={()=>ToggleTemp()}/>}
{showTemp&&<Button style={styles.button} title={title} onPress={()=>Togglepress()}/>}</View>
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
    height:40,
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
