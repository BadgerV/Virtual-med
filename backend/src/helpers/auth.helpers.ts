import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/user-types";
import AppError from "../common/utils/appError";
import {env} from "../config/env"


export class AuthHelper {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(payload: object, expiresIn: number = 7): string {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
  }

  static verifyToken(token: string): string | JwtPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (error) {
      console.log(error);
      throw new AppError("Invalid or expired token", 401);
    }
  }
}
