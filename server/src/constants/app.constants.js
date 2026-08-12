export default {
  PORT: 3000,
  MONGO_URI: "mongodb://localhost:27017/linktree",
  NODE_ENV:"development",
  
};

export const app_config = {
  cookie: {
    accessToken: {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    },
    refreshToken: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  },
};
