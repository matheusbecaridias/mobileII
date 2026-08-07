Guia completo com os principais comandos de terminal para criar e executar um projeto usando Expo:

```markdown
# Guia de Comandos Expo - CLI

## 📦 Instalação

### Instalar Expo CLI globalmente
```bash
npm install -g expo-cli
```

### Instalar Expo CLI como dependência de desenvolvimento
```bash
npm install expo --save-dev
```

## 🚀 Criar um Novo Projeto

### Criar projeto com template padrão
```bash
expo init nome-do-projeto
```

### Criar projeto com template específico (TypeScript, Navigation, etc.)
```bash
expo init nome-do-projeto --template
```

### Criar projeto com o template mínimo
```bash
npx create-expo-app nome-do-projeto
```

### Criar projeto com suporte a TypeScript
```bash
npx create-expo-app nome-do-projeto --template
```

## ▶️ Executar o Projeto

### Iniciar o servidor de desenvolvimento
```bash
npm start
# ou
expo start
```

### Iniciar em modo específico
```bash
expo start --android    # Apenas Android
expo start --ios        # Apenas iOS
expo start --web        # Apenas Web
```

### Iniciar com opções específicas
```bash
expo start --clear      # Limpar cache
expo start --tunnel     # Usar túnel para compartilhar
expo start --localhost  # Usar localhost apenas
```

## 📱 Executar em Dispositivos

### Executar no Android (emulador ou físico)
```bash
expo start --android
# ou
npm run android
```

### Executar no iOS (simulador ou físico)
```bash
expo start --ios
# ou
npm run ios
```

### Executar na Web
```bash
expo start --web
# ou
npm run web
```

## 📲 Build e Publicação

### Build para produção (Android)
```bash
expo build:android
```

### Build para produção (iOS)
```bash
expo build:ios
```

### Build para produção (Android - APK)
```bash
expo build:android -t apk
```

### Build para produção (Android - App Bundle)
```bash
expo build:android -t app-bundle
```

### Publicar no Expo
```bash
expo publish
```

## 🛠️ Comandos Úteis

### Instalar novas dependências
```bash
expo install nome-do-pacote
# Exemplo
expo install @react-navigation/native
```

### Verificar versões e atualizações
```bash
expo update
```

### Limpar cache do projeto
```bash
expo start -c
# ou
expo start --clear
```

### Visualizar logs
```bash
expo logs
```

### Abrir projeto no Expo Go (físico)
```bash
expo start --tunnel
```

### Gerar ícones e splash screen
```bash
npx expo-splash-screen
```

## 🔧 Configuração

### Iniciar com configuração personalizada
```bash
expo init --npm
expo init --yarn
```

### Instalar Expo com pacotes específicos
```bash
npx expo install react-native-web react-dom @expo/metro-runtime
```

## 🗑️ Comandos de Manutenção

### Remover node_modules e reinstalar
```bash
rm -rf node_modules
npm install
# ou com yarn
rm -rf node_modules
yarn install
```

### Atualizar Expo CLI
```bash
npm install -g expo-cli@latest
```

### Verificar versão do Expo
```bash
expo --version
npx expo --version
```

## 📋 Scripts Package.json Padrão

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build:android": "expo build:android",
    "build:ios": "expo build:ios"
  }
}
```

## ⚠️ Comandos para Solução de Problemas

### Limpar cache Metro Bundler
```bash
npx expo start -c
```

### Resetar tudo (node_modules + cache)
```bash
rm -rf node_modules
rm -rf .expo
npm install
expo start -c
```

### Verificar dependências conflitantes
```bash
npx expo doctor
```

## 🏗️ Comandos com EAS (Expo Application Services)

### Build com EAS
```bash
eas build --platform android
eas build --platform ios
eas build --platform all
```

### Publicar atualizações com EAS
```bash
eas update
```

### Criar build para produção com EAS
```bash
eas build --platform android --profile production
eas build --platform ios --profile production
```

---

## 📝 Notas Importantes

- **Expo Go**: App para testar projetos em dispositivos físicos
- **Túnel**: Necessário para testar em redes diferentes
- **LAN**: Para testar na mesma rede Wi-Fi
- **Localhost**: Apenas para desenvolvimento local
- **EAS**: Serviço de build da Expo para produção
```

Este guia cobre os principais comandos que você precisará para desenvolver com Expo. Guarde este arquivo como referência rápida para seus projetos!
