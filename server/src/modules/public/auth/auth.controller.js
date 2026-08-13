import { app_config } from "../../../constants/app.constants.js";
import { setAuthCookies } from "../../../shared/utils/authCookies.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import AuthService from "./auth.service.js";

export default class AuthController {
  constructor() {
    this.AuthService = new AuthService();
  }

  async registerController(req, res) {
    const userData = req.validated.body;
    const { accessToken, refreshToken, user } =
      await this.AuthService.registerUser(userData);

    setAuthCookies(res, accessToken, refreshToken);

    return buildSuccessResponse(res, "User registerde successfully", user);
  }

  async loginController(req, res) {
    const userData = req.validated.body;
    const { accessToken, refreshToken, user } =
      await this.AuthService.LoginService(userData);

    setAuthCookies(res, accessToken, refreshToken);

    return buildSuccessResponse(res, "User login successfully", user);
  }

  async getMe(req, res) {
    const { user } = await this.AuthService.getMe(req.cookies.accessToken);
    return buildSuccessResponse(res, "User data fetched successfully", user);
  }

  async refreshAccessToken(req,res) {
    const {accessToken} = await this.AuthService.refreshAccessToken(req.cookies.refreshToken);

    res.cookie("accessToken",accessToken,app_config.cookie.accessToken);
    return buildSuccessResponse(res);
  }
}
