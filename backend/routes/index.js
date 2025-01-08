import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes.js";
import categoryRoute from "./categoryRoute.js";



router.use("/user", userRoutes);
router.use("/", categoryRoute);



export default router;