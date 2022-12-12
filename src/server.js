import express, { json } from "express";
import categoriesRoutes from "./routes/categories.routes.js";
import customersRoutes from "./routes/customers.routes.js"
import gamesRoutes from "./routes/games.routes.js"
import rentalsRoutes from "./routes/rentals.routes.js"
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(categoriesRoutes);
app.use(customersRoutes);
app.use(gamesRoutes);
app.use(rentalsRoutes);
app.use(cors());
dotenv.config();

dotenv.config();
const port = process.env.SERVPORT || 4000;

app.listen(port, () => {
    console.log("listening on port " + port + " 🚀");
  });