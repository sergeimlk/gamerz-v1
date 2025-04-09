import { Request, Response } from "express";
import UserService from "../services/UserService";
import AuthenticationService from "../services/AuthenticationService";

class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      // Validation des données
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Recherche de l'utilisateur
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Vérification du mot de passe
      const isValidPassword = await this.authService.validatePassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Génération et stockage du token
      const token = this.authService.generateToken(user);
      this.authService.setTokenCookie(res, token);

      // Réponse sans données sensibles
      res.json({
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  }

  async logout(req: Request, res: Response) {
    this.authService.clearTokenCookie(res);
    res.json({ message: "Logged out successfully" });
  }

  async getCurrentUser(req: Request, res: Response): Promise<any> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await this.userService.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get current user" });
    }
  }
}

export default AuthController;
