# Linkr

## Instalação

1. Clone este repositório back-end
2. Instale as dependências:
```bash
npm i
```
3. Crie um banco de dados PostgreSQL com o nome de sua preferência utilizando o arquivo dump.sql
3. Crie um arquivo .env na raiz do projeto e defina as variáveis de ambiente conforme exemplo abaixo: 
```bash
PORT=5001 //a porta padrão deste projeto é 5000, porém aquie você pode escolher a porta de sua preferência. 
DATABASE_URL=postgres://SeuUsuario:SuaSenha@localhost:PortaDoPostgreSql/nomeDB // connection string do seu banco de dados
```
5. Rode o back-end através do comando:
```bash
npm start
```
6. Seu servidor estará em execucução. Caso queira rodar juntamento com o front-end, clone o repositório front-end disponível em https://github.com/mmagalhaesjr/projeto-frontend-linkr e siga as intruções para executá-lo
