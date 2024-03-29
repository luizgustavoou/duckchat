# Duckchat
<!-- license --> 

## :memo:  Sobre o projeto
A aplicação consiste em uma cópia do Discord, trazendo funcionalidades básicas da plataforma como a conversa por chat.

## Layout web

![duckchat-sample-signin](https://github.com/luizgustavoou/duckchat/assets/89609312/4551e3e9-7f37-4032-801d-b4496d942c8b)
![duckhat-sample-signup](https://github.com/luizgustavoou/duckchat/assets/89609312/b8fc6897-8b56-4db3-b23b-c0e9cb198d1d)



https://github.com/luizgustavoou/duckchat/assets/89609312/0e02b24e-82bd-49f3-be7a-289c08783abc



https://github.com/luizgustavoou/duckchat/assets/89609312/39e02d39-338d-49a8-b35c-279dd7b0c859









<!--
## Modelo conceitual
![Modelo Conceitual](https://github.com/acenelio/assets/raw/main/sds1/modelo-conceitual.png)
-->
## :books: Funcionalidades
* <b>Autenticação</b>;
* <b>Adicionar amigos</b>;
* <b>Chat</b>;
* <b>Editar perfil</b>

# :wrench: Tecnologias utilizadas
## Back end
* NestJS;
* Typeorm;
* MySQL
  
## Front end
* React
* Redux
* Tailwind CSS
* Radix-ui
* Shadcn-ui
<!--## Implantação em produção
- Back end: Heroku
- Front end web: Netlify
- Banco de dados: Postgresql -->

## Infraestrutura
* Docker;

## :rocket: Rodando o projeto
Pré-requisitos: npm / yarn e Docker instalado

```bash
# clonar repositório
git clone https://github.com/luizgustavoou/duckchat.git

# entrar na pasta do projeto front end web
cd duckchat

cd duckchat-api/

# instalar depedências do backend
npm i

cd ../

cd duckchat-front/

# instalar depedências do frontend
npm i
cd ../

# rodar aplicação
docker compose up -d
```

## :soon: Implementação futura
* [FRONT] Acionar efeito sonoro quando chega mensagem nova;
* [FRONT] Permitir o usuario enviar  imagens nas mensagens de chat;
* [FRONT] Criar uma tela para admin;
* [FRONT] Implementar refresh token;
* [FRONT] Refatorar a exibição do perfil de usuario com foto, nome por meio de um componente; 
* [BACK] Analisar relacionamento de tabelas para ver se há necesisdade de criar uma tabela de solicitaçao de amizade;
* [BACK] Brincar com um serviço de E-mail enviando uma mensagem ao criar uma conta com sucesso. Para isso, adicionar uma coluna 'email' na entidade User;
- [BACK] Validar rotas com base nos papéis de usuários (common/adm).

## :dart: Status do projeto
Finalizado

# Autor

Luiz Gustavo de Oliveira Umbelino
[https://www.linkedin.com/in/wmazoni](https://www.linkedin.com/in/luiz-oliveira-802294294/)https://www.linkedin.com/in/luiz-oliveira-802294294/
Joab Urbano

