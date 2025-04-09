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
      console.log("[Login] Tentative de connexion pour:", email);

      // Validation des données
      if (!email || !password) {
        console.log("[Login] Échec: Email ou mot de passe manquant");
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Recherche de l'utilisateur
      const user = await this.userService.findByEmail(email);
      if (!user) {
        console.log("[Login] Échec: Utilisateur non trouvé pour email:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log("[Login] Utilisateur trouvé:", {
        id: user._id,
        email: user.email,
        hashedPassword: user.password.substring(0, 10) + "...", // Affiche juste le début du hash
      });

      // Vérification du mot de passe
      const isValidPassword = await this.authService.validatePassword(
        password,
        user.password
      );
      console.log("[Login] Validation du mot de passe:", isValidPassword);

      if (!isValidPassword) {
        console.log("[Login] Échec: Mot de passe invalide pour:", email);
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Génération et stockage du token
      const token = this.authService.generateToken(user);
      console.log("[Login] JWT généré:", {
        token: token.substring(0, 20) + "...", // Affiche juste le début du token
        parts: token.split(".").length, // Devrait être 3 (header.payload.signature)
      });

      this.authService.setTokenCookie(res, token);
      console.log("[Login] Cookie JWT défini avec succès");

      // Réponse sans données sensibles
      const responseData = {
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      };
      console.log("[Login] Réponse finale:", responseData);
      res.json(responseData);
    } catch (error) {
      console.error("[Login] Erreur serveur:", error);
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
