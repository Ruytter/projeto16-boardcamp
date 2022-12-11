import express, { json } from "express";
import boardcampRoutes from "./routes/boardcamp.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";

const app = express();
app.use(express.json());
app.use(boardcampRoutes);
app.use(cors());
dotenv.config();

dotenv.config();
const port = process.env.SERVPORT || 4000;

app.listen(port, () => {
    console.log("listening on port " + port + " 🚀");
  });