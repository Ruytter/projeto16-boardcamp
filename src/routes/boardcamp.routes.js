import { Router } from "express";

import {getCategories, insertCategory} from '../controllers/boardcamp.controller.js'

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", insertCategory);

export default router;
