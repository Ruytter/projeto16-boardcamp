import { connection } from "../database/database.js";

export async function getGames(req, res) {
  try {
    const { rows } = await connection.query("SELECT * FROM games;");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getGameByName(req, res) {
  const { name } = req.params;
  name = name.toUpperCase();

  try {
    const { rows } = await connection.query(
      "SELECT * FROM games WHERE name LIKE $1%;",
      [name]
    );

    if (rows.length === 0) {
      return res.status(404);
    }

    res.send(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function insertGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    const category = await connection.query(
      "SELECT * FROM categories WHERE id=$1;",
      [categoryId]
    );
    if (
      category.rows.length === 0 ||
      name.length === 0 ||
      pricePerDay <= 0 ||
      stockTotal <= 0
    ) {
      return res.sendStatus(400);
    }

    const game = await connection.query("SELECT * FROM games WHERE name=$1;", [name]);
    if (game.rows.length !== 0) {
      return res.sendStatus(409);
    }

    await connection.query(
      'INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}