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

## Funcionalidades

- Cadastro, atualização e autenticação de usuários.
- Cadatsro, busca, atualização e deleção lógica dos veículos.

## Como Usar

#
### Configuração do ambiente de desenvolvimento
```bash
# clonar o repositório 
git clone https://github.com/SDSirius/devak-nest-js
 
# Congigure as variaveis
fazer uma copia do arquivo `.env.example` e renomear o novo arquivo de `.env.local`, e configurar as variáveis de ambiente no arquivo `.env.local` 

#  instale as dependencias do projeto 
npm install

# Executar o projeto
 npm run start:dev
```

#
### Autor:
* **Sergio Daniel Farina**
