import { Router } from "express";

import { getRentals, insertRental, insertReturnRent, deleteRentalById } from "../controllers/rentals.controller.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", insertRental);
router.post("/rentals/:id/return", insertReturnRent);
router.delete("/rentals/:id", deleteRentalById);


export default router;
