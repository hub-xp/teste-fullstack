<<<<<<< HEAD
# Book Reviews Platform

## Overview

This project is a "Book Reviews" platform that allows users to browse and review books. It is built using Next.js for the frontend and connects to a NestJS backend with a MongoDB database.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: NestJS, MongoDB
- **Data Fetching**: React Query

## Features

- CRUD functionality for books and reviews
- Display of top-rated books
- Responsive design using Tailwind CSS
- Optimistic UI updates for adding reviews

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:

   ```
   git clone <your-repo-url>
   cd book-reviews-frontend
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Create a `.env` file based on the `.env.example` file and fill in the necessary environment variables.

### Running the Application

To start the development server, run:

```
pnpm dev
```

The frontend will be available at `http://localhost:3000`.

### Directory Structure

- `app/`: Contains the main application files and pages.
- `components/`: Contains reusable React components.
- `hooks/`: Custom hooks for data fetching.
- `utils/`: Utility functions for API calls.
- `public/`: Static assets like images and icons.
- `tailwind.config.js`: Configuration for Tailwind CSS.
- `postcss.config.js`: Configuration for PostCSS.
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.

## Running Tests

To run tests, use:

```
pnpm test
```

## Documentation

For detailed API documentation, refer to the backend repository.

## Contributing

Feel free to submit issues or pull requests. Please ensure your code adheres to the project's coding standards.

## License

This project is licensed under the MIT License.
=======
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Book Reviews Backend

## Local Development

### Prerequisites

- Node.js (v18+ recommended)
- pnpm
- MongoDB (local or Docker)

### Setup

1. Install dependencies:
   ```powershell
   pnpm install
   ```
2. Create a `.env` file based on `.env.example` and set your MongoDB URI.
3. Start the backend server:
   ```powershell
   pnpm run start:dev
   ```
   The server will run on http://localhost:3001 by default (set PORT in .env to change).

### Scripts

- `pnpm run lint` – Lint code
- `pnpm run format` – Format code
- `pnpm run test` – Run all tests
- `pnpm run test:e2e` – Run e2e tests

### Docker (optional)

To run MongoDB with Docker:

```powershell
docker run --name mongo -p 27017:27017 -d mongo
```

## Environment Variables

See `.env.example` for required variables.
>>>>>>> back/master
