Código do App.js

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Cesta from './src/Telas/cesta'; // ou ./src/Telas/Cesta, conforme o nome do arquivo
import {Dimensions} from 'react-native';


export default function App() {
  return (
    <View style={estilos.container}>
      <Cesta />
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // deixa a imagem no topo
  },
 

  });
