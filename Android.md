**Tutorial completo: Criando um aplicativo Android do zero até o APK no Linux Mint (apenas ferramentas gratuitas/open-source)**

Vamos usar o **Android Studio** (IDE oficial e gratuita da Google) + **OpenJDK**, **Gradle** e **Kotlin**. Esses componentes formam o stack padrão e mais usado para desenvolvimento Android nativo. Muitos elementos (Kotlin, Gradle, SDK tools, parte do Android Open Source Project) são open-source. Não usaremos ferramentas proprietárias pagas.

O processo funciona perfeitamente no Linux Mint (baseado em Ubuntu/Debian).

### 1. Preparação do sistema

Abra o Terminal e atualize o sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

Instale as dependências necessárias:

```bash
sudo apt install -y openjdk-17-jdk openjdk-17-jre
```

Verifique o Java:

```bash
java -version
```

(Deve mostrar OpenJDK 17 ou superior.)

### 2. Instalação do Android Studio

**Método recomendado (oficial e limpo):**

1. Acesse o site oficial: [https://developer.android.com/studio](https://developer.android.com/studio)
2. Baixe a versão **Linux (64-bit)** (arquivo `.tar.gz`).
3. Extraia e instale:

```bash
cd ~/Downloads
sudo tar -xzf android-studio-*-linux.tar.gz -C /opt
```

4. Crie um atalho de lançamento (opcional, mas útil):

```bash
sudo ln -s /opt/android-studio/bin/studio.sh /usr/local/bin/android-studio
```

5. Inicie o Android Studio:

```bash
android-studio
```

(ou `/opt/android-studio/bin/studio.sh`)

**Método alternativo via PPA (mais fácil de atualizar via APT):**

```bash
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:maarten-fonville/android-studio -y
sudo apt update
sudo apt install android-studio -y
```

Na primeira execução o Assistente de Configuração aparece. Escolha:
- **Standard** installation
- Aceite os termos de licença
- Deixe baixar o Android SDK, Platform-Tools, Build-Tools e um system image para o emulador (recomendado API 34 ou 35).

Isso pode demorar bastante (depende da internet). Aguarde terminar.

### 3. Criando o primeiro projeto

1. Na tela de boas-vindas clique em **New Project**.
2. Na aba **Phone and Tablet** selecione **Empty Activity** (recomendado — usa Jetpack Compose, o padrão moderno).
3. Configure:
   - **Name**: MeuPrimeiroApp (ou o nome que quiser)
   - **Package name**: com.seunome.meuprimeiroapp (use o padrão reverso de domínio)
   - **Save location**: escolha uma pasta (ex.: `~/AndroidStudioProjects`)
   - **Language**: **Kotlin**
   - **Minimum SDK**: API 24 (Android 7.0) ou superior (API 26+ é seguro)
   - Build configuration language: **Kotlin DSL** (recomendado)
4. Clique em **Finish**.

O Gradle vai sincronizar e baixar dependências (primeira vez demora).

### 4. Entendendo a estrutura básica e modificando o app

No painel **Project** (lado esquerdo) você verá:

- `app/src/main/java/.../MainActivity.kt` → código principal
- `app/src/main/res/` → recursos (layouts, strings, imagens)
- `app/build.gradle.kts` → configurações do módulo

Abra `MainActivity.kt`. Com Compose o código típico fica parecido com isto (você pode alterar o texto):

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
                Surface(modifier = Modifier.fillMaxSize(), color = MaterialTheme.colorScheme.background) {
                    Greeting("Mundo do Linux Mint!")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
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

Salve o arquivo (Ctrl+S).

### 5. Executando o aplicativo

**Opção A – Emulador (recomendado para começar)**  
1. Clique no ícone do **Device Manager** (ou Tools → Device Manager).  
2. Crie um Virtual Device (ex.: Pixel 6 ou 7 com system image Google APIs).  
3. Clique no botão verde **Run** (▶) ou Shift+F10.  
O emulador inicia e instala o app automaticamente.

**Opção B – Dispositivo físico**  
1. No celular: Configurações → Sobre o telefone → toque 7 vezes em “Número da versão” para ativar **Opções do desenvolvedor**.  
2. Ative **Depuração USB**.  
3. Conecte o cabo USB e autorize o computador.  
4. No Android Studio o dispositivo aparece na lista. Clique em Run.

### 6. Gerando o arquivo APK

**APK de Debug (rápido, para testes):**

- Menu **Build → Build Bundle(s) / APK(s) → Build APK(s)**  
- Ou no terminal, dentro da pasta do projeto:

```bash
./gradlew assembleDebug
```

O APK fica em:  
`app/build/outputs/apk/debug/app-debug.apk`

**APK assinado de Release (para distribuição real):**

1. **Build → Generate Signed Bundle / APK**
2. Escolha **APK**
3. Crie um novo keystore (guarde bem a senha e o arquivo `.jks` — você precisará dele para atualizações futuras)
4. Preencha os dados e escolha o build type **release**
5. Clique em Finish

O APK assinado fica em `app/build/outputs/apk/release/`.

Você também pode gerar um **Android App Bundle (.aab)** (formato preferido pela Play Store) no mesmo menu.

### 7. Instalando o APK no celular

- Transfira o arquivo `.apk` para o celular (USB, e-mail, nuvem, etc.)
- No celular ative “Fontes desconhecidas” / “Instalar apps desconhecidos” para o gerenciador de arquivos
- Toque no APK e instale

Via ADB (mais profissional):

```bash
adb install caminho/do/app-debug.apk
```

### Dicas importantes

- Sempre use o **OpenJDK** (não Oracle JDK pago).
- Mantenha o Android Studio e o SDK atualizados (Help → Check for Updates e SDK Manager).
- Para projetos maiores, aprenda Jetpack Compose, ViewModel, Room, Navigation, etc.
- Se quiser evitar a IDE pesada no futuro, é possível trabalhar só com as **Command-line tools** + Gradle + editor de texto (Vim, VS Code, etc.), mas o Android Studio é muito mais produtivo no início.
- Alternativas 100% open-source mais “puras” (menos Google): frameworks como **Kivy** (Python) ou desenvolvimento com **Flutter** (também gratuito), mas o caminho nativo com Kotlin + Android Studio continua sendo o mais recomendado e profissional.
