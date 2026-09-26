// scenes/Cesta/src/Telas/items.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Pagamento from './pagamento';
import { PALETTE } from '../../../../theme';

export default function Itens({ onFinalizarCompra }) {
  const [sacola, setSacola] = useState([]);
  const [exibindoPagamento, setExibindoPagamento] = useState(false);

  const listaProdutos = [
    { id: '1', nome: 'Abacate ', bonus: 'Frutas', preco: 'R$ 6,00', imagem: require('../../assets/abacate.jpg') },
    { id: '2', nome: 'Banana ', bonus: 'Frutas', preco: 'R$ 4,00', imagem: require('../../assets/banana.jpg') },
    { id: '3', nome: 'Combo da Feira', bonus: 'Várias', preco: 'R$ 8,00', imagem: require('../../assets/frutasfeira.jpg') }
  ];

  const adicionarNaSacola = (produto) => {
    setSacola([...sacola, produto]);
  };

  if (exibindoPagamento) {
    return (
      <Pagamento
        itensSacola={sacola}
        onVoltar={() => setExibindoPagamento(false)}
        onFinalizarCompra={onFinalizarCompra}
      />
    );
  }

  return (
    <ScrollView style={estilos.container} showsVerticalScrollIndicator={false}>
      <View style={estilos.topoLista}>
        <Text style={estilos.titulo}>Mercado da Alquimia</Text>
        <TouchableOpacity style={estilos.badgeSacola} onPress={() => setExibindoPagamento(true)}>
          <Text style={estilos.sacolaTexto}>🛒 Carrinho: {sacola.length} itens</Text>
        </TouchableOpacity>
      </View>

      {listaProdutos.map((produto) => (
        <View key={produto.id} style={estilos.itemCard}>
          <Image source={produto.imagem} style={estilos.fotoFruta} />

          <View style={estilos.infoContainer}>
            <Text style={estilos.nomeFruta}>{produto.nome}</Text>
            <Text style={estilos.bonusText}>{produto.bonus}</Text>
            <Text style={estilos.precoFruta}>{produto.preco}</Text>
          </View>

          <TouchableOpacity style={estilos.botaoComprar} onPress={() => adicionarNaSacola(produto)}>
            <Text style={estilos.textoBotao}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}

      {sacola.length > 0 && (
        <TouchableOpacity style={estilos.btnIrPagamento} onPress={() => setExibindoPagamento(true)}>
          <Text style={estilos.btnIrPagamentoText}>Abrir Pagamento ({sacola.length}) ➔</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: PALETTE.bgDark },
  topoLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  titulo: { fontSize: 16, fontWeight: '900', color: PALETTE.rose },
  badgeSacola: {
    backgroundColor: PALETTE.deepWood,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PALETTE.accent,
  },
  sacolaTexto: { fontSize: 12, color: PALETTE.accent, fontWeight: 'bold' },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PALETTE.cardDark,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: PALETTE.primary,
  },
  fotoFruta: { width: 50, height: 50, borderRadius: 8, borderWidth: 1, borderColor: PALETTE.accent },
  infoContainer: { flex: 1, marginHorizontal: 12 },
  nomeFruta: { fontSize: 14, fontWeight: 'bold', color: PALETTE.textLight },
  bonusText: { fontSize: 11, color: PALETTE.accent, fontWeight: '700' },
  precoFruta: { fontSize: 13, color: PALETTE.rose, fontWeight: 'bold', marginTop: 2 },
  botaoComprar: {
    backgroundColor: PALETTE.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderBottomColor: PALETTE.deepWood,
  },
  textoBotao: { color: PALETTE.textLight, fontSize: 12, fontWeight: 'bold' },
  btnIrPagamento: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 14,
    borderBottomWidth: 4,
    borderBottomColor: PALETTE.primary,
  },
  btnIrPagamentoText: { color: '#042414', fontWeight: '900', fontSize: 14 },
});
