import UserRepo from "../../../repository/auth.repository.js";
import AppError from "../../../shared/errors/app.error.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import env from "../../../config/env.js";
import UnAuthorize from "../../../shared/errors/unAuthorize.js";
import notFound from "../../../shared/errors/notFound.js";
import bcrypt from "bcrypt";

export default class AuthService {
  constructor() {
    this.UserRepo = new UserRepo();
  }

  signTokens(data) {
    console.log("SIGNING WITH:", env.ACCESS_TOKEN_SECRET);
    let refreshToken = jwt.sign(data, env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30D",
    });

    let accessToken = jwt.sign(data, env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1H",
    });

    return { accessToken, refreshToken };
  }

  tokenPayload(data) {
    return {
      _id: String(data._id),
      email: data.email,
      name: data.username,
    };
  }

  async registerUser(payload) {
    let user = {
      ...payload,
      email: payload.email.toLowerCase(),
    };

    const existingUser = await this.UserRepo.findByEmail(user.email);

    if (existingUser) {
      throw new AppError("user already exists", StatusCodes.CONFLICT);
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = await this.UserRepo.create(user);

    const tokenPayload = this.tokenPayload(newUser);

    const tokens = this.signTokens(tokenPayload);

    return { ...tokens, user: tokenPayload };
  }

  async LoginService(payload) {
    let email = payload.email.toLowerCase();

    const user = await this.UserRepo.findByEmail(email);

    if (!user) throw new notFound("User with this email not found");

    if (!user.password)
      throw new notFound("This account is not enabled for password login");

    let isMatch = await user.comparePassword(payload.password);

    if (!isMatch) throw new UnAuthorize("Password doesn't match");

    const tokenPayload = this.tokenPayload(user);
    const tokens = this.signTokens(tokenPayload);

    return { ...tokens, user: tokenPayload };
  }

  async getMe(accessToken) {
    console.log("VERIFYING WITH:", env.ACCESS_TOKEN_SECRET);
    if (!accessToken) throw new UnAuthorize("Access token not found");

    const user = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);
    console.log(user);
    return { user };
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) throw new UnAuthorize("Refresh token not found");

    const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET);

    return { accessToken };
  }
}
