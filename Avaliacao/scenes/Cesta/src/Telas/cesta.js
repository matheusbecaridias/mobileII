// scenes/Cesta/src/Telas/cesta.js
import React from 'react';
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';
import bicolor from '../../assets/bicolor.jpg';
import logo from '../../assets/logo.jpg';
import { PALETTE } from '../../../../theme';

const { width } = Dimensions.get('window');

export default function Cesta() {
  return (
    <View style={estilos.topo}>
      <Image source={bicolor} style={estilos.imagemBicolor} resizeMode="cover" />
      <View style={estilos.overlay}>
        <Text style={estilos.badgeSantuario}>🏕️ CESTA DA FAZENDA</Text>
      </View>

      <View style={estilos.cestaCard}>
        <View style={estilos.tituloRow}>
          <Text style={estilos.titulo}>Cesta de Compras</Text>
          <Text style={estilos.preco}>R$ 40,00</Text>
        </View>

        <View style={estilos.fazenda}>
          <Image source={logo} style={estilos.imagemFazenda} />
          <Text style={estilos.nomeFazenda}>Matheus's Farm</Text>
        </View>

        <Text style={estilos.frase}>
          Colheita selecionada direto da horta para você.
        </Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  topo: {
    width: '100%',
    backgroundColor: PALETTE.bgDark,
  },
  imagemBicolor: {
    width: width,
    height: 140,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  badgeSantuario: {
    backgroundColor: 'rgba(4, 36, 20, 0.85)',
    color: PALETTE.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    fontSize: 11,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: PALETTE.accent,
  },
  cestaCard: {
    padding: 14,
    backgroundColor: PALETTE.cardDark,
    borderBottomWidth: 2,
    borderBottomColor: PALETTE.primary,
  },
  tituloRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    color: PALETTE.rose,
    fontWeight: '900',
  },
  preco: {
    color: PALETTE.accent,
    fontWeight: '900',
    fontSize: 20,
  },
  fazenda: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  imagemFazenda: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.accent,
  },
  nomeFazenda: {
    color: PALETTE.textLight,
    fontSize: 12,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  frase: {
    color: PALETTE.textMuted,
    fontSize: 12,
  },
});
