# Tutorial: Criando e Executando um Projeto com Expo Go (Linux Mint)
---

## 1. Pré-requisitos

### 1.1. Atualizar o sistema
```bash
sudo apt update && sudo apt upgrade -y
```
Garante que os pacotes do sistema estejam atualizados antes de instalar novas ferramentas.

### 1.2. Instalar o Node.js (via NVM)
O Expo exige uma versão relativamente recente do Node.js. O ideal é usar o **NVM** (Node Version Manager) para gerenciar versões sem conflitos com o sistema.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```
Baixa e instala o NVM.

```bash
source ~/.bashrc
```
Recarrega o terminal para reconhecer o comando `nvm`.

```bash
nvm install --lts
```
Instala a versão LTS (mais estável) do Node.js.

```bash
node -v
npm -v
```
Confirma que Node.js e npm foram instalados corretamente.

---

## 2. Instalando o Expo

### 2.1. Criar o projeto
```bash
npx create-expo-app@latest meu-app --template default@sdk-54
```
Cria um novo projeto Expo chamado `meu-app`, já usando o SDK 54.

> ⚠️ **Importante sobre versões:** o app **Expo Go** disponível nas lojas (Play Store/App Store) só roda projetos com o **mesmo SDK** que ele suporta atualmente — no momento, **SDK 54**. Se você rodar apenas `npx create-expo-app@latest meu-app` (sem `--template`), o comando pode te perguntar qual versão usar ou criar o projeto com o SDK mais recente (57), que **não abre no Expo Go**, exigindo um "development build" à parte. Para seguir este tutorial (uso direto no Expo Go), use sempre a flag `--template default@sdk-54`.

O projeto já vem com **Expo Router** (roteamento por arquivos, semelhante ao Next.js). Estrutura básica gerada:
```
meu-app/
├── src/
│   └── app/
│       ├── index.tsx      # tela principal (rota "/")
│       ├── explore.tsx    # segunda aba de exemplo
│       └── _layout.tsx    # layout raiz, define navegação em abas
├── assets/
├── package.json
└── tsconfig.json
```

### 2.2. Acessar a pasta do projeto
```bash
cd meu-app
```

---

## 3. Instalar o app Expo Go no celular

No seu smartphone (Android ou iOS), instale o aplicativo **Expo Go** pela loja de apps (Google Play ou App Store). Ele será usado para visualizar o app em tempo real durante o desenvolvimento.

---

## 4. Executando o projeto

### 4.1. Iniciar o servidor de desenvolvimento
```bash
npx expo start
```
Inicia o Metro Bundler e exibe um **QR Code** no terminal.

### 4.2. Conectar o celular
- Abra o app **Expo Go** no celular.
- Escaneie o QR Code exibido no terminal (Android: opção de scanner dentro do próprio Expo Go; iOS: câmera nativa).
- Celular e computador devem estar na **mesma rede Wi-Fi**.

O app será carregado automaticamente no celular, refletindo o conteúdo do `App.js`.

---

## 5. Editando o app

O arquivo principal do projeto é o `src/app/index.tsx`, responsável pela rota inicial (`/`). Exemplo básico:

```tsx
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Meu primeiro app com Expo!</Text>
    </View>
  );
}
```

Toda alteração salva neste arquivo é refletida automaticamente no celular (Fast Refresh), sem precisar reiniciar o servidor.

Para criar novas telas/rotas, basta adicionar novos arquivos dentro de `src/app/`. Por exemplo, `src/app/sobre.tsx` cria automaticamente a rota `/sobre`, sem necessidade de configurar navegação manualmente.

---

## 6. Comandos úteis do dia a dia

| Comando | Função |
|---|---|
| `npx expo start` | Inicia o servidor de desenvolvimento |
| `npx expo start -c` | Inicia limpando o cache (útil quando algo trava) |
| `npx expo start --tunnel` | Usa modo túnel, útil se celular e PC não estão na mesma rede |
| `npm install <pacote>` | Instala uma nova dependência no projeto |
| `npx expo install <pacote>` | Instala dependências compatíveis com a versão do Expo em uso |
| `Ctrl + C` | Encerra o servidor no terminal |

---

## 7. Rodando como aplicativo Web

Como o pedido é ter o Expo como base **para elaboração de um aplicativo web**, o Expo já suporta isso nativamente:

```bash
npx expo start --web
```
Abre o projeto diretamente no navegador, usando `react-native-web` por baixo dos panos — o mesmo código do `App.js` roda tanto no celular (via Expo Go) quanto no navegador.

Se for a primeira vez usando a versão web, o Expo pode pedir para instalar dependências extras:
```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

---

## 8. Fluxo resumido

```bash
# 1. Criar projeto
npx create-expo-app@latest meu-app

# 2. Entrar na pasta
cd meu-app

# 3. Rodar (celular via Expo Go)
npx expo start

# 3.1 Rodar (versão web)
npx expo start --web
```

A partir daqui, todo o desenvolvimento acontece editando o `src/app/index.tsx` (e os demais arquivos de rota criados dentro de `src/app/`), com o resultado sendo atualizado em tempo real.
