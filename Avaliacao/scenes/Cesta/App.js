// scenes/Cesta/App.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Cesta from './src/Telas/cesta';
import Itens from './src/Telas/items';

// ⚠️ ATENÇÃO AQUI: precisa receber { onFinalizarCompra }
export default function CestaScreen({ onFinalizarCompra }) {
  return (
    <View style={estilos.container}>
      <Cesta />
      <Itens onFinalizarCompra={onFinalizarCompra} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});