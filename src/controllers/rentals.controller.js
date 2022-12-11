import { connection } from "../database/database.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  try {
    const { rows } = await connection.query(
      `
      SELECT rentals.*, customers.*, games.*
      FROM 
        rentals 
      JOIN 
        customers
      JOIN
        games
      ON
        customers.id = rentals.customerId AND games.id = rentals.gameId
      `
    );

    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customer = await connection.query(
      "SELECT * FROM customers WHERE id=$1;",
      [customerId]
    );

    const game = await connection.query(
      "SELECT * FROM games WHERE id=$1;",
      [gameId]
    );

    if (customer.rows.length === 0 || game.rows.length === 0 || daysRented <=0 || game.stockTotal <= 0) {
      return res.status(400);
    }

    const price = game.pricePerDay * daysRented

    await connection.query(
      "INSERT INTO rentals (customerId, gameId, rentDate, daysRented, pricePerDay ) VALUES ($1, $2, $3, $4, $5);",
      [customerId, gameId, dayjs().format('YYYY/MM/DD'), daysRented, price]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function insertReturnRent(req, res) {
  const { id } = req.params;
  const { rows } = await connection.query("SELECT gameId, rentDate FROM rentals WHERE id=$1", [id])
  const delay = dayjs().format('YYYY/MM/DD') - rows[0].rentDate;
  const price = await connection.query("SELECT pricePerDay FORM games WHERE id = rows.gameId")
  const delayPrice = delay*price;

  try {
    await connection.query(
      "UPDATE rentals SET returnDate=$1, delayFee=$2 WHERE id=$3",
      [dayjs().format('YYYY/MM/DD'), delayPrice, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRentalById(req, res) {
  const { id } = req.params;

  const { rows } = await connection.query(
    "SELECT * FROM games WHERE id=$1;",
    [id]
  );
    
  if (rows.length === 0) {
    return res.status(404);
  }

  if (rows.returnDate === null) {
    return res.status(400);
  }

  try {
    await connection.query("DELETE FROM rentals WHERE id=$1", [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}