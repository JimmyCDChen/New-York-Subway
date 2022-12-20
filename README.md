<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">New York City Subway System </h2>
</div>

## About The Project

There are a lot of section that goes into creating a production grade NodeJS application. In this repository I tried to gather as much as possible. This is an ExpressJS application with the following features.

- Typescript all the way
- EsLint, Prettier and Husky integration
- Docker
- Sequelize integration
- Logging
- Error handling in a central place
- Request Validation
- Dependency Injection
- Setting up Testing

<p align="right">(<a href="#top">back to top</a>)</p>

## Technologies

The major technologies that were used to build this project are:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Postgresql](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Here goes the instructions to get the project up and running.

### Prerequisites

To run this project You will need the following things installed on your machine

- NodeJS
- NPM
- Docker

Run the following command to install them if you don't already have it.

```
brew install node docker
```

### Run with Docker

It's super simple. If you already have Docker installed and running on your machine you can just run

```sh
docker-compose up
```

It will give you 3 things

1. The Express server in development mode (With hot reloading support)
2. A PostgreSQL database server. The credentials are listed below.

```sh
DB_HOST = database-layer;
DB_NAME = dbname;
DB_USER = dbuser;
DB_PASSWORD = dbpassword;
```

3. A Database investigation tool named `Adminer` (You can inspect any kind of database from the browser) You can access it from `http://localhost:8080`

## Project Structure

If you want to add a new route then you will goto `/routes` folder and add a new Router.
Then register that router in the `index.ts` file under the `/routes` folder.

Then you will create a Controller under the `/controllers` directory.All business logics should go into there.

Specific use cases should be handles by Service classes under the `/service` folder.

All Database related things should go under `/repositories` folder.

To create a new model for data base look into the `/models` folder.

<p align="right">(<a href="#top">back to top</a>)</p>

## API Endpoints
| HTTP Verbs | Endpoints | Query | Action |
| --- | --- | --- | --- |
| GET | /train-line | | To retrieve all trains. |
| POST | /train-line | fare=[number] | To create a new train line, and will also set up new stations. Fare represents the cost to take this train. |
| GET | /station | | To retrieve all stations. |
| POST | /station/[station]/enter | | To enter a station and this action will charge fare to the providing card, and returns the remaining balance on the card. |
| POST | /station/[station]/exit | | To exit a station and this action will return the remaining balance on the card provided. |
| POST | /route | origin=[string], destination=[string]| To give shortest path between origin and desination station |
| GET | /card | | To retrieve all cards. |
| POST | /card | | To create a new card or refill an existing card with the provided amount. |

<p align="right">(<a href="#top">back to top</a>)</p>

## Testing

The recommened API testing tool is [Postman](https://www.postman.com/), and after installing Postman, you can import 
```
src/New_York_Subway.postman_colleciton.json
```
to start testing the API. The Postman collection provides the initial setup and API path for testing.

## Imported Library Sources

Credit to the following repositories on importing or getting started

- [Mohammad-Faisal/professional-express-sequelize-docker-boilerplate](https://github.com/Mohammad-Faisal/professional-express-sequelize-docker-boilerplate) for providing the ExpressJS Boilerplate for this application.
- [dranidis/floyd-warshall-shortest](https://github.com/dranidis/floyd-warshall-shortest) for finding the shortest path between stations.

<p align="right">(<a href="#top">back to top</a>)</p>