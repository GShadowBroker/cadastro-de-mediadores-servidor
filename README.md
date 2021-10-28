# BackEnd Cadastro Nacional de Mediadores NodeJS

Backend para cadastro nacional de contas para mediadores e câmaras de mediação.

## Tecnologias
- NodeJS e Express
- Banco de dados PostgreSQL
- Sequelize ORM
- Node Cron e Node Mailer e SendGrid para confirmação de e-mail e recuperação de senhas
- Autenticação e autorização por tokens JWT

## Instalação

Para instalar, basta clonar o repositório

```bash
git clone https://github.com/GShadowBroker/cadastro-de-mediadores-servidor
```
Acessar a pasta e instalar dependências 
```bash
cd cadastro-de-mediadores-servidor && npm install
```
Criar arquivo .env e inserir variáveis do ambiente:

- BASE_URL: Url base do servidor
- CLIENT_URL: Front-end
- DATABASE_URL: Url com credenciais do banco de dados PosgreSQL
- FROM_EMAIL_ADDRESS: E-mail sob o qual serão enviados os e-mails
- JWT_SECRET: Segredo usado para assinar os tokens
- RECAPTCHA_SERVER_KEY: Key para validar Recatcha do Google
- SENDGRID_API_KEY: Key do SendGrid para envio de e-mails

## API:

### GET /      
### GET    /api/user
### POST    /api/autenticacao/login  
### GET /api/autenticacao/logout
### POST /api/autenticacao/registrar/mediador
### POST /api/autenticacao/registrar/camara
### POST /api/esqueci_minha_senha/mediador
### POST /api/esqueci_minha_senha/camara
### POST /api/esqueci_minha_senha/nova_senha
### POST /api/autenticacao/validar_email/mediador/{{user_id}}/{{verification_code}}
### POST /api/autenticacao/validar_email/camara/{{user_id}}/{{verification_code}}
### GET /api/camaras
### GET /api/camaras/{{id}}
### GET /api/camaras/{{id}}/visualizar_estatuto
### GET /api/camaras/{{id}}/visualizar_nada_consta
### GET /api/mediadores
### GET /api/mediadores/{{id}}
### GET /api/mediadores/{{id}}/visualizar_anexo

## License
[MIT](https://choosealicense.com/licenses/mit/)
