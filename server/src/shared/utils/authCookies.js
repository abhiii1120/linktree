import { app_config } from "../../constants/app.constants.js"

const config = app_config;
export const setAuthCookies = (res,accessToken,refreshToken) => {
    res.cookie("accessToken",accessToken,config.cookie.accessToken);
    res.cookie("refreshToken",refreshToken,config.cookie.refreshToken);
}

export const clearAuthCookies = () => {
    res.clearCookie("accessToken",config.cookie.accessToken);
    res.clearCookie('refreshToken',config.cookie.refreshToken);
}