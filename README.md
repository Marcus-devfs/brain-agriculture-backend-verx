Brain Agriculture - Backend API

API RESTful para gerenciamento das propostas de crédito rural, construída com Node.js, Express e PostgreSQL.
Faz parte do desafio técnico para a Brain Agriculture.
🚀 Sobre o projeto

Esta API é responsável por fornecer os endpoints para cadastro, listagem, edição e exclusão de propostas de crédito rural.
Utiliza Express.js como framework web e Sequelize com PostgreSQL como banco de dados relacional.

🛠️ Tecnologias utilizadas

Node.js
Express.js
PostgreSQL
Sequelize ORM (com suporte a TypeScript via sequelize-typescript)
Docker + Docker Compose para containerização
TypeScript
Jest + Supertest para testes automatizados
📦 Estrutura e dependências principais

express — servidor HTTP
sequelize + sequelize-typescript — ORM para banco PostgreSQL
pg — driver PostgreSQL
dotenv — variáveis de ambiente
cors — suporte a CORS
typescript, ts-node, ts-jest — suporte e testes com TypeScript
jest, supertest — testes automatizados
🐳 Docker & Docker Compose

O backend e banco de dados PostgreSQL rodam containerizados usando Docker Compose.

Arquivo docker-compose.yml:

version: '3.8'

services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: brain_ag
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: .
    depends_on:
      - db
    ports:
      - '3000:3000'
    environment:
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: brain_ag
      DB_HOST: db
      DB_PORT: 5432
      PORT: 3000
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  pgdata:
O backend expõe a porta 3000 e conecta ao banco PostgreSQL pelo serviço db dentro da rede Docker.
⚙️ Como rodar a aplicação


🔐 Proxy reverso e HTTPS com Nginx
A aplicação backend está protegida por HTTPS via certificado gratuito da Let’s Encrypt, usando Certbot para a emissão e renovação automática do certificado.

O Nginx está configurado como proxy reverso para rotear as requisições externas do domínio público para o serviço backend Node.js que roda dentro do Docker na porta 3000.

Principais pontos da configuração:

Domínio: brain-agriculture-backend.duckdns.org (DNS dinâmico via DuckDNS)
Proxy reverso Nginx escuta na porta 80 e 443 (HTTP/HTTPS)
Certificado SSL gerenciado pelo Certbot/Let's Encrypt
Redirecionamento automático de HTTP para HTTPS
Proxy para http://localhost:3000 (porta do backend Node.js)
Isso garante uma camada segura (HTTPS) para o consumo da API, mesmo rodando dentro de containers Docker e em instância EC2.

Pré-requisitos
Docker e Docker Compose instalados na máquina
Porta 3000 livre (para o backend)
Porta 5432 livre (para o banco, se não usar outro container)
Rodando com Docker Compose (recomendado)
Na raiz do projeto, rode:

docker-compose up --build
Isso vai iniciar os containers do banco e do backend automaticamente. A API estará disponível em:

http://localhost:3000
Rodando localmente (sem Docker)
Instale as dependências:
npm install
# ou
yarn install
Configure as variáveis de ambiente no arquivo .env ou .env.local, por exemplo:
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=brain_ag
DB_HOST=localhost
DB_PORT=5432
PORT=3000
Execute a aplicação em modo desenvolvimento:
npm run dev
# ou
yarn dev
📋 Scripts úteis

npm run dev — roda o backend em modo desenvolvimento (usando ts-node)
npm run build — compila TypeScript para JavaScript na pasta dist
npm start — executa o backend compilado (executa dist/server.js)
npm test — roda testes, sobe container PostgreSQL temporário, executa testes e para o container
🧪 Testes

Os testes usam Jest + Supertest. Para rodar:

npm run test
O script sobe um container PostgreSQL temporário chamado pg-test para testes, depois para e remove.

📍 Deploy

O backend está configurado para rodar em uma instância Amazon EC2 com Docker, exposto na porta 3000 do IP público da máquina.

URL acesso à API:

https://brain-agriculture-backend.duckdns.org
📝 Considerações finais

Este backend é a API para o frontend Brain Agriculture, seguindo boas práticas de desenvolvimento com TypeScript, testes automatizados e containerização.
Fico à disposição para dúvidas ou melhorias!