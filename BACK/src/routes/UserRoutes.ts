import { Router } from "express";
import { UserController } from "../controllers/UserController";
import UserService from "../services/UserService";
import UserRepository from "../daos/UserRepository";
import AuthenticationService from "../services/AuthenticationService";

const router: Router = Router();

const userRepository = new UserRepository();
const authenticationService = new AuthenticationService();
const userService = new UserService(userRepository, authenticationService);
const userController = new UserController(userService);

router.get("/", (req, res) => userController.getUsers(req, res));
router.post("/register", (req, res) => userController.registerUser(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));

export default router;
