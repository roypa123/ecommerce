import { v4 as uuidv4 } from "uuid";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
//import constants from "../constants";
import { Request, Response, NextFunction } from "express";

class HelperFunction {
  static generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  // static isAdmin(req: Request, res: Response, next: NextFunction): void {
  //   console.log(req.user);
  //   console.log("manu");
  //   if (!req.user || req.user.role !== "admin") {
  //     res.status(403).json({ message: "Forbidden: You do not have permission." });
  //     return;
  //   }
  //   next();
  // }

  static isValidOTP(otp: string): boolean {
    const otpRegex = /^\d{4}$/;
    return otpRegex.test(otp);
  }

  // static async generateAccessToken(user: object): Promise<string> {
  //   try {
  //     return jwt.sign(user, constants.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  //   } catch (error) {
  //     console.error("Error generating access token:", error);
  //     throw new Error("Failed to generate access token.");
  //   }
  // }

  // static async generateRefreshToken(user: object): Promise<string> {
  //   try {
  //     return jwt.sign(user, constants.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  //   } catch (error) {
  //     console.error("Error generating refresh token:", error);
  //     throw new Error("Failed to generate refresh token.");
  //   }
  // }

  static generateImageName(): string {
    const uuid = uuidv4();
    return uuid.replace(/-/g, "").substring(0, 10);
  }

  static async encrypt(input: string, encodedKey: string): Promise<string> {
    try {
      const algorithm = "aes-256-cbc";
      const iv = crypto.randomBytes(16);
      const key = Buffer.from(encodedKey, "base64");
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encryptedData = cipher.update(input, "utf8", "hex");
      encryptedData += cipher.final("hex");
      return encryptedData;
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    }
  }

  static async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      console.error("Error hashing password:", error);
      throw error;
    }
  }

  static async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error("Error comparing passwords:", error);
      throw error;
    }
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPassword(password: string): boolean {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/.test(password);
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;
  }
}

export default HelperFunction;
