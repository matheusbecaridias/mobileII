// scenes/Texto-Simples/App.js
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { PALETTE } from '../../theme';

export default function TextoSimplesScreen({ usuario, onReiniciar }) {
  return (
    <ScrollView style={estilos.container} contentContainerStyle={estilos.content}>
      <Text style={estilos.trofeu}>🏆</Text>
      <Text style={estilos.titulo}>Trabalho Cumprido!</Text>
      <Text style={estilos.subtitulo}>Você completou toda a jornada da feira</Text>

      {/* PLACAR DO JOGADOR */}
      <View style={estilos.cardPlacar}>
        <Text style={estilos.placarTitulo}>RESUMO DO COMPRADOR</Text>
        <Text style={estilos.jogadorNome}>Usuário: {usuario?.nome || 'Aventureiro'}</Text>
      </View>

      {/* CONQUISTAS DESBLOQUEADAS */}
      <View style={estilos.cardBadges}>
        <Text style={estilos.badgesTitulo}>ETAPAS DO PROJETO</Text>
        <View style={estilos.badgeRow}>
          <Text style={estilos.badgeItem}>🥇 Tela de Login</Text>
          <Text style={estilos.badgeItem}>🎒 Lista de Compras</Text>
          <Text style={estilos.badgeItem}>🧺 Cesta de compras</Text>
        </View>
      </View>

      {/* HALL DA FAMA / CRÉDITOS */}
      <View style={estilos.cardCreditos}>
        <Text style={estilos.creditosTitulo}>MESTRES DA GUILDA (CRÉDITOS)</Text>
        <Text style={estilos.cargo}>Design & Arquitetura:</Text>
        <Text style={estilos.nomes}>• Design Gamificado</Text>
        <Text style={estilos.cargo}>Motor do Universo:</Text>
        <Text style={estilos.nomes}>• Expo & React Native</Text>
        <Text style={estilos.cargo}>Paleta Visual:</Text>
        <Text style={estilos.nomes}>• Adobe Color Palette</Text>
      </View>

      {onReiniciar && (
        <TouchableOpacity style={estilos.btnReiniciar} onPress={onReiniciar}>
          <Text style={estilos.btnReiniciarText}>🔄 Comprar Novamente</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: PALETTE.bgDark },
  content: { padding: 20, alignItems: 'center', paddingBottom: 40 },
  trofeu: { fontSize: 50, marginTop: 10 },
  titulo: { fontSize: 24, fontWeight: '900', color: PALETTE.accent, marginTop: 6 },
  subtitulo: { fontSize: 13, color: PALETTE.textMuted, marginBottom: 16 },
  cardPlacar: {
    backgroundColor: PALETTE.cardDark,
    width: '100%',
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: PALETTE.primary,
    marginBottom: 12,
  },
  placarTitulo: { fontSize: 11, fontWeight: 'bold', color: PALETTE.rose, marginBottom: 6 },
  jogadorNome: { fontSize: 16, fontWeight: 'bold', color: PALETTE.textLight },
  jogadorNivel: { fontSize: 14, fontWeight: 'bold', color: PALETTE.accent, marginTop: 2 },
  jogadorXp: { fontSize: 13, color: PALETTE.rose, marginTop: 2 },
  cardBadges: {
    backgroundColor: PALETTE.deepWood,
    width: '100%',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: PALETTE.terracotta,
    marginBottom: 12,
  },
  badgesTitulo: { fontSize: 11, fontWeight: 'bold', color: PALETTE.accent, marginBottom: 8, textAlign: 'center' },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-around' },
  badgeItem: {
    backgroundColor: PALETTE.primary,
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardCreditos: {
    backgroundColor: PALETTE.cardDark,
    width: '100%',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: PALETTE.primary,
    marginBottom: 20,
  },
  creditosTitulo: { fontSize: 12, fontWeight: 'bold', color: PALETTE.rose, marginBottom: 8, textAlign: 'center' },
  cargo: { fontSize: 12, fontWeight: 'bold', color: PALETTE.accent, marginTop: 6 },
  nomes: { fontSize: 12, color: PALETTE.textLight, marginLeft: 6 },
  btnReiniciar: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    borderBottomWidth: 4,
    borderBottomColor: PALETTE.primary,
  },
  btnReiniciarText: { color: '#042414', fontWeight: '900', fontSize: 14 },
});
