// import pool
const pg = require("pg");
const Pool = pg.Pool;

// save database information under pool
const pool = new Pool({
  database: "weekend-to-do-app",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
});

// if the database is connected, console.log that it's connected
pool.on("connect", () => {
  console.log("Connected to Postgresql pool");
});

// if the database couldn't connect, console.log the error
pool.on("error", (error) => {
  console.log("Error with Postgresql pool:", error);
});

// exports the pool
module.exports = pool;
