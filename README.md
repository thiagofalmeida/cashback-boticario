# Desafio – “Eu revendedor ‘O Boticário’ quero ter benefícios de acordo com o meu volume de vendas”.

O desafio é criar um sistema para seus revendedores(as) cadastrarem suas compras e acompanhar o retorno de cashback de cada um.

# Sobre o projeto

- A aplicação foi desenvolvida utilizando NodeJS, com [TypeScript](https://www.typescriptlang.org/).
- O framework escolhido para utilizar foi o [Express](https://github.com/expressjs/express).
- Foi utilizado o ORM [TypeORM](https://typeorm.io/#/) para efetuar as ações que envolvem banco de dados, ele foi escolhido principalmente pela integração que ele tem com o TypeScript.
- Para os desenvolvimento dos testes foi utilizado o framework de testes [Jest](https://github.com/facebook/jest).
- A autenticação dos usuários na aplicação é feita com JWT utilizando a lib [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
- Para garantir a integridade dos dados enviados nos requests foi utilizado o middleware [Celebrate](https://github.com/arb/celebrate).
- Para consumir dados da API externa do Boticário foi utilizado o cliente HTTP [Axios](https://github.com/axios/axios).
- Durante o desenvolvido com o fim de manter o código padronizado foi utilizado as ferramentas [EditorConfig](https://editorconfig.org/), [Eslint](https://eslint.org/) e [Prettier](https://prettier.io/).

A aplicação foi desenvolvida pensando no `DDD (Domain Driven Design)` que são boas práticas a serem utilizadas ao longo do desenvolvimento, onde cada domínio é responsável por uma parte diferente da aplicação.
Com isso em mente foi separado em três módulos, `users`, `orders` e `cashback`, onde cada módulo tem suas próprias responsabilidades.

# Preparando ambientes

## Pré-requisitos

- Node (versão utilizada no desenvolvimento `14.15.0`)
- Yarn ou NPM
- Postgres (versão utilizada no desenvolvimento `13.0`)

## Configurações locais

Duplicar ou renomear o arquivo `.env.example` para `.env` e preencher conforme as configurações locais. Para facilitar o próprio `.env.example` já possui valores padrões que podem ser utilizados.

Criar base de dados com o mesmo nome especificado no arquivo de configuração de variáveis de ambiente `.env`

Obs.: São duas bases uma para a aplicação e outra para os testes.

# Instalação

## Dependências

Navegue até a pasta da aplicação e use um gerenciador de pacotes de sua preferência (npm, yarn, etc.) para instalar todas as dependências.

```bash
npm install
```
ou
```bash
yarn
```

## Migrações

Para criar as tabelas do banco de dados utilize o seguinte comando.

```bash
yarn typeorm migration:run
```
ou
```bash
npm typeorm migration:run
```

# Uso

Para executar esse projeto utilize o seguinte comando.

```bash
yarn dev:server
```
ou

```bash
npm dev:server
```
## Rotas da aplicação

Para facilitar é possível encontrar na aplicação um arquivo json chamado `app_routes_insomnia.json` [aqui](https://github.com/thiagofalmeida/cashback-boticario/blob/main/src/utils/app_routes_insomnia.json).
Para utilizar ele basta baixar essa aplicação [Insomnia Rest](https://insomnia.rest/download/)  e importar o arquivo nela, feito isso todos os requests estarão configurados.

Aqui está alguns detalhes de cada rota.

|Endpoint| Método|Parâmetros|Descrição|
|--|--|--|--|
|/users | post| { name: "..." , cpf: "..." , email: "..." , password: "..." } | Cadastrar um novo usuário na aplicação
|/auth | post | { email: ... , password: ... }| Autentica um usuário na aplicação
|/orders | get | sem parâmetros | Lista todas as vendas efetuadas na aplicação
|/orders | post | {	cpf: "...", "price": ... , "date": "...", "code": ... } | Cadastra uma nova venda
|/cashback?cpf=...| get | número do CPF | Consulta o acumulado de cashback até o momento na API do Boticário e soma com o cashback de suas vendas

## Testes

Para executar os testes da aplicação utilize o seguinte comando.

<h4 align="center">
  ⚠️ Antes de rodar os testes, crie um banco de dados com o nome definido no arquivo de variáveis de ambiente para que todos os testes possam executar corretamente ⚠️
</h4>

```bash
yarn jest
```
ou
```bash
npm jest
```
