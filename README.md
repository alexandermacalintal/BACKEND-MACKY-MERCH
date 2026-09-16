# Macky Merch API

## Setup Instructions

**1. Install dependencies**

```bash
npm install
nvm install 22
nvm use 22
```

**2. Configure environment**
Create a `.env.development.local` file in the project root with:

```
PORT=3000
NODE_ENV=development
```

(The api falls back to sensible defaults port 3000, development mode even if this file is missing.)

**3. Set up the database**
No manual setup is needed `db.js` automatically creates `macky-merch.db` and runs `schema.sql` against it the first time the server starts.

**4. Run the server**

```bash
npm run dev    # with nodemon
npm start      # plain node
```

Server runs at `http://localhost:3000`.

**5. Run tests**

```bash
npm test
```

Runs the Vitest suite (6 tests) against an in-memory database.

**6. (Optional) Run with Docker**

```bash
docker build -t macky-merch-api .
docker run -p 3000:3000 macky-merch-api
```

## Architectural Explanation

**Folder structure:**

```
routes/        -> maps URLs + HTTP methods to controller functions
controllers/    -> actual logic that talks to the database, builds responses
middleware/     -> validation and centralized error handling
config/         -> environment variable loading
```

I decided to organize my code by separating the routes, controllers and middleware into different folders instead of creating them all in one file. As a result, each component now fulfills one particular task: routes provide mapping of *what* endpoint corresponds to *what* function, controllers provide the *logic* for the function, and middleware takes care of cross-cutting concerns (validation, errors). It is easy to locate any part of the code without having an impact on the others, as well as keep the `app.js` clean and simple.

**Why SQLite:** I chose SQLite over a client-server database like MySQL/PostgreSQL because it does not require me to install/configure any additional database server. Instead, SQLite consists of a file, which was easier for me to set up. Although SQLite is still a real database that persists information, its use allowed me to see the exact content of each query through the use of a lightweight driver (`better-sqlite3`), raw SQL, and parameterized queries (`?`).

## Challenges Faced

One of my hurdles were returning to backend programming after 2 years required me to refresh some of my knowledge about server-side logic, which eventually caused a problem when performing updates in the database. The problem was when updating the product, sending a partial payload had the undefined fields becoming null, hence overwriting the database records with null values.
I had to modify the logic behind updateProduct in my controller to first fetch the database record and then merge it with the updated record so that if there are any undefined properties in the request body, the database values are used instead

## Bonus Features Implemented

- **Containerization** - a working `Dockerfile` (and `.dockerignore`) to run the API in an isolated container.
