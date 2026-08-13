# 🚀 Tutorial: Configuração de Ambiente para Desenvolvimento com Expo

## 📋 Índice
1. [Pré-requisitos](#pré-requisitos)
2. [Instalação do Node.js e npm](#instalação-do-nodejs-e-npm)
3. [Configuração do Expo](#configuração-do-expo)
4. [Criação do Projeto](#criação-do-projeto)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Comandos Úteis](#comandos-úteis)
7. [Solução de Problemas](#solução-de-problemas)
8. [Dicas e Boas Práticas](#dicas-e-boas-práticas)

---

## 🎯 Pré-requisitos

### Sistema Operacional
- **Windows**: Windows 10/11
- **macOS**: 10.14 (Mojave) ou superior
- **Linux**: Ubuntu 18.04 ou superior

### Ferramentas Necessárias
- Node.js (versão 16 ou superior)
- npm ou yarn
- Editor de código (VS Code recomendado)
- Expo Go App (no dispositivo móvel)

---

## 📦 Passo 1: Instalação do Node.js e npm

### Opção 1: Usando o Node Version Manager (NVM) - RECOMENDADO

#### Instalar NVM
```bash
# Linux/macOS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Ou via wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reiniciar o terminal
source ~/.bashrc  # ou source ~/.zshrc
```

#### Instalar Node.js
```bash
# Instalar a versão LTS mais recente
nvm install --lts

# Ou instalar versão específica
nvm install 18.0.0

# Definir como padrão
nvm alias default node

# Verificar instalação
node --version  # v18.x.x
npm --version   # 8.x.x ou superior
```

### Opção 2: Download Direto do Site Oficial

#### Para Windows:
1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe o instalador LTS
3. Execute o instalador e siga as instruções
4. Marque a opção "Add to PATH"

#### Para macOS:
```bash
# Usando Homebrew
brew install node
```

#### Para Linux (Ubuntu/Debian):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 🛠️ Passo 2: Configuração do Expo

### 2.1 Instalar Expo CLI (Método Antigo - Não Recomendado)
```bash
npm install -g expo-cli@latest
```
⚠️ **ATENÇÃO**: Este método está deprecado! Use `npx expo` ou `create-expo-app`.

### 2.2 Método Moderno (Recomendado)

#### Instalar create-expo-app globalmente
```bash
npm install -g create-expo-app
```

#### Ou usar diretamente com npx
```bash
# Não precisa instalar globalmente
npx create-expo-app meu-app
```

### 2.3 Verificar Instalação
```bash
# Verificar se o Expo está instalado
npx expo --version

# Verificar versão do create-expo-app
npx create-expo-app --version
```

---

## 🚀 Passo 3: Criação do Projeto

### 3.1 Criar Projeto JavaScript Puro

#### Opção 1: Usando create-expo-app
```bash
npx create-expo-app@latest to-do-list --template blank
```

#### Opção 2: Usando o template explícito
```bash
npx create-expo-app to-do-list --template @expo/blank@latest
```

#### Opção 3: Com navegação (tabs)
```bash
npx create-expo-app to-do-list --template tabs
```

### 3.2 Navegar para o Projeto
```bash
cd to-do-list
```

### 3.3 Instalar Dependências
```bash
npm install
```

### 3.4 Verificar Saúde do Projeto
```bash
npx expo doctor
```

---

## 📂 Passo 4: Estrutura do Projeto Criado

```
to-do-list/
├── .expo/              # Configurações do Expo
│   ├── packager-info.json
│   └── settings.json
├── .gitignore          # Arquivos ignorados pelo Git
├── App.js              # Componente principal (JS)
├── app.json            # Configurações do app
├── assets/             # Recursos (imagens, fontes)
│   ├── icon.png
│   └── splash.png
├── babel.config.js     # Configuração do Babel
├── package.json        # Dependências e scripts
└── node_modules/       # Dependências instaladas
```

### Conteúdo do App.js
```javascript
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

---

## 🎯 Passo 5: Comandos Úteis

### 5.1 Iniciar o Projeto
```bash
# Iniciar normalmente
npm start

# Ou usando npx
npx expo start

# Com cache limpo
npx expo start -c
```

### 5.2 Executar em Diferentes Plataformas
```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

### 5.3 Gerenciamento do Projeto
```bash
# Verificar dependências
npm audit

# Corrigir vulnerabilidades
npm audit fix

# Atualizar dependências
npx expo install expo@latest

# Limpar cache do projeto
npx expo start -c
```

---

## 🔧 Passo 6: Configuração do Ambiente de Desenvolvimento

### 6.1 Configurar Emulador Android

#### Instalar Android Studio
1. Baixe em [developer.android.com/studio](https://developer.android.com/studio)
2. Instale e configure o SDK
3. Adicione ao PATH:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

#### Criar um Emulador
1. Abra o Android Studio
2. Clique em "AVD Manager"
3. Clique em "Create Virtual Device"
4. Escolha um dispositivo e sistema operacional
5. Inicie o emulador

### 6.2 Configurar VS Code (Recomendado)

#### Extensões Essenciais
```bash
# Instalar via terminal
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension msjsdiag.vscode-react-native
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

#### Configuração do Prettier (.prettierrc)
```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false
}
```

---

## 🚨 Passo 7: Solução de Problemas Comuns

### 7.1 Erro: "npm error code EBADENGINE"

**Causa**: Versão do Node.js incompatível
```bash
# Solução: Usar nvm para mudar versão
nvm install 18.0.0
nvm use 18.0.0

# Verificar versão
node --version
```

### 7.2 Erro: "npm pack @expo/blank@latest --dry-run --json exited with non-zero code: 1"

**Solução**:
```bash
# Limpar cache
npm cache clean --force

# Tentar novamente
npx create-expo-app to-do-list --template blank
```

### 7.3 Erro: "Metro bundler não inicia"

```bash
# Limpar cache do Metro
npx expo start -c

# Ou
watchman watch-del-all
npx expo start -c
```

### 7.4 Erro: "Porta 19000 já está em uso"

```bash
# Usar porta diferente
npx expo start --port 19001

# Ou matar o processo na porta
# Linux/macOS
lsof -ti:19000 | xargs kill -9
# Windows
netstat -ano | findstr :19000
taskkill /PID [PID] /F
```

### 7.5 Erro: "Cannot find module 'expo'"

```bash
# Instalar expo
npm install expo

# Ou reinstalar todas dependências
rm -rf node_modules package-lock.json
npm install
```

---

## 💡 Passo 8: Dicas e Boas Práticas

### 8.1 Scripts do package.json
```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "build": "expo export",
    "clean": "expo start -c",
    "doctor": "expo doctor",
    "upgrade": "expo upgrade"
  }
}
```

### 8.2 Estrutura de Pastas Recomendada
```
src/
├── components/    # Componentes reutilizáveis
├── screens/       # Telas da aplicação
├── navigation/    # Configuração de navegação
├── hooks/         # Hooks customizados
├── context/       # Context API
├── utils/         # Funções utilitárias
├── constants/     # Constantes
└── styles/        # Estilos compartilhados
```

### 8.3 .gitignore
```
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
```

### 8.4 Variáveis de Ambiente
```bash
# .env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_GOOGLE_MAPS_KEY=your_key
```

---

## ✅ Checklist de Verificação

- [ ] Node.js instalado (v18+)
- [ ] npm atualizado
- [ ] create-expo-app instalado
- [ ] Projeto criado com sucesso
- [ ] Dependências instaladas
- [ ] `npx expo start` funciona
- [ ] App aparece no dispositivo/emulador
- [ ] VS Code configurado com extensões
- [ ] Android Studio configurado (se usar Android)
- [ ] Expo Go instalado no dispositivo

---

## 📚 Recursos Adicionais

### Documentação
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Node.js Documentation](https://nodejs.org/docs/)

### Comunidade
- [Expo Forums](https://forums.expo.dev/)
- [React Native Community](https://reactnative.dev/community)
- [Stack Overflow Expo Tag](https://stackoverflow.com/questions/tagged/expo)

### Ferramentas Úteis
- **Snack**: Editor online do Expo - [snack.expo.dev](https://snack.expo.dev/)
- **Expo Go**: App para testes - [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) | [App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Expo EAS**: Build e deploy - [docs.expo.dev/eas](https://docs.expo.dev/eas/)

---

## 🎉 Conclusão

Seu ambiente para desenvolvimento com Expo está configurado! Agora você pode:

1. Criar novos projetos com `npx create-expo-app`
2. Desenvolver em JavaScript puro
3. Testar em dispositivos físicos com Expo Go
4. Usar emuladores para testes
5. Publicar seus apps com EAS Build

**Bons códigos! 🚀**
