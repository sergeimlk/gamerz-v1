import { Router, Request, Response } from "express";
import { RoleController } from "../controllers/RoleController";
import RoleService from "../services/RoleService";
import RoleRepository from "../daos/RoleRepository";

const router: Router = Router();

const roleRepository: RoleRepository = new RoleRepository();
const roleService: RoleService = new RoleService(roleRepository);
const roleController: RoleController = new RoleController(roleService);

router.get("/", (req: Request, res: Response) => roleController.getRoles(req, res));

export default router;
