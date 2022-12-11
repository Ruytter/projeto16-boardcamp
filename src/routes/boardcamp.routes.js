import { Router } from "express";

import {getCategories, insertCategory, getGames, getGameByName, insertGame} from '../controllers/boardcamp.controller.js'

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", insertCategory);
router.get("/games", getGames);
router.get("/games/:name", getGameByName);
router.post("/games", insertGame);

export default router;
