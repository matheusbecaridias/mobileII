// scenes/Cesta/src/Telas/pagamento.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { PALETTE } from '../../../../theme';

export default function Pagamento({ itensSacola = [], onVoltar, onFinalizarCompra }) {
  const [metodo, setMetodo] = useState('PIX');

  const totalGeral = itensSacola.reduce((soma, item) => {
    const valor = parseFloat(item.preco.replace('R$', '').replace(',', '.').trim()) || 0;
    return soma + valor;
  }, 0);

  const finalizar = () => {
    if (Platform.OS === 'web') {
      alert('🎉 Compras Concluída! Volte sempre!');
      if (onFinalizarCompra) onFinalizarCompra();
      return;
    }

    Alert.alert(
      '🏆 Compra Lendária Aprovada!',
      'Você concluiu o pedido e ganhou +200 XP na jornada!',
      [{ text: 'Ver Troféu', onPress: onFinalizarCompra }],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
      <Text style={estilos.titulo}>Finalizar compra</Text>

      {/* ITENS COLETADOS */}
      <View style={estilos.secao}>
        <Text style={estilos.subtitulo}>Tributo Selecionado</Text>
        {itensSacola.length === 0 ? (
          <Text style={estilos.vazio}>Nenhum item coletado ainda.</Text>
        ) : (
          itensSacola.map((item, index) => (
            <View key={index} style={estilos.itemLinha}>
              <Text style={estilos.itemNome}>• {item.nome}</Text>
              <Text style={estilos.itemPreco}>{item.preco}</Text>
            </View>
          ))
        )}
      </View>

      {/* TOTAL DE MOEDAS */}
      <View style={estilos.totalContainer}>
        <Text style={estilos.totalTexto}>Preço Total:</Text>
        <Text style={estilos.totalValor}>R$ {totalGeral.toFixed(2).replace('.', ',')}</Text>
      </View>

      {/* ESCOLHA DE TRIBUTO */}
      <View style={estilos.secao}>
        <Text style={estilos.subtitulo}>Forma de Transação</Text>
        {['CARTAO', 'PIX', 'DINHEIRO'].map((tipo) => {
          const selecionado = metodo === tipo;
          const labels = {
            CARTAO: '💳 Cartão de Crédito / Débito',
            PIX: '💠 Pix Instantâneo',
            DINHEIRO: '🪙 Dinheiro (Pagamento na entrega)',
          };
          return (
            <TouchableOpacity
              key={tipo}
              style={[estilos.opcao, selecionado && estilos.opcaoSelecionada]}
              onPress={() => setMetodo(tipo)}
            >
              <Text style={[estilos.textoOpcao, selecionado && estilos.textoOpcaoSelecionada]}>
                {labels[tipo]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={estilos.botaoFinalizar} onPress={finalizar}>
        <Text style={estilos.textoFinalizar}>Finalizar Compra</Text>
      </TouchableOpacity>

      {onVoltar && (
        <TouchableOpacity style={estilos.botaoVoltar} onPress={onVoltar}>
          <Text style={estilos.textoVoltar}>⬅ Retornar ao Mercado</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: PALETTE.bgDark, paddingTop: 14 },
  titulo: { fontSize: 22, fontWeight: '900', color: PALETTE.rose, textAlign: 'center', marginBottom: 12 },
  secao: {
    backgroundColor: PALETTE.cardDark,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: PALETTE.primary,
    marginBottom: 14,
  },
  subtitulo: { fontSize: 13, fontWeight: 'bold', color: PALETTE.accent, marginBottom: 8 },
  vazio: { color: PALETTE.textMuted, fontStyle: 'italic', fontSize: 12 },
  itemLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#123924',
  },
  itemNome: { color: PALETTE.textLight, fontSize: 13 },
  itemPreco: { color: PALETTE.rose, fontWeight: 'bold', fontSize: 13 },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: PALETTE.deepWood,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PALETTE.terracotta,
    marginBottom: 14,
  },
  totalTexto: { fontSize: 14, fontWeight: 'bold', color: PALETTE.rose },
  totalValor: { fontSize: 20, fontWeight: '900', color: PALETTE.accent },
  opcao: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PALETTE.primary,
    marginBottom: 8,
    backgroundColor: '#072012',
  },
  opcaoSelecionada: {
    borderColor: PALETTE.accent,
    backgroundColor: PALETTE.primary,
  },
  textoOpcao: { color: PALETTE.textMuted, fontSize: 13 },
  textoOpcaoSelecionada: { color: '#fff', fontWeight: 'bold' },
  botaoFinalizar: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: PALETTE.primary,
    marginTop: 6,
  },
  textoFinalizar: { color: '#042414', fontWeight: '900', fontSize: 14 },
  botaoVoltar: { paddingVertical: 12, alignItems: 'center', marginBottom: 20 },
  textoVoltar: { color: PALETTE.rose, fontSize: 12, fontWeight: 'bold' },
});
