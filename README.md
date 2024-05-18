# Duckchat

## :memo: About the Project
Duckchat is an application inspired by Discord, providing basic features similar to the platform, such as real-time chat, using a design that resembles Discord.

## Web Layout

![duckchat-sample-signin](https://github.com/luizgustavoou/duckchat/assets/89609312/4551e3e9-7f37-4032-801d-b4496d942c8b)
![duckhat-sample-signup](https://github.com/luizgustavoou/duckchat/assets/89609312/b8fc6897-8b56-4db3-b23b-c0e9cb198d1d)

https://github.com/luizgustavoou/duckchat/assets/89609312/0e02b24e-82bd-49f3-be7a-289c08783abc

https://github.com/luizgustavoou/duckchat/assets/89609312/39e02d39-338d-49a8-b35c-279dd7b0c859

## :books: Features
* **Authentication**
* **Add Friends**
* **Chat**
* **Edit Profile**

## :wrench: Technologies Used
### Backend
* NestJS
* TypeORM
* MySQL

### Frontend
* React
* Redux
* Tailwind CSS
* Radix-ui
* Shadcn-ui

## Infrastructure
* Docker

## :rocket: Running the Project
Prerequisites: npm / yarn and Docker installed

```bash
# clone the repository
git clone https://github.com/luizgustavoou/duckchat.git

# navigate to the project directory
cd duckchat

cd duckchat-api/

# install backend dependencies
npm i

cd ../

cd duckchat-front/

# install frontend dependencies
npm i

cd ../

# run the application
docker compose up -d
```

## :soon: Future Implementations
* [FRONT] Add sound effect for new messages;
* [FRONT] Allow users to send images in chat messages;
* [FRONT] Create an admin screen;
* [FRONT] Implement refresh token;
* [FRONT] Refactor user profile display to include photo and name via a component;
* [BACK] Analyze table relationships to determine if a friend request table is needed;
* [BACK] Experiment with an email service to send a message upon successful account creation. To do this, add an 'email' column to the User entity;
* [BACK] Validate routes based on user roles (common/admin).

## :dart: Project Status
Completed

## Author

Luiz Gustavo de Oliveira Umbelino
[LinkedIn](https://www.linkedin.com/in/luiz-oliveira-802294294/)
Joab Urbano
