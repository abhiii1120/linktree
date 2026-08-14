import express from "express";
import { validateRequest } from "../../../middlewares/validateRequest.js";
import { createLinkSchema } from "./link.validator.js";
import authMiddleware from "../../../middlewares/authMiddleware.js";
import { createLinkController } from "./link.controller.js";
import { asyncHandler } from "../../../middlewares/asyncHandler.js";

let router = express.Router();

router.post(
  "/",
  validateRequest(createLinkSchema),
  authMiddleware,
  asyncHandler(createLinkController),
);

export default router;
