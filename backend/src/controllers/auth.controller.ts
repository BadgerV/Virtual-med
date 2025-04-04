import { Request, Response, RequestHandler } from "express";
import { AuthService } from "../services/auth.service";
import AppError from "../common/utils/appError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { isNullOrEmpty } from "../common/utils/helper";

export class AuthController {
  static readonly register: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      //collects neccesary details from the req.body
      const { firstName, lastName, email, password } = req.body;

      //checks if the fields are all populated
      if (
        isNullOrEmpty(firstName) ||
        isNullOrEmpty(lastName) ||
        isNullOrEmpty(email) ||
        isNullOrEmpty(password)
      ) {
        throw new AppError("Please fill all the inputs", 400);
      }

      const user = await AuthService.registerUser(email, password, firstName, lastName);

      
      res
        .status(201)
        .json({ message: "User registered successfully", user, status: 200 });
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          res.status(500).json({
            message: "This email is already in use.",
          });
        }
      } else {
        // General error fallback
        res.status(500).json({ message: error.message });
      }
    }
  };
}
