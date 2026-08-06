# Tutorial completo: criando um aplicativo Android do zero até o APK no Linux Mint

Este tutorial apresenta um caminho completo para criar um aplicativo Android nativo utilizando **Android Studio + OpenJDK + Gradle + Kotlin + Android SDK**, desde a preparação do Linux Mint até a geração de um arquivo APK.

O procedimento foi adaptado para a seguinte configuração:

* **Sistema:** Linux Mint 22.3 Zena
* **Base:** Ubuntu 24.04 LTS (Noble)
* **Arquitetura:** x86_64
* **Java:** OpenJDK 17.0.19
* **Android Studio:** 2025.2.3
* **Ambiente gráfico:** XFCE

O objetivo é utilizar ferramentas gratuitas e, sempre que possível, componentes de código aberto.

> **Nota sobre licenciamento:** Android Studio é disponibilizado gratuitamente pela Google, mas não deve ser classificado simplesmente como um projeto totalmente open-source. Kotlin, Gradle, várias bibliotecas Android e grande parte do ecossistema utilizado no desenvolvimento são projetos open-source.

---

# 1. Preparação do sistema

## 1.1. Atualizar os repositórios e o sistema

Abra o Terminal:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 1.2. Instalar o OpenJDK 17

Instale o Java 17:

```bash
sudo apt install -y openjdk-17-jdk openjdk-17-jre
```

O tutorial original incluía diversas bibliotecas 32-bit, como:

```text
libc6:i386
libncurses5:i386
libstdc++6:i386
lib32z1
libbz2-1.0:i386
```

**Esses pacotes não devem ser instalados automaticamente neste sistema.**

Em particular, `libncurses5:i386` não está disponível nos repositórios padrão utilizados pelo Linux Mint 22.3/Ubuntu 24.04.

Portanto, para a instalação atual, utilizamos somente:

```bash
sudo apt install -y openjdk-17-jdk openjdk-17-jre
```

Dependências adicionais só devem ser instaladas posteriormente se alguma ferramenta efetivamente solicitar.

---

## 1.3. Verificar o Java

Execute:

```bash
java -version
```

e:

```bash
javac -version
```

A configuração utilizada neste computador é:

```text
java  → OpenJDK 17.0.19
javac → OpenJDK 17.0.19
```

O resultado esperado é semelhante a:

```text
openjdk version "17.0.19"
```

e:

```text
javac 17.0.19
```

### Se `java` e `javac` estiverem usando versões diferentes

O Linux pode possuir mais de uma versão do Java instalada.

Para selecionar o Java 17 como padrão:

```bash
sudo update-alternatives --config java
```

Selecione:

```text
/usr/lib/jvm/java-17-openjdk-amd64/bin/java
```

Depois verifique novamente:

```bash
java -version
javac -version
```

Neste computador, o Java 21 permanece instalado, mas o Java 17 foi configurado como padrão para o ambiente de desenvolvimento.

---

# 2. Instalação do Android Studio

Existem diferentes formas de instalar o Android Studio.

Para esta instalação específica, utilizaremos o **PPA de Maarten Fonville**, pois foi o método que funcionou corretamente no Linux Mint 22.3 utilizado neste computador.

## 2.1. Instalar `software-properties-common`

```bash
sudo apt install software-properties-common -y
```

---

## 2.2. Adicionar o PPA do Android Studio

```bash
sudo add-apt-repository ppa:maarten-fonville/android-studio -y
```

Atualize a lista de pacotes:

```bash
sudo apt update
```

---

## 2.3. Instalar o Android Studio

```bash
sudo apt install android-studio -y
```

Na instalação realizada neste computador, o pacote instalado foi:

```text
android-studio 2025.2.3
```

A instalação baixa automaticamente o pacote completo do Android Studio durante o processo.

---

## 2.4. Iniciar o Android Studio

Depois da instalação, pode-se iniciar pelo menu do Linux Mint ou pelo terminal:

```bash
android-studio
```

A primeira execução abrirá o assistente de configuração.

---

# 3. Configuração inicial do Android Studio

Na primeira execução, o Android Studio apresentará o assistente de configuração.

Quando solicitado, utilize:

* **Standard** installation
* aceite os termos de licença;
* permita a instalação dos componentes recomendados.

O Android Studio poderá instalar componentes como:

* Android SDK
* Android SDK Platform
* Android SDK Platform-Tools
* Android SDK Build-Tools
* Android Emulator
* ferramentas adicionais necessárias ao desenvolvimento.

O primeiro download pode ser bastante grande e demorar dependendo da velocidade da conexão.

**Não é necessário instalar manualmente esses componentes antes do assistente.**

---

# 4. Criando o primeiro projeto

Na tela inicial do Android Studio:

1. Clique em **New Project**.
2. Selecione **Phone and Tablet**.
3. Selecione **Empty Activity**.

O modelo **Empty Activity** atual utiliza Jetpack Compose, que é a abordagem moderna para criação da interface Android.

Configure o projeto.

### Name

```text
MeuPrimeiroApp
```

ou outro nome desejado.

### Package name

Por exemplo:

```text
com.seunome.meuprimeiroapp
```

Utilize o padrão de nomeação reversa de domínio.

### Save location

Por exemplo:

```text
~/AndroidStudioProjects
```

### Language

```text
Kotlin
```

### Minimum SDK

Pode-se utilizar:

```text
API 24
```

ou superior.

Para projetos direcionados a versões Android mais recentes, pode ser conveniente utilizar uma API mínima mais alta.

### Build configuration language

```text
Kotlin DSL
```

Depois clique em:

**Finish**

---

# 5. Primeira sincronização do Gradle

Após a criação do projeto, o Android Studio executará a sincronização do Gradle.

Durante esse processo poderão ser baixados:

* Gradle;
* Android Gradle Plugin;
* bibliotecas Kotlin;
* Jetpack Compose;
* Material 3;
* dependências do projeto;
* componentes do Android SDK.

Na primeira execução, esse processo pode demorar consideravelmente mais do que nas seguintes.

Aguarde a conclusão da sincronização.

---

# 6. Estrutura básica do projeto

No painel **Project**, você encontrará arquivos e diretórios semelhantes aos seguintes:

```text
MeuPrimeiroApp/
├── app/
│   ├── build.gradle.kts
│   └── src/
│       └── main/
│           ├── AndroidManifest.xml
│           ├── java/
│           │   └── com/
│           │       └── seunome/
│           │           └── meuprimeiroapp/
│           │               └── MainActivity.kt
│           └── res/
├── build.gradle.kts
├── settings.gradle.kts
└── gradlew
```

O arquivo principal da aplicação será:

```text
app/src/main/java/.../MainActivity.kt
```

O arquivo:

```text
app/build.gradle.kts
```

contém configurações importantes do módulo do aplicativo.

O projeto também possui o **Gradle Wrapper**:

```text
gradlew
```

Isso permite executar o sistema de build diretamente pelo projeto, sem depender necessariamente de uma instalação global do Gradle.

---

# 7. Modificando o aplicativo

Abra:

```text
MainActivity.kt
```

Um projeto Compose pode conter código semelhante a:

```kotlin
package com.seunome.meuprimeiroapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.seunome.meuprimeiroapp.ui.theme.MeuPrimeiroAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MeuPrimeiroAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Mundo do Linux Mint!")
                }
            }
        }
    }
}

@Composable
fun Greeting(
    name: String,
    modifier: Modifier = Modifier
) {
    Text(
        text = "Olá $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MeuPrimeiroAppTheme {
        Greeting("Android")
    }
}
```

Salve:

```text
Ctrl + S
```

O Android Studio poderá recompilar ou sincronizar o projeto conforme as alterações realizadas.

---

# 8. Executando o aplicativo

Existem duas maneiras principais de executar o aplicativo.

## Opção A — Android Emulator

1. Abra o **Device Manager**.
2. Crie um dispositivo virtual.
3. Escolha um modelo de telefone.
4. Selecione uma imagem do Android disponível.
5. Inicie o dispositivo virtual.
6. Clique em **Run** (▶).

O Android Studio compilará o projeto e instalará o aplicativo automaticamente.

### Observação para o ThinkPad T420

O T420 possui hardware suficiente para o desenvolvimento Android, mas sua GPU Intel HD Graphics 3000 é antiga.

Portanto, o emulador pode apresentar desempenho inferior ao de computadores modernos.

Isso **não impede o desenvolvimento nem a geração do APK**.

---

## Opção B — Dispositivo Android físico

Esta é uma alternativa especialmente útil para testar o aplicativo diretamente em um smartphone.

No celular:

1. Abra **Configurações**.
2. Entre em **Sobre o telefone**.
3. Toque várias vezes em **Número da versão** para habilitar as opções do desenvolvedor.
4. Abra **Opções do desenvolvedor**.
5. Ative **Depuração USB**.
6. Conecte o celular ao computador por USB.
7. Autorize a depuração quando o Android solicitar.

O Android Studio deverá reconhecer o dispositivo.

Selecione o celular na lista de dispositivos e pressione:

**Run ▶**

---

# 9. Gerando o APK

Depois de desenvolver o aplicativo, podemos gerar o APK.

## 9.1. APK de Debug

O APK de debug é adequado para testes.

No Android Studio:

```text
Build
→ Build Bundle(s) / APK(s)
→ Build APK(s)
```

Também é possível utilizar o terminal.

Entre no diretório do projeto:

```bash
cd ~/AndroidStudioProjects/MeuPrimeiroApp
```

Execute:

```bash
./gradlew assembleDebug
```

O APK será criado normalmente em:

```text
app/build/outputs/apk/debug/app-debug.apk
```

---

# 10. Gerando APK Release assinado

Para distribuição real, deve-se gerar uma versão **Release** assinada.

No Android Studio:

```text
Build
→ Generate Signed Bundle / APK
```

Escolha:

```text
APK
```

Crie um novo **keystore** quando necessário.

Guarde cuidadosamente:

* arquivo `.jks`;
* alias;
* senha do keystore;
* senha da chave.

Essas informações são importantes porque a mesma chave deverá ser utilizada para futuras atualizações do aplicativo.

Selecione:

```text
release
```

e conclua o processo.

O APK de release será normalmente encontrado em:

```text
app/build/outputs/apk/release/
```

---

# 11. Android App Bundle

Também é possível gerar:

```text
.aab
```

O **Android App Bundle** é o formato normalmente utilizado para publicação na Google Play.

No Android Studio:

```text
Build
→ Generate Signed Bundle / APK
→ Android App Bundle
```

Para testes e instalação direta no aparelho, o APK continua sendo bastante útil.

---

# 12. Instalando o APK no celular

Uma maneira simples é transferir o APK para o aparelho utilizando:

* cabo USB;
* armazenamento em nuvem;
* e-mail;
* outro método de transferência.

No Android, pode ser necessário autorizar a instalação de aplicativos provenientes daquela fonte.

Depois, abra o arquivo APK e faça a instalação.

---

# 13. Instalando pelo ADB

Para utilizar o ADB, primeiro confirme que o Android SDK Platform-Tools está instalado.

Depois, conecte o celular por USB e execute:

```bash
adb devices
```

O dispositivo deverá aparecer na lista.

Para instalar o APK:

```bash
adb install caminho/do/app-debug.apk
```

Por exemplo:

```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

Se o aplicativo já estiver instalado e for necessário substituí-lo:

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

# 14. Fluxo completo do desenvolvimento

Depois que o ambiente estiver configurado, o processo básico será:

```text
Android Studio
      │
      ▼
Criar projeto Kotlin
      │
      ▼
Escrever código
      │
      ▼
Gradle
      │
      ▼
Compilar
      │
      ▼
APK Debug
      │
      ├──────────────► Testar no celular
      │
      └──────────────► Testar no emulador
      │
      ▼
Corrigir / desenvolver
      │
      ▼
Build Release
      │
      ▼
Assinar APK
      │
      ▼
APK Release
```

---

# 15. Ferramentas utilizadas

A instalação atual utiliza:

### Sistema operacional

```text
Linux Mint 22.3 Zena
Ubuntu 24.04 Noble
x86_64
```

### Java

```text
OpenJDK 17.0.19
```

Verificação:

```bash
java -version
javac -version
```

### Android Studio

```text
Android Studio 2025.2.3
```

Instalado através do PPA:

```text
ppa:maarten-fonville/android-studio
```

### Linguagem

```text
Kotlin
```

### Build system

```text
Gradle
```

### Interface

```text
Jetpack Compose
```

### Ferramentas Android

```text
Android SDK
Android SDK Platform-Tools
Android SDK Build-Tools
ADB
Android Emulator
```

---

# 16. Dicas importantes

* Utilize **OpenJDK**, evitando a necessidade de Oracle JDK.
* Nesta instalação, mantenha **Java 17** como versão padrão.
* Não instale bibliotecas 32-bit desnecessariamente.
* `libncurses5:i386` não está disponível nos repositórios padrão desta instalação do Linux Mint 22.3.
* Dependências adicionais devem ser instaladas somente quando forem efetivamente necessárias.
* Mantenha o Android Studio e o Android SDK atualizados, mas evite instalar várias versões desnecessárias do SDK.
* Faça backups do arquivo `.jks` e das respectivas credenciais.
* Nunca perca a chave utilizada para assinar um aplicativo que você pretende atualizar futuramente.
* Para projetos maiores, estude **Jetpack Compose, ViewModel, Room, Navigation, coroutines, Retrofit e arquitetura MVVM**.
* O Gradle Wrapper (`./gradlew`) deve ser preferido para compilar o projeto, pois utiliza a versão de Gradle definida pelo próprio projeto.
* O Android Studio é a opção mais conveniente para começar, embora projetos Android também possam ser compilados utilizando as ferramentas de linha de comando.
* Alternativas como Kivy e Flutter existem, mas este tutorial utiliza o desenvolvimento Android nativo com Kotlin.
