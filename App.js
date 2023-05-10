import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useAnimatedValue } from 'react-native';


let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState('00:00:00')
  const [botao, setBotao] = useState('Iniciar')
  const [ ultimo, setUltimo ] = useState(null)


  function iniciar() {
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      setBotao('Iniciar')
    }else{
      timer = setInterval(() => {
        ss++;
        if( ss == 60){
          ss = 0;
          mm++;
        }
        if(mm == 60){
          mm = 0;
          hh++;
        }

        let format =
        (hh < 10 ? '0' + hh : hh) + ':'
        + (mm < 10 ? '0' + mm : mm) + ':'
        + (ss < 10 ? '0' + ss : ss);

        setNumero(format);

      },1000)
      setBotao('Pausar')
    }
  }

  function limpar() {
    if( timer !== null) {
      clearInterval(timer);
      timer = null
    }
    setUltimo(numero)
    setNumero('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('Iniciar');


  }

 return (
   <View style={styles.container}>
    <Image
      source={require('./src/img/crono1.png')}
      style={styles.crono}
    />

    <Text style={styles.timer}> {numero} </Text>

    <View style={styles.botoesArea}>
      <TouchableOpacity style={styles.botoes} onPress={iniciar}>
        <Text style={styles.texto}>{botao}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botoes} onPress={limpar}>
        <Text style={styles.texto}>Zerar</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.areaTextSalvo}>
      <Text style={styles.tempoSalvo}>{ultimo ? 'Tempo Salvo : ' + ultimo: ''}</Text>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  crono:{
    width: 200,
    height: 200
  },
  timer:{
    marginTop: 15,
    fontSize: 55
  },
  botoesArea:{
    marginTop: 20,
    flexDirection: 'row',

  },
  texto:{
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  },
  botoes:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    height: 60,
    margin: 25,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: '#121212',
    borderRadius: 15,
  },
  areaTextSalvo:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSalvo:{
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  tempoSalvo:{
    fontSize: 18,
    color: 'red'
  }


})

