## Trying out a new stack

- Doing awesome stuff using:
    * Next.js
    * PostgreSQL
    * GraphQL
        - Apollo Server
        - Apollo Client
    * Prisma
    * TailwindCSS
    * Nexus

* using Prisma boilerplate as starter

- npm i
- use .env file and define a PostgreSQL db in a DATABASE_URL environment variable

- npm run initial-seed to seed initial data in the db
    initial data provided in /data/links
    seeding function in /prisma/seed
    !!! prisma v3+ requires prisma object in package.json
        - the seed key defines the details of how the seeding command from prisma cli shoud be run
