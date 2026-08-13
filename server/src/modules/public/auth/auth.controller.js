import { setAuthCookies } from "../../../shared/utils/authCookies.js";
import { buildSuccessResponse } from "../../../shared/utils/buildSuccessResponse.js";
import AuthService from "./auth.service.js";

export default class AuthController {
    constructor() {
        this.AuthService = new AuthService()
    }

    async registerController(req,res) {
        const userData = req.validated.body;
        const {accessToken,refreshToken,user} = await this.AuthService.registerUser(userData);

        setAuthCookies(res,accessToken,refreshToken);

        return buildSuccessResponse(res,"User login successfully",user);
    }
}