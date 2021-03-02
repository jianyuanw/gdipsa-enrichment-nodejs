const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { query } = require("express");

const PORT = parseInt(process.env.PORT) || 3000;

// Configure database
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT) || 3306;
const DB_USER = process.env.DB_USER || "pebbles";
const DB_PASSWORD = process.env.DB_PASSWORD || "pebbles";
const DB_SCHEMA = process.env.DB_SCHEMA || "leisure";

// SQL queries
const SQL_SELECT_GENRES = "SELECT DISTINCT(genre) FROM genres";
const SQL_SELECT_TV_SHOWS_BY_GENRE = `SELECT tv_shows.tvid, name FROM tv_shows
JOIN genres ON tv_shows.tvid = genres.tvid
WHERE genre = ?`;
const SQL_SELECT_TV_DETAILS_BY_TVID = "SELECT * FROM tv_shows WHERE tvid = ?";

const pool = mysql.createPool({
  host: DB_HOST,
  pool: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  connectionLimit: 4,
});

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(cors());

// GET /api/genres
app.get("/api/genres", async (req, res) => {
  // Get a connection from the pool
  const conn = await pool.getConnection();

  // Perform the query --> query() returns an array of 2 elements
  // 0 - array of your data, 1 - metadata of the result
  try {
    const [result, _] = await conn.query(SQL_SELECT_GENRES);
    res
      .status(200)
      .type("application/json")
      .json(result.map((v) => v["genre"]));
  } catch (err) {
    console.error("ERROR:");
    console.dir(err);
    res.status(500).type("application/json").json({ error: err });
  } finally {
    conn.release();
  }
});

// GET /api/genre/:genre
app.get("/api/genre/:genre", async (req, res) => {
  const genre = req.params.genre.trim();
  if (!genre) {
    res
      .status(400)
      .type("text/plain")
      .send("Error processing request. Please try again.");
  } else {
    const conn = await pool.getConnection();

    try {
      const [result, _] = await conn.query(SQL_SELECT_TV_SHOWS_BY_GENRE, [
        genre,
      ]);
      res.status(200).type("application/json").json(result);
    } catch (err) {
      console.error("ERROR:");
      console.dir(err);
      res.status(500).type("application/json").json({ error: err });
    } finally {
      conn.release();
    }
  }
});

// GET /api/tvshow/:tvid
app.get("/api/tvshow/:tvid", async (req, res) => {
  const tvid = parseInt(req.params.tvid.trim());
  if (!tvid) {
    res
      .status(400)
      .type("text/plain")
      .send("Error processing request. Please try again.");
  } else {
    const conn = await pool.getConnection();

    try {
      const [result, _] = await conn.query(SQL_SELECT_TV_DETAILS_BY_TVID, [
        tvid,
      ]);

      if (result.length == 0) {
        res
          .status(404)
          .type("application/json")
          .json({ error: `tvid ${tvid} not found` });
        return;
      }

      res.status(200).type("application/json").json(result[0]);
    } catch (err) {
      console.error("ERROR:");
      console.dir(err);
    } finally {
      conn.release();
    }
  }
});

// Start application
const startApp = async (app, pool) => {
  // Check out a connection
  const conn = await pool.getConnection();
  try {
    // Ping
    await conn.ping();
    // Release connection back to the pool
    conn.release();
    // If ping successful, start application
    app.listen(PORT, () => {
      console.log(
        `Application started on port ${PORT}. Timestamp: ${new Date().toLocaleString()}`
      );
    });
  } catch (err) {
    console.log("Error:", err);
    process.exit(-1);
  }
};

startApp(app, pool);
