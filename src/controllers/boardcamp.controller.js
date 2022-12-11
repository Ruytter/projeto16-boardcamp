import { connection } from "../database/database.js";
import dayjs from "dayjs";

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
    return res.status(400);
  }
  try {
    const { rows } = await connection.query(
      "SELECT * FROM categories WHERE name=$1;",
      [name]
    );

    if (rows.length !== 0) {
      res.status(409);
    }

    await connection.query("INSERT INTO categories (nome) VALUES ($1);", [
      name,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

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
    const { rows } = await connection.query(
      "SELECT * FROM categories WHERE id=$1;",
      [categoryId]
    );

    if (
      rows.length !== 0 ||
      name.length === 0 ||
      pricePerDay <= 0 ||
      stockTotal <= 0
    ) {
      return res.status(400);
    }

    rows = await connection.query("SELECT * FROM games WHERE name=$1;", [name]);

    if (rows.length !== 0) {
      return res.status(409);
    }

    await connection.query(
      "INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5);",
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomers(req, res) {
  try {
    const { rows } = await connection.query("SELECT * FROM customers;");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomersByCpf(req, res) {
  const { cpf } = req.params;

  try {
    const { rows } = await connection.query(
      "SELECT * FROM games WHERE name LIKE $1%;",
      [cpf]
    );

    if (rows.length === 0) {
      return res.status(404);
    }

    res.send(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;

  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1;",
      [id]
    );

    if (rows.length === 0) {
      res.status(404);
    }

    res.send(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function insertCostumer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  if (
    (isNaN(cpf) && cpf.length !== 11) ||
    isNaN(phone) ||
    phone.length < 10 ||
    phone.length > 11 ||
    name.lengh === 0
  ) {
    return res.status(400);
  }

  try {
    const { rows } = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1;",
      [cpf]
    );

    if (rows.length !== 0) {
      return res.status(409);
    }

    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updateCostumer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  if (
    (isNaN(cpf) && cpf.length !== 11) ||
    isNaN(phone) ||
    phone.length < 10 ||
    phone.length > 11 ||
    name.lengh === 0
  ) {
    return res.status(400);
  }

  try {
    const { rows } = await connection.query(
      "SELECT * FROM customers WHERE cpf=$1;",
      [cpf]
    );

    if (rows.length === 0) {
      return res.status(409);
    }

    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5",
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
} // validar a data


