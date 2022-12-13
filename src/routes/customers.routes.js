import { Router } from "express";

import { getCustomers, getCustomerById, insertCostumer, updateCostumer } from "../controllers/customers.controller.js"

const router = Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", insertCostumer);
router.put("/customers/:id", updateCostumer);

export default router;