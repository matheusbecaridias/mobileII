// App.js (raiz)
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from 'react-native';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { PALETTE } from './theme';

import LoginScreen from './scenes/Login-Simples/App';
import TodoListScreen from './scenes/To-Do-List/App';
import CestaScreen from './scenes/Cesta/App';
import TextoSimplesScreen from './scenes/Texto-Simples/App';

const etapas = [
  { id: 'LOGIN', label: '1. Acesso', icon: '👤' },
  { id: 'TODO', label: '2. Lista de Compras', icon: '🎒' },
  { id: 'CESTA', label: '3. Feira', icon: '🧺' },
  { id: 'CREDITOS', label: '4. Fim', icon: '🏆' },
];

export default function App() {
  const [telaAtual, setTelaAtual] = useState('LOGIN');
  const [usuario, setUsuario] = useState({ nome: 'Aventureiro', xp: 0, nivel: 1 });
  const [listaCompras, setListaCompras] = useState([]);

  const ganharXP = (qtd) => {
    setUsuario((prev) => {
      const novoXP = prev.xp + qtd;
      const novoNivel = Math.floor(novoXP / 100) + 1;
      return { ...prev, xp: novoXP, nivel: novoNivel };
    });
  };

  const handleLogin = (dados) => {
    ganharXP(50);
    setUsuario((prev) => ({ ...prev, ...dados }));
    setTelaAtual('TODO');
  };

  const handleSairLogin = () => {
    setTelaAtual('CREDITOS');
  };

  const handleAvancarCesta = (tarefas) => {
    ganharXP(100);
    setListaCompras(tarefas);
    setTelaAtual('CESTA');
  };

  const handleFinalizarCompra = () => {
    ganharXP(200);
    setTelaAtual('CREDITOS');
  };

  const handleReiniciar = () => {
    setUsuario({ nome: 'Aventureiro', xp: 0, nivel: 1 });
    setListaCompras([]);
    setTelaAtual('LOGIN');
  };

  const indexEtapaAtual = etapas.findIndex((e) => e.id === telaAtual);

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={PALETTE.bgDark} />

        {/* HUD GAMIFICADO SUPERIOR */}
        <View style={styles.hudContainer}>
          <View style={styles.hudStats}>
            <View style={styles.badgeNivel}>
              <Text style={styles.badgeNivelTexto}>⚡ ETAPA {usuario.nivel}</Text>
            </View>
            <Text style={styles.xpText}>💎 {usuario.xp} XP</Text>
          </View>

          {/* Barra de Progresso da Jornada */}
          <View style={styles.stepsContainer}>
            {etapas.map((etapa, idx) => {
              const ativo = idx <= indexEtapaAtual;
              return (
                <View key={etapa.id} style={styles.stepItem}>
                  <View style={[styles.stepCircle, ativo && styles.stepCircleAtivo]}>
                    <Text style={styles.stepIcon}>{etapa.icon}</Text>
                  </View>
                  <Text style={[styles.stepLabel, ativo && styles.stepLabelAtivo]}>
                    {etapa.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* TELAS */}
        <View style={styles.screenContainer}>
          {telaAtual === 'LOGIN' && (
            <LoginScreen onLoginSuccess={handleLogin} onSair={handleSairLogin} />
          )}

          {telaAtual === 'TODO' && (
            <TodoListScreen
              usuario={usuario}
              onAvancarParaCesta={handleAvancarCesta}
              onGanharXP={() => ganharXP(25)}
            />
          )}

          {telaAtual === 'CESTA' && (
            <CestaScreen onFinalizarCompra={handleFinalizarCompra} />
          )}

          {telaAtual === 'CREDITOS' && (
            <TextoSimplesScreen usuario={usuario} onReiniciar={handleReiniciar} />
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PALETTE.bgDark,
  },
  hudContainer: {
    backgroundColor: PALETTE.deepWood,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: PALETTE.primary,
  },
  hudStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeNivel: {
    backgroundColor: PALETTE.terracotta,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.rose,
  },
  badgeNivelTexto: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
  },
  xpText: {
    color: PALETTE.accent,
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0a1d12',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334438',
  },
  stepCircleAtivo: {
    backgroundColor: PALETTE.primary,
    borderColor: PALETTE.accent,
    borderWidth: 2,
  },
  stepIcon: {
    fontSize: 14,
  },
  stepLabel: {
    fontSize: 10,
    color: PALETTE.textMuted,
    marginTop: 2,
  },
  stepLabelAtivo: {
    color: PALETTE.rose,
    fontWeight: 'bold',
  },
  screenContainer: {
    flex: 1,
  },
});
