# Códigos WhatsApp --- Projeto React Native

> Documento organizado a partir do PDF enviado. O conteúdo dos códigos
> foi mantido conforme aparece no documento, com separação por
> projeto/arquivo e versões repetidas identificadas quando aplicável.

------------------------------------------------------------------------

## 1. To-Do List --- React Native

### 1.1 Código principal --- primeira versão

``` jsx
import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';

export default function App() {
  const [task, setTask] = useState(''); // guarda o texto digitado
  const [tasks, setTasks] = useState([]); // guarda a lista de tarefas

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]); // adiciona a nova tarefa na lista
      setTask(''); // limpa o campo de texto
    }
  };

  const clearTasks = () => {
    setTasks([]); // limpa todas as tarefas
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>To-Do List</Text>

          <TextInput
            label="Nova tarefa"
            mode="outlined"
            value={task}
            onChangeText={setTask}
            style={styles.input}
          />

          <Button mode="contained" onPress={addTask} style={styles.button}>
            Adicionar
          </Button>

          <Button mode="outlined" onPress={clearTasks} style={styles.button}>
            Limpar tudo
          </Button>
        </Card.Content>
      </Card>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <Card.Content>
              <Text>{item}</Text>
            </Card.Content>
          </Card>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  card: {
    marginBottom: 20,
    padding: 10,
  },

  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  input: {
    marginBottom: 15,
  },

  button: {
    marginTop: 10,
  },

  list: {
    marginTop: 10,
  },

  taskCard: {
    marginTop: 8,
  },
});
```

### 1.2 To-Do List --- versão apresentada posteriormente

``` jsx
import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant='titleLarge' style={styles.title}>To-do List</Text>

          <TextInput
            label='Nova Tarefa'
            mode='outlined'
            value={task}
            onChangeText={setTask}
            style={styles.input}
          />

          <Button mode='contained' onPress={addTask} style={styles.button}>
            Adicionar
          </Button>

          <Button mode='outlined' onPress={clearTasks} style={styles.button}>
            Limpar tudo
          </Button>
        </Card.Content>
      </Card>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <Card.Content>
              <Text>{item}</Text>
            </Card.Content>
          </Card>
        )}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  card: {
    marginBottom: 20,
    padding: 10,
  },

  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  input: {
    marginBottom: 15,
  },

  button: {
    marginTop: 10,
  },

  list: {
    marginTop: 10,
  },

  taskCard: {
    marginTop: 8,
  },
});
```

------------------------------------------------------------------------

## 2. Exemplo básico de estilos --- React Native

### 2.1 Código

``` jsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

export default function app () {
  return (
    <View style={estilos.container}>
      <StatusBar barStyle="dark-content" background="#f0f0f0"/>

      <Text style={estilos.titulo}> Ola, Alunos. Welcome!</Text>

      <Text style={estilos.textoComum}>
        Este texto usa cores definidas no Estilo
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    background: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },

  textoComum: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  }
});
```

### 2.2 Textos exibidos

-   **Ola, Alunos. Welcome!**
-   **Este texto usa cores definidas no Estilo**

------------------------------------------------------------------------

## 3. Estrutura do projeto --- Cesta

A estrutura mostrada no documento é:

``` text
Project
├── assets
│   ├── abacate.jpg
│   ├── banana.jpg
│   ├── bicolor.jpg
│   ├── frutasfeira.jpg
│   ├── Imagem de fundo feira.jpg
│   └── logo.jpg
├── components
├── src
│   └── Telas
│       └── cesta.js
├── README.md
├── App.js
└── package.json
```

------------------------------------------------------------------------

## 4. `App.js` --- Projeto Cesta

``` jsx
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Cesta from './src/Telas/cesta'; // ou ./src/Telas/Cesta, conforme o nome do arquivo
import {Dimensions} from 'react-native';

export default function App() {
  return (
    <View style={estilos.container}>
      <Cesta />
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', // deixa a imagem no topo
  },
});
```

> Observação: o documento apresenta o import de `Dimensions` no
> `App.js`, embora ele não seja utilizado nesse trecho.

------------------------------------------------------------------------

## 5. `package.json` --- dependências apresentadas

O trecho do documento mostra:

``` json
{
  "dependencies": {
    "expo-status-bar": "~3.0.9",
    "@expo/vector-icons": "^15.0.3",
    "react-native-paper": "4.9.2"
  }
}
```

------------------------------------------------------------------------

## 6. `src/Telas/cesta.js`

### 6.1 Código completo

``` jsx
import React from 'react';
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native';

import bicolor from '../../assets/bicolor.jpg';
import logo from '../../assets/logo.jpg';

const { width, height } = Dimensions.get('window');

export default function Cesta() {
  return (
    <View style={estilos.topo}>
      <Image
        source={bicolor}
        style={estilos.imagemBicolor}
        resizeMode="cover"
      />

      {/* Texto de topo que fica sobreposto à imagem */}
      <Text style={estilos.texto}>Detalhe da Cesta</Text>

      <View style={estilos.cesta}>
        <Text style={estilos.titulo}>Cesta de Verduras</Text>

        {/* View com flex row para alinhar a logo ao lado do texto */}
        <View style={estilos.fazenda}>
          <Image source={logo} style={estilos.imagemFazenda} />
          <Text style={estilos.nomeFazenda}>Jenny Jack Farm</Text>
        </View>

        <Text style={estilos.frase}>
          Uma cesta com produtos selecionados cuidadosamente da fazenda direto para sua
          cozinha
        </Text>

        <Text style={estilos.preco}>R$ 40,00</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  topo: {
    width: '100%',
  },

  imagemBicolor: {
    width: width,
    height: height * 0.3,
  },

  texto: {
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 26,
    color: '#fff',
    fontWeight: 'bold',
    padding: 16,
  },

  cesta: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  titulo: {
    fontSize: 26,
    lineHeight: 42,
    color: '#464646',
    fontWeight: 'bold',
  },

  fazenda: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  imagemFazenda: {
    width: 32,
    height: 32,
  },

  nomeFazenda: {
    color: '#464646',
    fontSize: 16,
    lineHeight: 26,
    marginLeft: 12,
  },

  frase: {
    color: '#A3A3A3',
    fontSize: 16,
    lineHeight: 26,
  },

  preco: {
    color: '#2A9F85',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 42,
    marginTop: 8,
  },
});
```

------------------------------------------------------------------------

## 7. Conteúdo visual da tela Cesta

A tela apresentada no documento contém:

-   Imagem de fundo: `bicolor.jpg`
-   Título sobreposto: **Detalhe da Cesta**
-   Título principal: **Cesta de Verduras**
-   Fazenda: **Jenny Jack Farm**
-   Logo: `logo.jpg`
-   Descrição: \> Uma cesta com produtos selecionados cuidadosamente da
    fazenda direto para sua cozinha
-   Preço: **R\$ 40,00**

------------------------------------------------------------------------

## 8. Arquivos e recursos mencionados

  Arquivo/recurso                      Função indicada no documento
  ------------------------------------ --------------------------------------
  `App.js`                             Componente principal do projeto
  `src/Telas/cesta.js`                 Tela/componente da cesta
  `assets/bicolor.jpg`                 Imagem usada no topo
  `assets/logo.jpg`                    Logo da fazenda
  `assets/abacate.jpg`                 Imagem disponível nos assets
  `assets/banana.jpg`                  Imagem disponível nos assets
  `assets/frutasfeira.jpg`             Imagem disponível nos assets
  `assets/Imagem de fundo feira.jpg`   Imagem disponível nos assets
  `README.md`                          Arquivo de documentação
  `package.json`                       Configuração/dependências do projeto

------------------------------------------------------------------------

## 9. Resumo dos exemplos

### To-Do List

Funcionalidades apresentadas:

1.  Digitar uma nova tarefa.
2.  Adicionar a tarefa à lista.
3.  Exibir as tarefas com `FlatList`.
4.  Limpar todas as tarefas.
5.  Utilizar componentes do `react-native-paper`, como `TextInput`,
    `Button` e `Card`.

### Exemplo de estilos

Funcionalidades apresentadas:

1.  Criar estilos com `StyleSheet.create`.
2.  Centralizar elementos.
3.  Definir cor de fundo.
4.  Definir tamanho e cor de textos.
5.  Configurar a `StatusBar`.

### Cesta de Verduras

Funcionalidades apresentadas:

1.  Exibir uma imagem no topo.
2.  Sobrepor texto à imagem.
3.  Apresentar título e descrição da cesta.
4.  Exibir logo e nome da fazenda.
5.  Exibir preço.
6.  Organizar elementos com `flexDirection: 'row'`.
7.  Usar `Dimensions.get('window')` para dimensionar a imagem.
