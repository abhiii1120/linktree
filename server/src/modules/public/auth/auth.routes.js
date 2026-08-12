import express from 'express';
import { asyncHandler } from '../../../middlewares/asyncHandler.js';
import { registerSchema } from './auth.validator.js';
import { validateRequest } from '../../../middlewares/validateRequest.js';

let router = express.Router();


router.get("/me", asyncHandler(authController.getMe.bind(authController)));

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.registerController.bind(authController)),
);

router.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(authController.loginController.bind(authController)),
);

router.get(
  "/refreshToken",
  asyncHandler(authController.refreshAccessToken.bind(authController)),
);


return router;