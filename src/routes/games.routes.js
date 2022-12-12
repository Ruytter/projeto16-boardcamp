import { Router } from "express";

import { getGames, getGameByName, insertGame } from "../controllers/games.controller.js";

const router = Router();

router.get("/games", getGames);
router.get("/games/:name", getGameByName);
router.post("/games", insertGame);

export default router;