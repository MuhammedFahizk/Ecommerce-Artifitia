import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes.js";
import categoryRoute from "./categoryRoute.js";
import productRoute from "./productRoute.js";



router.use("/user", userRoutes);
router.use("/", categoryRoute);
router.use("/", productRoute);




export default router;