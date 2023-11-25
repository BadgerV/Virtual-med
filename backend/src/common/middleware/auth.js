import jwt from "jsonwebtoken";
import User from "../../models/UserModel";
import AppError from "../utils/appError";
import { ENVIRONMENT } from "../config/environment";
import { catchAsync } from "../utils/errorHandler";

const auth = async (req, res, next) => {
    // Retrieve the token from the cookie instead of the Authorization header
    const token = req.cookies.authToken;

    if (!token) {
      throw new AppError("Please authenticate", 404)
    }

    const decoded = jwt.verify(token, ENVIRONMENT.APP.SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
};

export default auth;
