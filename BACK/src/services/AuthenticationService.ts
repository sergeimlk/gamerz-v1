import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../models/UserModel";

class AuthenticationService {
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;
  private readonly COOKIE_MAX_AGE: number;

  constructor() {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET must be defined");
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
    this.COOKIE_MAX_AGE = Number(process.env.COOKIE_MAX_AGE) || 86400000;
  }

  async validatePassword(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    console.log("[Auth] Début de la validation du mot de passe");
    const isValid = await bcrypt.compare(inputPassword, hashedPassword);
    console.log("[Auth] Résultat de la validation:", isValid);
    return isValid;
  }

  generateToken(user: IUser): string {
    console.log("[Auth] Génération du token JWT pour:", user.email);
    const payload = {
      id: user._id?.toString() || user.id,
      email: user.email,
      role: user.role_id,
    };

    // Définir les options avec le type jwt.SignOptions
    const options: jwt.SignOptions = {
      expiresIn: this.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    };

    // Appel à jwt.sign avec des arguments typés explicitement
    const token = jwt.sign(payload, this.JWT_SECRET, options);
    console.log("[Auth] Token JWT généré avec succès");
    return token;
  }

  setTokenCookie(res: Response, token: string): void {
    console.log("[Auth] Configuration du cookie JWT");
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: this.COOKIE_MAX_AGE,
      path: "/",
    });
    console.log("[Auth] Cookie JWT configuré avec les options:", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: this.COOKIE_MAX_AGE,
    });
  }

  clearTokenCookie(res: Response): void {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  async encryptPassword(user: Partial<IUser>): Promise<string> {
    const saltRounds = process.env.SALT_SEED;
    if (!saltRounds) {
      throw new Error("[Error] SALT_SEED is not defined");
    }

    if (!user.password) {
      throw new Error("[Error] Password is required");
    }

    try {
      const salt = await bcrypt.genSalt(parseInt(saltRounds));
      const hash = await bcrypt.hash(user.password, salt);
      return hash;
    } catch (error) {
      throw new Error(`[Error] Failed to encrypt password: ${error}`);
    }
  }
}
export default AuthenticationService;
