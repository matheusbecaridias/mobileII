# 📱 Tutorial: Criando um Projeto com Expo Go

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (instalado globalmente)
- Um emulador ou dispositivo físico com o app **Expo Go** instalado

---

## 🚀 Passo 1: Instalar o Expo CLI
```
# Atualizar npm
npm install -g npm@latest

# Atualizar Expo CLI
npm install -g expo-cli@latest

# Ou instalar o pacote create-expo-app globalmente
npm install -g create-expo-app

```
Verifique a instalação:

```bash
expo --version
```

---

## 🛠️ Passo 2: Criar um Novo Projeto

### Opção 1: Projeto com Template Padrão
```bash
npx create-expo-app meu-app
```

### Opção 2: Projeto com Template TypeScript
```bash
npx create-expo-app meu-app --template
```

### Opção 3: Projeto Minimalista (sem dependências extras)
```bash
npx create-expo-app meu-app --template blank
```

---

## 📂 Passo 3: Acessar o Diretório do Projeto

```bash
cd meu-app
```

---

## 📦 Passo 4: Instalar Dependências (se necessário)

```bash
npm install
```

ou

```bash
yarn install
```

---

## 🎯 Passo 5: Iniciar o Projeto

### Iniciar com Expo
```bash
npx expo start
```

### Iniciar com yarn
```bash
yarn start
```

### Iniciar com npm
```bash
npm start
```

---

## 📱 Passo 6: Executar em Dispositivos

### No Emulador Android
```bash
npx expo start --android
```

### No Simulador iOS (apenas Mac)
```bash
npx expo start --ios
```

### No Navegador (Web)
```bash
npx expo start --web
```

---

## 🔧 Passo 7: Comandos Úteis

### Limpar Cache
```bash
npx expo start -c
```

### Build para Produção
```bash
npx expo build:android
npx expo build:ios
```

### Executar no Modo Desenvolvimento
```bash
npx expo start --dev
```

### Exportar para Produção
```bash
npx expo export
```

---

## 🏗️ Estrutura do Projeto Criada

```
meu-app/
├── .expo/           # Arquivos de configuração do Expo
├── .gitignore       # Arquivos ignorados pelo Git
├── App.js           # Componente principal
├── app.json         # Configurações do app
├── babel.config.js  # Configuração do Babel
├── package.json     # Dependências e scripts
├── node_modules/    # Dependências instaladas
└── assets/          # Recursos (imagens, fontes, etc.)
```

---

## 📝 Exemplo de App.js

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Expo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

---

## 🧹 Passo 8: Limpeza e Otimização

### Remover arquivos não utilizados
```bash
rm -rf .expo
```

### Reinstalar dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🚦 Solução de Problemas Comuns

### Erro: "Cannot find module 'expo'"
```bash
npm install expo
```

### Erro: "Porta já está em uso"
```bash
npx expo start --port 19000
```

### Erro: "Metro bundler não inicia"
```bash
npx expo start -c
```

### Erro: "Android SDK não encontrado"
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## 📌 Dicas Importantes

1. **Instale o Expo Go** no seu dispositivo físico para testar rapidamente
2. **Use o QR Code** gerado pelo `expo start` para abrir no dispositivo
3. **Ative o modo desenvolvedor** no Android para usar o Expo Go
4. **Mantenha o Node.js atualizado** para evitar problemas de compatibilidade
5. **Use o comando `expo doctor`** para verificar problemas no projeto

---

## 🔗 Links Úteis

- [Documentação Oficial do Expo](https://docs.expo.dev/)
- [Expo Go na Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- [Expo Go na App Store](https://apps.apple.com/app/expo-go/id982107779)
- [Snack - Editor Online do Expo](https://snack.expo.dev/)

---

## ✅ Checklist de Verificação

- [ ] Node.js instalado (v16+)
- [ ] Expo CLI instalado globalmente
- [ ] Projeto criado com sucesso
- [ ] Dependências instaladas
- [ ] Projeto inicia sem erros
- [ ] App aparece no emulador/dispositivo
- [ ] Hot reload funcionando

---

**🎉 Parabéns!** Seu projeto Expo está pronto para desenvolvimento!
