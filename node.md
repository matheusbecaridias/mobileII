# Node.js

O **Node.js** é um ambiente de execução que permite executar código JavaScript fora do navegador, sendo amplamente utilizado para desenvolver aplicações back-end, APIs e serviços web.

---

# Verificando a instalação

Antes de iniciar um projeto, verifique se o Node.js e o npm estão instalados.

```bash
node -v
```

Exibe a versão instalada do Node.js.

Exemplo:

```text
v22.18.0
```

---

```bash
npm -v
```

Exibe a versão do **npm (Node Package Manager)**, o gerenciador de pacotes oficial do Node.js.

Exemplo:

```text
10.8.2
```

---

# Criando um projeto

## Inicialização interativa

```bash
npm init
```

Cria um arquivo chamado **package.json**.

Durante a execução, o npm fará perguntas como:

- Nome do projeto
- Versão
- Descrição
- Autor
- Licença
- Arquivo principal

Ao final será criado:

```
package.json
```

Esse arquivo contém todas as informações do projeto.

---

## Inicialização automática

```bash
npm init -y
```

Cria o mesmo arquivo **package.json**, porém utilizando todas as configurações padrão.

É o comando mais utilizado durante a disciplina.

---

# Instalando dependências

As dependências são bibliotecas externas utilizadas pelo projeto.

## Instalar todas as dependências

```bash
npm install
```

ou

```bash
npm i
```

Quando existe um arquivo **package.json**, este comando instala todas as bibliotecas listadas nele.

---

## Instalar Express

```bash
npm install express
```

Instala o framework **Express**, utilizado para criação de servidores e APIs REST.

Exemplo:

```javascript
const express = require("express");

const app = express();

app.listen(3000);
```

---

## Instalar dotenv

```bash
npm install dotenv
```

Permite utilizar variáveis de ambiente armazenadas em um arquivo **.env**.

Exemplo:

```
PORT=3000
DB_HOST=localhost
```

No código:

```javascript
require("dotenv").config();

console.log(process.env.PORT);
```

---

## Instalar CORS

```bash
npm install cors
```

Permite que aplicações Front-End e Back-End possam se comunicar quando estão em origens diferentes.

Exemplo:

```javascript
const cors = require("cors");

app.use(cors());
```

---

## Instalar mysql2

```bash
npm install mysql2
```

Biblioteca utilizada para conectar aplicações Node.js ao banco de dados MySQL.

Exemplo:

```javascript
const mysql = require("mysql2");
```

---

## Instalar bcrypt

```bash
npm install bcrypt
```

Biblioteca utilizada para criptografar senhas.

Nunca armazene senhas em texto puro.

Exemplo:

```javascript
const bcrypt = require("bcrypt");
```

---

## Instalar JSON Web Token

```bash
npm install jsonwebtoken
```

Biblioteca utilizada para autenticação baseada em tokens (JWT).

Muito utilizada em APIs REST.

Exemplo:

```javascript
const jwt = require("jsonwebtoken");
```

---

# Dependências de desenvolvimento

Algumas bibliotecas são utilizadas apenas durante o desenvolvimento.

## Nodemon

```bash
npm install nodemon --save-dev
```

ou

```bash
npm i -D nodemon
```

O Nodemon reinicia automaticamente o servidor sempre que um arquivo é alterado.

Sem o Nodemon:

Sempre que modificar um arquivo será necessário executar novamente:

```bash
node index.js
```

Com o Nodemon:

O servidor reinicia automaticamente.

---

# Executando a aplicação

## Executar diretamente

```bash
node app.js
```

ou

```bash
node index.js
```

Executa o arquivo informado.

Normalmente o arquivo principal chama-se:

- index.js
- app.js
- server.js

---

## Executar usando scripts

```bash
npm start
```

Executa o script chamado **start** definido no arquivo **package.json**.

Exemplo:

```json
"scripts": {
    "start": "node index.js"
}
```

---

## Executar em modo desenvolvimento

```bash
npm run dev
```

Executa o script **dev**.

Exemplo:

```json
"scripts": {
    "dev": "nodemon index.js"
}
```

É o modo recomendado durante o desenvolvimento.

---

# Gerenciamento de pacotes

## Listar dependências

```bash
npm list
```

Mostra todas as bibliotecas instaladas no projeto.

---

## Verificar atualizações

```bash
npm outdated
```

Mostra quais bibliotecas possuem versões mais recentes.

---

## Atualizar dependências

```bash
npm update
```

Atualiza automaticamente as bibliotecas instaladas.

---

## Remover pacote

```bash
npm uninstall nome-do-pacote
```

Exemplo:

```bash
npm uninstall express
```

Remove a biblioteca do projeto.

---

# Scripts do package.json

O arquivo **package.json** possui uma seção chamada **scripts**.

Exemplo:

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
}
```

Isso permite executar comandos mais simples.

Ao invés de escrever:

```bash
node index.js
```

basta executar:

```bash
npm start
```

Ou, para desenvolvimento:

```bash
npm run dev
```

Também é possível criar scripts personalizados.

Exemplo:

```json
"scripts": {
    "test": "node testes.js",
    "limpar": "rm -rf node_modules"
}
```

Executando:

```bash
npm run test
```

ou

```bash
npm run limpar
```

---

# Testando APIs com cURL

O **cURL** é uma ferramenta do terminal para realizar requisições HTTP sem utilizar programas como Postman ou Insomnia.

---

## Requisição GET

```bash
curl http://localhost:3000
```

Envia uma requisição GET para o servidor.

Equivale a abrir o endereço:

```
http://localhost:3000
```

no navegador.

---

## Requisição POST

```bash
curl -X POST http://localhost:3000/usuarios \
-H "Content-Type: application/json" \
-d '{"nome":"João"}'
```

Explicando cada parte:

| Comando | Função |
|----------|--------|
| `curl` | Executa uma requisição HTTP. |
| `-X POST` | Define o método HTTP POST. |
| `-H` | Adiciona um cabeçalho (Header). |
| `Content-Type: application/json` | Informa que os dados enviados estão no formato JSON. |
| `-d` | Envia os dados da requisição (Body). |

O servidor receberá:

```json
{
    "nome": "João"
}
```

---

# Estrutura típica de um projeto Node.js

```
meu-projeto/
│
├── node_modules/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
│
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

---

# Boas práticas

- Utilize sempre o comando `npm init -y` para iniciar novos projetos.
- Nunca envie a pasta `node_modules` para o GitHub.
- Armazene senhas e configurações sensíveis em um arquivo `.env`.
- Utilize `nodemon` durante o desenvolvimento.
- Mantenha as dependências atualizadas.
- Faça testes nas APIs utilizando `curl`, Postman ou Insomnia.
- Organize o código em módulos (controllers, models e routes) para facilitar a manutenção.
