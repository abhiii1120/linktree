import express from 'express';
import { asyncHandler } from '../../../middlewares/asyncHandler.js';
import { registerSchema } from './auth.validator.js';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import AuthController from './auth.controller.js';

let router = express.Router();

let authController = new AuthController();


// router.get("/me", asyncHandler(authController.getMe.bind(authController)));

router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(authController.registerController.bind(authController)),
);

// router.post(
//   "/login",
//   validateRequest(loginSchema),
//   asyncHandler(authController.loginController.bind(authController)),
// );

// router.get(
//   "/refreshToken",
//   asyncHandler(authController.refreshAccessToken.bind(authController)),
// );


export default router;