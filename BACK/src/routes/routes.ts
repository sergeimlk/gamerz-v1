import { Router } from "express";
import UserRoutes from "./UserRoutes";
import RoleRoutes from "./RoleRoutes";

const router: Router = Router();
router.use("/users", UserRoutes);
router.use("/roles", RoleRoutes);

export default router;
