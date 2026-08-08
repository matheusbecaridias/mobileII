1.2. Instalar Ferramentas Essenciais e Git
Ganta que o git, curl e pacotes de compilação estejam instalados:
sudo apt install -y git curl build-essential ca-certificates

1.3. Instalar o Node.js (via NVM)
A forma recomendada de instalar o Node.js no Linux é pelo NVM (Node Version Manager), pois evita problemas de permissão com o sudo e facilita a alteração de versões do Node.
 * Baixe e instale o NVM:
   curl -o- [https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh) | bash

 * Feche e abra o terminal novamente (ou execute source ~/.bashrc).
 * Instale a versão LTS do Node.js:
   nvm install --lts
nvm use --lts

 * Verifique as versões instaladas:
   node -v
npm -v

(Recomendado: Node.js v18.x ou superior).
1.4. Aumentar o Limite de Monitores de Arquivos (inotify)
O Expo e o Metro Bundler monitoram alterações nos arquivos do projeto em tempo real. No Linux, o limite padrão pode ser insuficiente e causar o erro ENOSPC: System limit for number of file watchers reached.
Para aumentar o limite permanentemente:
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

Passo 2: Criando o Primeiro Projeto Expo
O Expo recomenda o uso da ferramenta oficial create-expo-app para inicializar projetos com a estrutura moderna e suporte ao Expo Router.
2.1. Executar o Criador de Projetos
Navegue até a pasta onde deseja salvar seus projetos (ex: ~/Projetos) e execute:
mkdir -p ~/Projetos && cd ~/Projetos
npx create-expo-app@latest meu-app-expo

Durante o processo, escolha o modelo padrão (que inclui suporte a TypeScript, navegação por abas e suporte ao Expo Router).
2.2. Estrutura Padrão do Projeto
Acesse a pasta do projeto recém-criado:
cd meu-app-expo

Sua estrutura principal de arquivos será semelhante a esta:
meu-app-expo/
├── assets/             # Imagens, fontes e recursos estáticos
├── src/
│   ├── app/            # Rotas do aplicativo (Expo Router)
│   │   ├── _layout.tsx # Layout global e navegadores (Tabs/Stack)
│   │   ├── index.tsx   # Tela inicial do app
│   │   └── explore.tsx # Segunda tela do template
│   ├── components/     # Componentes reutilizáveis
│   ├── constants/      # Constantes Globais (Cores, Temas)
│   └── hooks/          # Custom React Hooks
├── app.json            # Configurações do Expo (Nome, ícones, permissões)
├── package.json        # Dependências do projeto e scripts npm
└── tsconfig.json       # Configurações do TypeScript

Passo 3: Executando o App no Celular Android
3.1. Preparar o Celular Android
 * Abra a Google Play Store no seu celular Android.
 * Pesquise por Expo Go e faça a instalação.
 * Certifique-se de que o celular está conectado à mesma rede Wi-Fi do computador com Linux Mint.
3.2. Iniciar o Servidor de Desenvolvimento
No terminal do seu Linux Mint, dentro da pasta do projeto (~/Projetos/meu-app-expo), execute:
npx expo start

Você verá um painel interativo no terminal exibindo um QR Code e atalhos de teclado:
 › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

 › Press a │ open Android emulator
 › Press w │ open web browser
 › Press r │ reload app
 › Press m │ toggle menu
 › Press ? │ show all commands

3.3. Conectar e Abrir o App
 * Abra o aplicativo Expo Go no seu Android.
 * Toque em "Scan QR code".
 * Aponte a câmera do celular para o QR Code gerado no terminal do Linux Mint.
 * O Metro Bundler começará a compilar os pacotes (Building JavaScript bundle...).
 * Em instantes, o seu app aparecerá em tempo real no seu celular!
Passo 4: Resolução de Problemas no Linux Mint
4.1. O QR Code não conecta / Timeout na conexão LAN
Muitas vezes o firewall padrão do Linux Mint (ufw) ou restrições de isolamento da rede Wi-Fi impedem que o smartphone acesse o IP local do computador.
Solução A: Liberação do Firewall
Permita o acesso às portas padrão do Expo (8081):
sudo ufw allow 8081/tcp

Solução B: Usar Conexão por Tunnel (Recomendado se o Wi-Fi for bloqueado)
O modo Tunnel cria uma URL pública temporária e segura via Ngrok para conectar seu celular ao PC, ignorando restrições de rede local:
npx expo start --tunnel

(Na primeira vez, o Expo solicitará a instalação do pacote @expo/ngrok).
Solução C: Conexão USB via ADB (Sem depender de Wi-Fi)
Se você não tem Wi-Fi ou prefere uma conexão ultra-rápida via cabo USB:
 * Instale as ferramentas do Android no Linux Mint:
   sudo apt install -y android-tools-adb

 * No celular Android: Ative as Opções do Desenvolvedor e ative a Depuração USB.
 * Conecte o celular via cabo USB ao computador.
 * Teste a conexão no terminal:
   adb devices

   (Aceite a permissão de depuração na tela do celular se solicitado).
 * Inicie o Expo e pressione a tecla a no terminal:
   npx expo start

   Aperte a no terminal para abrir diretamente no celular conectado por USB.
Passo 5: Principais Funcionalidades e Conceitos do Expo
O ecossistema Expo vai muito além de um simples inicializador de projetos. Abaixo estão as principais funcionalidades indispensáveis no dia a dia:
5.1. Fast Refresh (Atualização Instantânea)
Qualquer alteração salva em arquivos como src/app/index.tsx reflete instantaneamente na tela do celular em frações de segundo sem perder o estado da aplicação.
5.2. Menu do Desenvolvedor (Developer Menu)
No celular Android rodando o app via Expo Go:
 * Sacuda o aparelho ou execute no terminal npx expo start e aperte m.
 * O menu flutuante permite:
   * Recarregar a aplicação (Reload).
   * Ativar/desativar o Fast Refresh.
   * Abrir o inspetor de elementos (Toggle Element Inspector).
   * Visualizar logs de erros de JavaScript/React.
5.3. Roteamento Baseado em Arquivos (Expo Router)
O Expo Router utiliza a estrutura de arquivos da pasta src/app para definir as rotas do app, de forma idêntica ao Next.js:
 * src/app/index.tsx ➔ Rota principal (/)
 * src/app/perfil.tsx ➔ Rota (/perfil)
 * src/app/detalhes/[id].tsx ➔ Rota com parâmetro dinâmico (/detalhes/123)
 * src/app/_layout.tsx ➔ Envolve as telas definindo navegação do tipo Stack (Pilha) ou Tabs (Abas).
Exemplo de navegação imperativa:
import { Link } from 'expo-router';
import { Text, View } from 'react_native';

export default function HomeScreen() {
  return (
    <View>
      <Text>Página Inicial</Text>
      <Link href="/perfil">Ir para o Perfil</Link>
    </View>
  );
}

5.4. Expo SDK (Acesso a Recursos Nativos)
O Expo possui um vasto ecossistema de bibliotecas oficiais otimizadas para acessar hardware e recursos do dispositivo com comandos simples:
| Funcionalidade | Pacote NPM | Comando de Instalação |
|---|---|---|
| Câmera | expo-camera | npx expo install expo-camera |
| Localização / GPS | expo-location | npx expo install expo-location |
| Notificações | expo-notifications | npx expo install expo-notifications |
| Armazenamento Seguro | expo-secure-store | npx expo install expo-secure-store |
| Banco de Dados SQLite | expo-sqlite | npx expo install expo-sqlite |
| Ícones Vetoriais | @expo/vector-icons | Já incluso nativamente no template |
| Gerenciador de Fontes | expo-font | npx expo install expo-font |
| Sensores (Acelerômetro) | expo-sensors | npx expo install expo-sensors |
> ⚠️ Regra de Ouro: Sempre utilize npx expo install <nome-do-pacote> ao invés de npm install para garantir a versão exata compatível com o seu Expo SDK.
> 
5.5. EAS (Expo Application Services)
O EAS é o ecossistema em nuvem para construir e publicar aplicativos profissionais:
 * EAS Build: Compila o seu aplicativo na nuvem e gera arquivos .apk ou .aab (para Play Store) sem consumir a memória ou processador do seu computador Linux Mint.
 * EAS Submit: Envia automaticamente o build compilado para a Google Play Store.
 * EAS Update: Permite enviar correções de bugs e atualizações instantâneas Over-The-Air (OTA) diretamente para o celular dos usuários sem precisar passar pela aprovação da loja.
Para instalar a CLI do EAS globalmente:
npm install -g eas-cli

💡 Boas Práticas e Dicas de Desempenho
 * Editor Recomendado: Utilize o Visual Studio Code no Linux Mint. Instale as extensões:
   * Expo Tools
   * ESLint / Prettier
   * React Native Tools
 * Não use sudo com npm ou npx: Com o NVM configurado, seu usuário comum possui todas as permissões necessárias na pasta home.
 * Gerenciar Dependências: Mantenha seu projeto limpo rodando npx expo install --check periodicamente para verificar inconsistências entre versões das bibliotecas.
 * Build APK de Teste Local/Nuvem:
   Quando seu projeto precisar de código nativo customizado que o Expo Go não suporta, crie um Development Build:
   npx expo run:android

Tutorial gerado com base na documentação oficial do Expo (expo.dev).
"""
file_name = "tutorial-expo-linux-mint.md"
with open(file_name, "w", encoding="utf-8") as f:
f.write(content)
print(f"File {file_name} generated successfully.")

```text?code_stdout&code_event_index=1
File tutorial-expo-linux-mint.md generated successfully.


O que está incluído no arquivo tutorial-expo-linux-mint.md:
 * Configuração do Ambiente no Linux Mint:
   * Atualização de pacotes do sistema (apt update/upgrade).
   * Instalação de utilitários básicos (git, curl, build-essential).
   * Instalação e gerenciamento do Node.js LTS via NVM (evitando erros de permissão com sudo).
   * Ajuste de limites do sistema Linux (sysctl / fs.inotify.max_user_watches) para suportar a observação de arquivos em tempo real pelo Metro Bundler.
 * Criação do Projeto Expo:
   * Inicialização moderna usando npx create-expo-app@latest.
   * Explicação detalhada da nova estrutura de diretórios e arquivos com suporte ao Expo Router (src/app, app.json, _layout.tsx, etc.).
 * Execução no Celular Android:
   * Instalação e uso do app Expo Go via Google Play Store.
   * Execução do servidor com npx expo start e leitura do QR Code.
   * Soluções para problemas comuns de rede no Linux Mint:
     * Liberação de portas no Firewall (ufw allow 8081/tcp).
     * Utilização do modo Tunnel (npx expo start --tunnel) via @expo/ngrok.
     * Conexão direta via cabo USB Debugging / ADB (android-tools-adb).
 * Principais Funcionalidades da Ferramenta Expo:
   * Fast Refresh e Developer Menu (gestos e atalhos de terminal).
   * Expo Router: Roteamento nativo baseado em arquivos (estruturas simples, dinâmicas e layouts com Stack/Tabs).
   * Expo SDK: Tabela de módulos essenciais (expo-camera, expo-location, expo-notifications, expo-sqlite, expo-secure-store, @expo/vector-icons, etc.) e a regra do npx expo install.
   * EAS (Expo Application Services): Visão geral de eas build (compilação na nuvem de APK/AAB sem pesar o computador), eas submit e atualizações Over-The-Air (eas update).
 * Dicas e Boas Práticas:
   * Configurações do VS Code e permissões de pacotes Node.
   
