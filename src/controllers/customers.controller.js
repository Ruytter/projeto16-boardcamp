import { connection } from "../database/database.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (cpf!==undefined){
      const { rows } = await connection.query(
        "SELECT * FROM customers WHERE cpf LIKE $1;",
        [cpf+"%"]
            );
      return res.send(rows);
    }
    const { rows } = await connection.query("SELECT * FROM customers;");
    res.send(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  console.log(id)
  try {
    const { rows } = await connection.query(
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
      return res.sendStatus(409);
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
  console.log(id)
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