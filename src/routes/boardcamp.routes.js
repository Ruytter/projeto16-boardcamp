import { Router } from "express";

import { getCategories, insertCategory } from '../controllers/categories.controller.js';
import { getGames, getGameByName, insertGame } from "../controllers/games.controller.js";
import { getCustomers, getCustomersByCpf, getCustomerById, insertCostumer, updateCostumer } from "../controllers/customers.controller.js"
import { getRentals, insertRental, insertReturnRent, deleteRentalById } from "../controllers/rentals.controller.js";

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", insertCategory);
router.get("/games", getGames);
router.get("/games/:name", getGameByName);
router.post("/games", insertGame);
router.get("/customers", getCustomers);
router.get("/customers/:cpf", getCustomersByCpf);
router.get("/customers/:id", getCustomerById);
router.post("/customers", insertCostumer);
router.put("/customers/:id", updateCostumer);
router.get(" /rentals", getRentals);
router.post("/rentals", insertRental);
router.post(" /rentals/:id/return", insertReturnRent);
router.delete("/rentals/:id", deleteRentalById);


export default router;
