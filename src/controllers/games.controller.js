import { connection } from "../database/database.js";

export async function getGames(req, res) {
  let { name } = req.query;
  name = name[0].toUpperCase() + name.substr(1)
  try {
    if (name!==undefined){
      const { rows } = await connection.query(
        "SELECT * FROM games WHERE name LIKE $1;",
        [name+"%"]
            );
      return res.send(rows);
    }
    const { rows } = await connection.query("SELECT * FROM games;");
    res.send(rows);
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
      category.rows.length !== 0 ||
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