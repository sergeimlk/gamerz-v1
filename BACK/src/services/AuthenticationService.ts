import jwt from "jsonwebtoken";
import { Response } from "express";
import UserModel, { IUser } from "../models/UserModel";
import bcrypt from "bcrypt";

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
    return await bcrypt.compare(inputPassword, hashedPassword);
  }

  generateToken(user: IUser): string {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role_id,
      },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN } as jwt.SignOptions
    );
  }

  setTokenCookie(res: Response, token: string): void {
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: this.COOKIE_MAX_AGE,
      path: "/",
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

  async encryptPassword(user: Partial<IUser>): Promise<string | void> {
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
