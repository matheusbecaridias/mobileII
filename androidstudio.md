# Tutorial completo: criando um aplicativo Android do zero até o APK no Linux Mint

Este tutorial apresenta um caminho completo para desenvolver um aplicativo Android nativo no **Linux Mint**, utilizando ferramentas gratuitas e, sempre que possível, de código aberto.

O processo utiliza:

* **Android Studio** — IDE oficial para desenvolvimento Android;
* **OpenJDK 17** — ambiente Java utilizado pelo projeto;
* **Gradle** — sistema de automação de build;
* **Kotlin** — linguagem principal;
* **Android SDK** — ferramentas e bibliotecas Android;
* **Android Emulator** — para testes em dispositivo virtual;
* **ADB** — para comunicação com dispositivos Android;
* **Jetpack Compose** — para construção moderna da interface.

O procedimento foi adaptado para um computador com:

* Linux Mint;
* Ubuntu 24.04 (Noble) como base;
* arquitetura x86_64;
* processador Intel;
* Android Studio instalado através do PPA;
* OpenJDK 17.

---

# 1. Preparação do sistema

## 1.1 Atualizar o sistema

Abra o Terminal:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 1.2 Instalar o OpenJDK 17

Instale o Java utilizado pelo ambiente de desenvolvimento:

```bash
sudo apt install -y openjdk-17-jdk openjdk-17-jre
```

Verifique:

```bash
java -version
```

E:

```bash
javac -version
```

O resultado esperado é semelhante a:

```text
openjdk version "17.0.x"
javac 17.0.x
```

### Observação sobre versões diferentes do Java

Caso o sistema possua simultaneamente Java 17 e Java 21, `java` e `javac` podem acabar apontando para versões diferentes.

Verifique:

```bash
which java
which javac
```

E:

```bash
readlink -f "$(which java)"
readlink -f "$(which javac)"
```

Se necessário, selecione o Java 17:

```bash
sudo update-alternatives --config java
```

Escolha:

```text
/usr/lib/jvm/java-17-openjdk-amd64/bin/java
```

Depois confirme:

```bash
java -version
javac -version
```

Os dois devem apontar para Java 17.

---

# 2. Instalação do Android Studio

Existem duas maneiras principais de instalar o Android Studio no Linux Mint.

Neste tutorial, será utilizado o **PPA de Maarten Fonville**, pois ele permite uma instalação integrada ao sistema através do APT.

## 2.1 Instalar `software-properties-common`

```bash
sudo apt install software-properties-common -y
```

---

## 2.2 Adicionar o PPA do Android Studio

```bash
sudo add-apt-repository ppa:maarten-fonville/android-studio -y
```

Atualize as informações dos repositórios:

```bash
sudo apt update
```

---

## 2.3 Instalar o Android Studio

```bash
sudo apt install android-studio -y
```

O pacote instalará o Android Studio e fará o download da versão correspondente disponível no PPA.

A instalação pode baixar mais de 1 GB, portanto o processo pode demorar dependendo da velocidade da conexão.

---

# 3. Primeira execução do Android Studio

Depois da instalação, abra o Android Studio pelo menu de aplicativos do Linux Mint.

Também é possível localizar o executável através do sistema.

Na primeira execução, o Android Studio apresenta o assistente de configuração.

Selecione:

```text
Standard
```

Aceite as licenças solicitadas.

Permita que o Android Studio instale os componentes necessários do SDK.

Entre os componentes estarão:

* Android SDK;
* Android SDK Platform;
* Android SDK Build-Tools;
* Android SDK Platform-Tools;
* Android Emulator;
* ferramentas adicionais necessárias ao desenvolvimento.

A instalação inicial pode consumir vários gigabytes de armazenamento.

---

# 4. Configuração da virtualização para o Android Emulator

O Android Emulator utiliza aceleração de hardware para funcionar adequadamente.

Em computadores Intel, a tecnologia necessária é **Intel VT-x**.

No Linux, essa virtualização é disponibilizada através do **KVM (Kernel-based Virtual Machine)**.

Se o Android Studio apresentar uma mensagem semelhante a:

```text
/dev/kvm is not found.

Enable VT-x in your BIOS security settings,
ensure that your Linux distro has working KVM module.
```

é necessário verificar a virtualização antes de tentar solucionar problemas no Android Studio.

---

## 4.1 Verificar se o Linux detecta VT-x

Execute:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

Em um processador Intel com VT-x disponível, o resultado deverá ser maior que:

```text
0
```

Se aparecer:

```text
0
```

o Linux não está detectando a extensão de virtualização.

---

# 5. Habilitar Intel VT-x no BIOS/UEFI

Reinicie o computador:

```bash
sudo reboot
```

Durante a inicialização, pressione repetidamente:

```text
F1
```

para entrar no BIOS/UEFI.

Procure uma seção semelhante a:

```text
Security
```

e, dentro dela, uma configuração relacionada a:

```text
Virtualization
```

ou:

```text
Intel Virtualization Technology
```

Configure:

```text
Intel Virtualization Technology → Enabled
```

Não confunda essa configuração com outras tecnologias de virtualização, como VT-d.

Depois salve as alterações, normalmente através de:

```text
F10
```

e confirme.

O computador será reiniciado.

---

# 6. Verificar o KVM no Linux

Depois que o Linux Mint iniciar novamente, verifique:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

O resultado agora deve ser maior que zero.

Em um processador com múltiplas threads, o comando poderá apresentar um número correspondente ao número de processadores lógicos.

---

## 6.1 Verificar `/dev/kvm`

Execute:

```bash
ls -l /dev/kvm
```

O resultado esperado será semelhante a:

```text
crw-rw----+ 1 root kvm ... /dev/kvm
```

Se aparecer:

```text
ls: não foi possível acessar '/dev/kvm': Arquivo ou diretório inexistente
```

o KVM ainda não está disponível.

---

## 6.2 Verificar os módulos KVM

Execute:

```bash
lsmod | grep kvm
```

Em um sistema Intel, normalmente aparecerá algo semelhante a:

```text
kvm_intel
kvm
```

---

## 6.3 Instalar o `kvm-ok`

Instale:

```bash
sudo apt install -y cpu-checker
```

Depois execute:

```bash
kvm-ok
```

O resultado esperado é:

```text
INFO: /dev/kvm exists
KVM acceleration can be used
```

Quando essas condições forem satisfeitas, o Android Emulator poderá utilizar aceleração KVM.

---

# 7. Criando o primeiro projeto

Abra o Android Studio.

Na tela inicial:

```text
New Project
```

Selecione:

```text
Phone and Tablet
```

Depois:

```text
Empty Activity
```

O modelo **Empty Activity** utiliza Jetpack Compose e é uma boa opção para iniciar um projeto Android moderno.

---

## 7.1 Configuração do projeto

Utilize, por exemplo:

```text
Name:
MeuPrimeiroApp
```

Package name:

```text
com.seunome.meuprimeiroapp
```

Escolha uma pasta de projeto, por exemplo:

```text
~/AndroidStudioProjects
```

Configure:

```text
Language:
Kotlin
```

Escolha a versão mínima do Android conforme o público-alvo do aplicativo.

Por exemplo:

```text
Minimum SDK:
API 24
```

ou uma versão superior.

Para a linguagem de configuração do Gradle:

```text
Kotlin DSL
```

é uma escolha recomendada.

Clique em:

```text
Finish
```

O Gradle fará a sincronização e poderá baixar várias dependências.

A primeira sincronização pode demorar.

---

# 8. Estrutura básica do projeto

No painel **Project**, a estrutura principal será semelhante a:

```text
app/
└── src/
    └── main/
        ├── java/
        │   └── ...
        │       └── MainActivity.kt
        │
        └── res/
```

Os principais arquivos são:

```text
MainActivity.kt
```

Código principal da Activity.

```text
app/build.gradle.kts
```

Configurações de build do módulo do aplicativo.

```text
res/
```

Recursos do aplicativo.

Projetos modernos utilizando Compose podem concentrar grande parte da interface diretamente nos arquivos Kotlin.

---

# 9. Primeiro código em Kotlin + Jetpack Compose

Abra:

```text
MainActivity.kt
```

Um exemplo simples é:

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

O Android Studio poderá recompilar automaticamente o projeto.

---

# 10. Executando o aplicativo

Existem duas maneiras principais de testar o aplicativo:

1. Android Emulator;
2. dispositivo Android físico.

---

# 11. Opção A — Android Emulator

No Android Studio abra:

```text
Tools → Device Manager
```

ou utilize o ícone correspondente na interface.

Selecione:

```text
Create Virtual Device
```

Escolha um dispositivo, por exemplo:

```text
Small Phone
```

ou outro modelo compatível.

Escolha uma imagem do Android.

Por exemplo:

```text
API 37.1
x86_64
```

Baixe a imagem caso ela ainda não esteja instalada.

Depois crie o dispositivo virtual.

---

## 11.1 Iniciar o AVD

No Device Manager, clique em:

```text
Start
```

ou no botão de execução correspondente.

Com o KVM corretamente configurado, o emulador poderá utilizar aceleração de hardware.

---

## 11.2 Caso apareça `/dev/kvm is not found`

Execute novamente:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

Depois:

```bash
ls -l /dev/kvm
```

Depois:

```bash
lsmod | grep kvm
```

E:

```bash
kvm-ok
```

O estado ideal é:

```text
vmx > 0
```

```text
/dev/kvm existe
```

```text
kvm_intel
kvm
```

e:

```text
KVM acceleration can be used
```

---

# 12. Executar o aplicativo no emulador

Depois que o AVD estiver funcionando:

1. Abra o projeto;
2. Selecione o dispositivo virtual na barra superior;
3. Clique no botão:

```text
Run ▶
```

ou pressione:

```text
Shift + F10
```

O Android Studio irá:

1. compilar o aplicativo;
2. iniciar o Gradle;
3. gerar o APK de teste;
4. iniciar o emulador;
5. instalar o aplicativo;
6. executar o aplicativo.

---

# 13. Opção B — dispositivo Android físico

Também é possível testar diretamente em um smartphone.

No Android:

```text
Configurações
→ Sobre o telefone
```

Toque aproximadamente sete vezes em:

```text
Número da versão
```

até habilitar as opções de desenvolvedor.

Depois entre em:

```text
Opções do desenvolvedor
```

e habilite:

```text
Depuração USB
```

Conecte o smartphone ao computador utilizando USB.

Quando o Android perguntar se deseja autorizar a depuração USB, aceite.

---

# 14. Verificar o dispositivo com ADB

O Android SDK Platform-Tools fornece o `adb`.

Verifique:

```bash
adb version
```

Depois:

```bash
adb devices
```

Um dispositivo conectado deverá aparecer semelhante a:

```text
List of devices attached
XXXXXXXX    device
```

Se aparecer:

```text
unauthorized
```

desbloqueie o celular e aceite a autorização de depuração USB.

---

# 15. Gerando o APK de Debug

Depois de desenvolver o aplicativo, podemos gerar o APK.

No Android Studio:

```text
Build
→ Build Bundle(s) / APK(s)
→ Build APK(s)
```

Também é possível fazer pelo terminal.

Entre na pasta do projeto:

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

# 16. Instalar o APK diretamente pelo ADB

Com o telefone conectado:

```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

Se o APK já estiver instalado e for necessário substituí-lo:

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

---

# 17. Gerando APK Release assinado

Para distribuir o aplicativo, utilize uma versão de release assinada.

No Android Studio:

```text
Build
→ Generate Signed Bundle / APK
```

Selecione:

```text
APK
```

Crie um novo keystore caso ainda não tenha um.

O arquivo de keystore deve ser guardado com segurança.

As informações necessárias para assinar o aplicativo incluem:

* localização do keystore;
* senha;
* alias;
* senha do alias.

**Não perca o keystore.**

Para atualizações futuras do aplicativo, a mesma identidade de assinatura deverá ser preservada.

Escolha:

```text
release
```

e conclua o processo.

O APK será colocado normalmente em:

```text
app/build/outputs/apk/release/
```

---

# 18. Android App Bundle

Também é possível gerar um:

```text
.aab
```

através de:

```text
Build
→ Generate Signed Bundle / APK
→ Android App Bundle
```

O Android App Bundle é o formato utilizado para distribuição pela Google Play.

---

# 19. Instalação manual do APK

Para transferir o APK para o telefone, pode-se utilizar:

* USB;
* armazenamento local;
* e-mail;
* nuvem;
* ADB.

Depois de transferido, abra o APK no dispositivo.

Dependendo da versão do Android, pode ser necessário permitir:

```text
Instalar apps desconhecidos
```

para o aplicativo utilizado para abrir o APK.

---

# 20. Fluxo completo de desenvolvimento

Depois que todo o ambiente estiver configurado, o ciclo normal de desenvolvimento será:

```text
Criar projeto
      ↓
Escrever código Kotlin
      ↓
Construir interface com Jetpack Compose
      ↓
Sincronizar Gradle
      ↓
Executar no Emulator ou celular
      ↓
Testar
      ↓
Corrigir código
      ↓
Testar novamente
      ↓
Gerar APK Debug
      ↓
Testar versão final
      ↓
Gerar APK Release assinado
```

---

# 21. Comandos principais

### Verificar Java

```bash
java -version
```

```bash
javac -version
```

### Verificar VT-x

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

### Verificar KVM

```bash
ls -l /dev/kvm
```

```bash
lsmod | grep kvm
```

### Verificar aceleração

```bash
kvm-ok
```

### Verificar ADB

```bash
adb devices
```

### Compilar APK Debug

```bash
./gradlew assembleDebug
```

### Instalar APK

```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

---

# 22. Próximas etapas do desenvolvimento

Depois de conseguir criar, executar e gerar o primeiro APK, o próximo passo é aprender progressivamente:

1. Kotlin;
2. Jetpack Compose;
3. Material 3;
4. navegação entre telas;
5. gerenciamento de estado;
6. ViewModel;
7. armazenamento local;
8. Room;
9. consumo de APIs;
10. permissões Android;
11. notificações;
12. arquivos e armazenamento;
13. testes;
14. geração de APK Release;
15. Android App Bundle.

Para projetos maiores, uma arquitetura baseada em:

```text
UI
↓
ViewModel
↓
Repository
↓
Data Source
```

é uma boa evolução em relação ao primeiro aplicativo.

---

# 23. Observações importantes

## Java

Utilize o **OpenJDK**, preferencialmente a versão compatível com a versão do Android Studio e do Gradle utilizada pelo projeto.

Neste ambiente, o OpenJDK 17 foi configurado e validado.

## Android Studio

O Android Studio é gratuito para desenvolvimento Android.

A instalação deste tutorial utiliza o PPA:

```text
ppa:maarten-fonville/android-studio
```

## Emulator

O Android Emulator pode ser pesado para computadores mais antigos.

A utilização de **KVM + Intel VT-x** é importante para obter aceleração adequada.

Em computadores com recursos limitados, testar diretamente em um dispositivo Android físico pode ser uma alternativa mais leve.

## Dependências 32-bit

A tentativa inicial de instalar:

```bash
libncurses5:i386
```

não é necessária neste ambiente e pode resultar em:

```text
E: Impossível encontrar o pacote libncurses5:i386
```

Portanto, não é necessário incluir esse pacote na instalação básica deste tutorial.

O próprio pacote do Android Studio instalado pelo PPA apresentou como sugestões:

```text
libc6-i386
lib32z1
```

Essas dependências podem ser instaladas posteriormente somente se algum componente específico exigir.

---

# 24. Objetivo final

Ao completar este tutorial, o ambiente estará preparado para:

```text
Linux Mint
    ↓
OpenJDK 17
    ↓
Android Studio
    ↓
Android SDK
    ↓
Kotlin
    ↓
Gradle
    ↓
Jetpack Compose
    ↓
Android Emulator / smartphone físico
    ↓
APK Debug
    ↓
APK Release assinado
```

A partir daqui, o desenvolvimento pode deixar de ser apenas um teste de ambiente e passar para a construção efetiva do aplicativo Android.
