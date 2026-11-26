# 🎙️ Aplicativo Didático de Gravação de Áudio com Expo Go

Este aplicativo foi desenvolvido especialmente para fins didáticos, voltado para alunos que estão tendo seu primeiro contato com desenvolvimento mobile com **React Native** e **Expo Go**.

---

## 📱 O que este projeto faz?

De maneira direta e sem códigos complexos, este aplicativo permite:
1. **Solicitar permissão** para usar o microfone do celular.
2. **Gravar um áudio** através do microfone.
3. **Exibir o tempo de gravação** em tempo real.
4. **Reproduzir o áudio gravado** pelos alto-falantes do celular.
5. **Descartar a gravação** e gravar novamente.

---

## 🚀 Como testar no celular dos alunos (com Expo Go)

### 1. No celular do aluno:
- Instalar o aplicativo **Expo Go** gratuito na [Google Play Store (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779).
- Certificar-se de que o computador e o celular estão conectados na **mesma rede Wi-Fi** (ou usar a opção `--tunnel` se estiver em redes diferentes).

### 2. No terminal do computador:
Execute o comando:
```bash
npx expo start
```
> **Dica**: Se os celulares dos alunos não estiverem na mesma rede Wi-Fi que o computador (comum em redes escolares com bloqueio), use:
> ```bash
> npx expo start --tunnel
> ```

### 3. Abrindo o app:
- **No Android**: Abra o app *Expo Go* e toque em **"Scan QR code"** para escanear o QR code exibido no terminal.
- **No iPhone**: Abra a **câmera do celular**, aponte para o QR code e toque na notificação amarela que abrirá o app no Expo Go.

---

## 🧠 Conceitos fundamentais para explicar aos alunos

### 1. Por que precisamos pedir permissão (`requestRecordingPermissionsAsync`)?
Em smartphones (Android e iOS), o microfone é um recurso sensível de privacidade. Nenhum aplicativo pode ouvir ou gravar sem que o usuário dê autorização expressa em uma janelinha do sistema.

### 2. O ciclo de vida da gravação:
1. **Preparação**: Avisamos o sistema operacional que o app vai usar o microfone (`setAudioModeAsync`).
2. **Gravação ativa**: O celular converte as vibrações sonoras em dados digitais e salva em um arquivo temporário no aparelho.
3. **Parada e salvamento**: O gravador para e nos entrega a **URI** (o endereço local onde o arquivo `.m4a` ou `.wav` foi guardado, ex: `file:///data/user/0/.../cache/audio.m4a`).
4. **Reprodução**: O reprodutor lê esse arquivo salvo e envia o som para as caixas de áudio do dispositivo.

---

## 📂 Arquivos principais do projeto

- `App.js`: Contém **todo o código da interface e da lógica**, totalmente comentado em português para fácil leitura pelos alunos.
- `app.json`: Contém o nome do app e as permissões de microfone exigidas pelos sistemas Android e iOS.
- `package.json`: Lista as dependências do projeto, incluindo o `expo-audio`.

---

## 💡 Ideias de desafios para os alunos em sala:

1. **Alterar as cores e o visual**: Mudar a cor do botão de gravação no objeto `styles`.
2. **Mudar os textos**: Personalizar o título e as mensagens da tela com o nome do aluno.
3. **Limite de tempo**: Usar um `setTimeout` para parar a gravação automaticamente após 10 segundos.
