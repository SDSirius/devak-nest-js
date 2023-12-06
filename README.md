# DeVaK BackEnd

O projeto DeVaK foi concebido com o propósito de auxiliar os usuários na divulgação de seus carros a fim de vendê-los. A plataforma permite usar uma ferramenta de busca com filtros avançados, container mais vistos, menu lateral interativo, bem como adição de novos veículos, deleção (lógica apenas) e atualização dos veículos, inpactando diretamente na responsividade do menu lateral e nas consultas dos veículos (mais vistos).

### O Devak foi desenvolvido como uma vitrine de carros, onde o usuário divulga seu produto, transações seriam feitas por fora da plataforma.

### Site modelo:

```bash
https://www.kavak.com/br/seminovos

```

## Tecnologias Utilizadas

O projeto DeVaK utiliza as seguintes tecnologias:

- Node          20.3.1
- Nest.js       10.0.0
- AWS-s3        3.441.0
- Multer        1.4.5-lts.1
- Passport-JWT  4.0.1
- Mongoose      7.6.3

## Funcionalidades

- Cadastro, atualização e autenticação de usuários.
- Cadatsro, busca, atualização e deleção lógica dos veículos.

## Como Usar

#
### Configuração do ambiente de desenvolvimento
```bash
# Clonar o repositório:
git clone https://github.com/SDSirius/devak-nest-js

# Conta no Banco de dados:
Faça uma conta no site MongoDB.com.br, crie um cluster (ou use um compartilhado) e crie um Banco de dados dentro dele
 
# Congigure as variaveis:
fazer uma copia do arquivo `.env.example` e renomear o novo arquivo de `.env`, e configurar as variáveis de ambiente no arquivo `.env` 


### DATABASE_URL
Cole aqui a url de comunicação com seu Banco de dados, lembrando de especificar a senha correta no lugar certo ( substitua <password> pela sua senha ).

### ENV_PORT 
Configure a porta padrão de comunicação do Backend


### USER_CYPHER_SECRET_KEY 
Crie uma senha para criptografar seus dados

### USER_JWT_SECRET_KEY 
Crie uma senha para o JWT poder criptografar

## Serviço AWS-S3
### AWS_ACCESS_KEY_ID
Cole aqui sua ID AWS para Fazer referencia a sua conta Amazon-Web-Services

### AWS_SECRET_ACCESS_KEY 
Cole aqui sua senha de acesso para dar acesso ao programa ao fazer o upload das imagens que subirão ( usuários e carros )

### AWS_BUCKET_NAME 
Selecione o nome do Bucket onde subirá as imagens dentro do S3 da AWS

### AWS_REGION
Cole aqui a região onde está localizado seu Bucket da AWS ( se você configurou São Paulo, provavelmente será "sa-east-1" mas é bom confirmar nas configurações do seu Bucket )

### CAR_FOLDER_NAME
Crie um nome para pasta onde serão armazenadas as fotos dos carros ( ex: /Carros )

### USER_FOLDER_NAME
Crie um nome para pasta onde serão armazenadas as fotos dos usuários ( ex: /Usuarios)


#  instale as dependencias do projeto 
npm install ou npm i

# Executar o projeto
 npm run start:dev

# Execução
Agora só esperar os serviços iniciarem e conectar o FrontEnd, Disponível em https://github.com/SDSirius/devak-react-js
```

#
### Autor:
* **Sergio Daniel Farina**