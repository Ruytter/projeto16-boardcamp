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
  if (name.length === 0){
    return res.status(400)
  }
  try {
    const { rows } = await connection.query("SELECT * FROM categories WHERE name=$1;",
    [name]);

    if (rows.length !== 0) {
      res.status(409);
    }

    await connection.query(
      "INSERT INTO categories (nome) VALUES ($1);",
      [name]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
