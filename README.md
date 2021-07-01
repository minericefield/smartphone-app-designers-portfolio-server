# smartphone-app-designers-portfolio-server

Learning theme of NestJS.

## Development

#### API
1. `$ git clone https://github.com/minericefield/smartphone-app-designers-portfolio-server`
2. `$ cd smartphone-app-designers-portfolio-server`
3. `$ docker-compose up -d --build`
4. `$ docker-compose run --rm server yarn seed:dev`

#### Client
1. `$ git clone https://github.com/minericefield/smartphone-app-designers-portfolio-client`
2. `$ cd smartphone-app-designers-portfolio-client`
3. `$ yarn install`
4. `$ yarn serve`
5. Access to `http://localhost:8080`

#### Login to Admin Console
1. Access to `http://localhost:3000`
2. You can login with
    - Email: `admin@example.com`
    - Password: `Password1234_`

## Features
- Display designs added by Admin Console.
- Invite new admins with authority.

## Cores
- Vue3
- Composition api
- NestJS
