# Node.js

## Verificando instalação

```bash
node -v
npm -v
```

## Criando projeto

```bash
npm init
npm init -y
```

## Instalação de dependências

```bash
npm install
npm install express
npm install dotenv
npm install cors
npm install mysql2
npm install bcrypt
npm install jsonwebtoken
```

## Dependências de desenvolvimento

```bash
npm install nodemon --save-dev
```

## Executando

```bash
node app.js
node index.js
npm start
npm run dev
```

## Gerenciamento

```bash
npm list
npm outdated
npm update
npm uninstall pacote
```

## Scripts

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

## Testando APIs

### GET

```bash
curl http://localhost:3000
```

### POST

```bash
curl -X POST http://localhost:3000/usuarios \
-H "Content-Type: application/json" \
-d '{"nome":"João"}'
```
