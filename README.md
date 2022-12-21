<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">New York City Subway System </h2>
</div>

## About The Project

There are a lot of sections that go into creating a production grade NodeJS application. In this repository I tried to gather as much as possible. This is an ExpressJS application with the following features.

- Typescript all the way
- EsLint, Prettier and Husky integration
- Docker
- Sequelize integration
- Logging
- Swagger
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

### Tech decision 

Upon the project's base requirement (Typescript, Postgres and Docker) to run the application, I also decided to adopt and learn some new technologies during this project. In my background, I had not used NodeJS and Express as a backend server, nor have I used Sequelize for ORM. In my search for tech decisions, they came to be very popular technologies/frameworks and are very well supported. Thus, I decided to give them a try. Although in a production setting, I would normally have raised a discussion through the RFC proposal for team inputs before making a final tech choice. 

For database ORM, I used Sequelize. Sequelize is a feature-rich ORM for modern Node.js and TypeScript, it supports PostgreSQL (with JSON and JSONB support), MySQL, MariaDB, SQLite, MS SQL Server, Snowflake, Oracle DB (v6), DB2 and DB2 for IBM i. Therefore, should we decide to switch to another database type, we could easily do so without much transition. 

Also, I decided to start off the project from an ExpressJS Boilerplate with Typescript+Docker+Sequelize integration repo as I came across it from my research. You can find the reference repo in the [library source](#imported-library-sources) below. Yet, I had to modify a few parts so this project is better set up for testing. Much thanks and kudos to the repo author.

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

## Key Assumptions

This New York Subway project is yet production ready due to missing the following implementation in each of the below areas. However, due to the nature of a take home assignment with time constraint, I've decided to implement the MVP project at where it stands now. There is more recommended work in these area to make it production ready. 

- Scaling
- Security
- Logging
- Monitoring
- More comprehensive tests in each structure area
- API documentation with Swagger

**At this moment, this project is designed for single application use.**

### Scaling

For scaling, there are potential issues where we could face in the current design. This project has yet to implement work to handle many requests in scale and distributed systems. 

For example, in Challenge-2, one of the requirements is to calculate the correct remaining balance given a unique card. We have yet to implement procedures to ensure data correctness. One solution is to implement a mutex lock so cards have correct balance when used.

Recommended TODO: 
- Implement mutex lock for data writing.
- Implement precomputed train-station fare maps for performance.
- Implement caching technology to improve performance.
- Implement monitoring for critical components performance such as database, docker containers.

There are other infrastructure we could adopt to make this application truly scalable such as `load balancer`, `cache service`, `cloud storage`, `event queue` etc.

### Security 

In a client facing application, we should always implement some authentication for user validation. 

Recommended TODO:
- Implement API authentication for request clients if needed.
- Implement more validation on edge cases.
- Check returned error message so no PII data is not revealed.

### Logging

There are millions of potential New York City card transaction daily, and it is verbose to record every single transaction in logs

Recommended TODO:
- Record each API call to tracing.
- Record more timestamps for events and transactions for traceability.
- Better error logging with more traces.

### Testing

The current test coverage is not high yet, but the key area where our business logic lives is covered. In a production environment, we should ideally have more tests for all structures as well, for normal use cases and also edge cases. 

Recommend TODO:
- Add test for routing test.
- Add test for data operation repository.
- Add test for model entity.
- Add test for controller.
- Add Integration tests for spinning up the project, and database tests.

Also, this project is mainly set up with one environment in mind. Ideally a production ready platform should consist of a sandbox, stage and production specific environment setting.

### API documentation

Ideally we can use swagger for complete API doc set up, so users/developers can easily understand each of our API. For now, it's only short handed to the [API table](#api-endpoints) below. 

<p align="right">(<a href="#top">back to top</a>)</p>

## Project Structure

If you want to add a new route then you will goto `/routes` folder and add a new Router.
Then register that router in the `index.ts` file under the `/routes` folder.

Then you will create a Controller under the `/controllers` directory.All business logics should go into there.

Specific use cases should be handled by Service classes under the `/service` folder.

All Database related things should go under the `/repositories` folder.

To create a new model for the database look into the `/models` folder.

<p align="right">(<a href="#top">back to top</a>)</p>

## API Endpoints
| HTTP Verbs | Endpoints | Query | Action |
| --- | --- | --- | --- |
| GET | /train-line | | To retrieve all trains. |
| POST | /train-line | fare=[number] | To create a new train line, and will also set up new stations. Fare represents the cost to take this train. |
| GET | /station | | To retrieve all stations. |
| POST | /station/[station]/enter | | To enter a station, this action will charge fare to the providing card, and returns the remaining balance on the card. |
| POST | /station/[station]/exit | | To exit a station, this action will return the remaining balance on the card provided. |
| POST | /route | origin=[string], destination=[string]| To give shortest path between origin and destination station |
| GET | /card | | To retrieve all cards. |
| POST | /card | | To create a new card or refill an existing card with the provided amount. |

<p align="right">(<a href="#top">back to top</a>)</p>

## Testing

The recommended API testing tool is [Postman](https://www.postman.com/), and after installing Postman, you can import 
```
src/New_York_Subway.postman_colleciton.json
```
to start testing the API. The Postman collection provides the initial setup and API path for testing.

## Imported Library Sources

Credit to the following repositories on importing or getting started

- [Mohammad-Faisal/professional-express-sequelize-docker-boilerplate](https://github.com/Mohammad-Faisal/professional-express-sequelize-docker-boilerplate) for providing the ExpressJS Boilerplate for this application.
- [dranidis/floyd-warshall-shortest](https://github.com/dranidis/floyd-warshall-shortest) for finding the shortest path between stations.

<p align="right">(<a href="#top">back to top</a>)</p>



