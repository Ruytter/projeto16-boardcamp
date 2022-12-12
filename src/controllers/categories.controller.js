import { connection } from "../database/database.js";

export async function getCategories(req, res) {
  try {
    const { rows } = await connection.query("SELECT * FROM categories;");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function insertCategory(req, res) {
  const { name } = req.body;
  if (name.length === 0) {
    return res.sendStatus(400);
  }
  try {
    const { rows } = await connection.query(
      "SELECT * FROM categories WHERE name=$1;",
      [name]
    );
    
    if (rows.length !== 0) {
     res.sendStatus(409);
     return
    }

    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}