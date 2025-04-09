import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authenticateToken, requireRole } from "../middlewares/authMiddleware";
import UserService from "../services/UserService";
import AuthenticationService from "../services/AuthenticationService";
import UserRepository from "../daos/UserRepository";

const router = Router();
const authenticationService = new AuthenticationService();
const userRepository = new UserRepository();

const userService = new UserService(userRepository, authenticationService);
const authController = new AuthController(userService, authenticationService);

// Routes publiques
router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

// Routes protégées
router.get("/me", authenticateToken, (req, res) =>
  authController.getCurrentUser(req, res)
);

// Routes avec restriction de rôle
router.get("/admin", authenticateToken, requireRole("admin"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
