import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import Contador from './src/components/Contador';

export default function App() {

  const [estado, setEstado] = useState("selecionar")

  const [minutos, setMinutos] = useState(0)

  const [segundos, setSegundos] = useState(0)

  const [alarmeSound, setAlarmeSound] = useState([
    {
      id: 1,
      selecionado: true,
      som: "Alarme 1",
      file: require("./assets/alarme1.mp3")
    },
    {
      id: 2,
      selecionado: false,
      som: "Alarme 2",
      file: require("./assets/alarme2.mp3")
    }
  ])

  const numeros = [];

  for (var i = 0; i <= 60; i++) {
    numeros.push(i)
  }

  function alarmSelected(id){
    // clonar os alarmes
    let alarmesTemp = alarmeSound.map((val)=>{
      if(id != val.id)
        val.selecionado = false
      else
        val.selecionado = true
      return val;
    })

    setAlarmeSound(alarmesTemp)
  }

  function validarTimer(){
    if(minutos == 0 && segundos == 0){
      alert("Segundo deve ser maior que 0!")
    }else{
      setEstado("iniciar")
    }
  }

  if(estado === "selecionar"){
    return (
      <View style={styles.container}>
        <View style={styles.containerPickers}>
        <Text style={[styles.textStyleDefault, {color: '#29B7ED', fontSize: 30, marginBottom: 20}]}>Selecione o tempo:</Text>
          <Text style={[styles.textStyleDefault, {color: '#29B7ED'}]}>Minutos</Text>
          <Picker selectedValue={minutos} onValueChange={(itemValue) => setMinutos(itemValue)} style={styles.picker}>
            {
              numeros.map((val) => {
                return (
                  <Picker.Item label={val.toString()} value={val.toString()}  />
                )
              })
            }
          </Picker>
          <Text style={[styles.textStyleDefault, {color: '#29B7ED'}]}>Segundos</Text>
          <Picker selectedValue={segundos} onValueChange={(itemValue) => setSegundos(itemValue)} style={styles.picker}>
            {
              numeros.map((val) => {
                return (
                  <Picker.Item label={val.toString()} value={val.toString()} />
                )
              })
            }
          </Picker>
        </View>
  
        <View style={styles.containerAlarms}>
          
          {
            alarmeSound.map((val) => {
              if(val.selecionado){
                return (
                  <TouchableOpacity onPress={()=> alarmSelected(val.id)} style={styles.alarmSelecionado}>
                    <Text style={styles.textStyleDefault}>{val.som}</Text>
                  </TouchableOpacity>
                )
              }else{
                return (
                  <TouchableOpacity onPress={()=> alarmSelected(val.id)} style={styles.alarm}>
                    <Text style={styles.textStyleDefault}>{val.som}</Text>
                  </TouchableOpacity>
                )
              }
            })
          }
        </View>

        <TouchableOpacity style={styles.btnIniciar} onPress={()=> validarTimer()}>
          <Text style={[styles.textStyleDefault, {fontSize: 25}]}>Iniciar</Text>
        </TouchableOpacity>
  
      </View>
    );
  }else if(estado === "iniciar"){
    return (
      <Contador alarmes={alarmeSound} setEstado={setEstado} minutos={minutos} segundos={segundos} setSegundos={setSegundos} setMinutos={setMinutos}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#29B7ED',
    alignItems: "center",
    justifyContent: "center"
  },
  containerPickers: {
    backgroundColor: "#FFF", 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
    borderRadius: 20
  },
  picker: {
    backgroundColor: "#FFF",
    width: 100, 
    height: 50
  },
  textStyleDefault: {
    color: "#fff"
  },
  containerAlarms: {
    flexDirection: "row",
    padding: 20
  },
  alarm: {
    padding: 10,
    margin: 10,
  },
  alarmSelecionado: {
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
    margin: 10
  },
  btnIniciar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 2,
    marginTop: 30
  }
});
