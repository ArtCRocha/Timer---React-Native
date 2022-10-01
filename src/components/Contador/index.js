import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

export default function Contador(props) {

    const [sound, setSound] = useState();

    var done = false;

    useEffect(() => {
        const timer = setInterval(() => {

            props.setSegundos(props.segundos - 1)

            if (props.segundos <= 0) {
                if (props.minutos > 0) {
                    props.setMinutos(props.minutos - 1)
                    props.setSegundos(59)
                } else {
                    if (!done) {
                        done = true
                        props.setEstado("selecionar")
                        props.setMinutos(0)
                        props.setSegundos(0)
                        playSound()
                    }
                }
            }
        }, 1000)

        return () => clearInterval(timer)
    })

    async function playSound() {

        var alarm;

        props.alarmes.map((val)=>{
            if(val.selecionado){
                alarm = val.file
            }
        })

        const { sound } = await Audio.Sound.createAsync(alarm);
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync();
      }    

    function resetar() {
        props.setEstado("selecionar")
        props.setMinutos(0)
        props.setSegundos(0)
    }

    function formatarNumero(num){
        var finalNumber = ""
        if(num < 10){
            finalNumber = "0" + num
        }else{
            finalNumber = num
        }
        return finalNumber;
    }

    var segundos = formatarNumero(props.segundos)
    var minutos = formatarNumero(props.minutos)


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.textStyleDefault}>{minutos} : </Text>
                <Text style={styles.textStyleDefault}>{segundos}</Text>
            </View>
            <TouchableOpacity style={styles.btnResetar} onPress={() => resetar()}>
                <Text style={[styles.textStyleDefault, { fontSize: 25 }]}>Resetar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#29B7ED',
        alignItems: "center",
        justifyContent: "center"
    },
    textStyleDefault: {
        color: "#fff",
        fontSize: 50
    },
    btnResetar: {
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
