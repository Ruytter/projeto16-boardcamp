import { Router } from "express";

import {getCategories, insertCategory, getGames, getGameByName, insertGame, getCustomers, getCustomersByCpf, getCustomerById, insertCostumer, updateCostumer} from '../controllers/boardcamp.controller.js'

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



export default router;
