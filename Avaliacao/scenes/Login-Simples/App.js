// scenes/Login-Simples/App.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { PALETTE } from '../../theme';

export default function LoginScreen({ onLoginSuccess, onSair }) {
  const [isCadastro, setIsCadastro] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '') {
      onLoginSuccess({ nome: name, email });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.badgeHeader}>
          <Text style={styles.badgeText}></Text>
        </View>

        <Text style={styles.title}>
          {isCadastro ? 'Registro do Explorador' : 'Portal de Compras'}
        </Text>
        <Text style={styles.subtitle}></Text>

        <TextInput
          label="Nome do Usuário"
          mode="flat"
          value={name}
          onChangeText={setName}
          textColor={PALETTE.textLight}
          style={styles.input}
          theme={{ colors: { primary: PALETTE.accent, onSurfaceVariant: PALETTE.textMuted } }}
        />

        <TextInput
          label="E-mail"
          mode="flat"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          textColor={PALETTE.textLight}
          style={styles.input}
          theme={{ colors: { primary: PALETTE.accent, onSurfaceVariant: PALETTE.textMuted } }}
        />

        <TextInput
          label="Senha"
          mode="flat"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          textColor={PALETTE.textLight}
          style={styles.input}
          theme={{ colors: { primary: PALETTE.accent, onSurfaceVariant: PALETTE.textMuted } }}
        />

        {/* Botão de Ação Primária com relevo estilo game */}
        <TouchableOpacity style={styles.btnAction} onPress={handleSubmit}>
          <Text style={styles.btnActionText}>
            {isCadastro ? '⚔️ FORJAR CONTA (+50 XP)' : 'INICIAR COMPRAS'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsCadastro(!isCadastro)} style={styles.btnToggle}>
          <Text style={styles.btnToggleText}>
            {isCadastro ? 'Já possui perfil? Conectar-se' : 'Cadastro de usuário'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSair} onPress={onSair}>
          <Text style={styles.btnSairText}> Saída (Créditos)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bgDark,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: PALETTE.cardDark,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: PALETTE.primary,
    borderBottomWidth: 6,
    borderBottomColor: PALETTE.deepWood,
  },
  badgeHeader: {
    alignSelf: 'center',
    backgroundColor: PALETTE.terracotta,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: PALETTE.rose,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: PALETTE.rose,
    textAlign: 'center',
  },
  subtitle: {
    color: PALETTE.accent,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: PALETTE.deepWood,
    marginBottom: 12,
    borderRadius: 8,
  },
  btnAction: {
    backgroundColor: PALETTE.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 4,
    borderBottomColor: PALETTE.primary,
  },
  btnActionText: {
    color: '#042414',
    fontWeight: '900',
    fontSize: 14,
  },
  btnToggle: {
    marginTop: 12,
    alignItems: 'center',
  },
  btnToggleText: {
    color: PALETTE.rose,
    fontSize: 13,
  },
  btnSair: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: PALETTE.terracotta,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSairText: {
    color: PALETTE.rose,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
