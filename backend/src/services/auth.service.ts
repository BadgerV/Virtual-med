import { UserType } from "@prisma/client";
import { prisma } from "../config/db";
// import { USERS } from "../enums/user-enums";
import { AuthHelper } from "../helpers/auth.helpers";

export class AuthService {
  static async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: UserType = UserType.USER
  ) {
    const hashedPassword = await AuthHelper.hashPassword(password);

    // LogService.createLog(name, "Created an account");

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        accountType: userType,
      },
    });
  }
}
