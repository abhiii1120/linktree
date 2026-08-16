import express from "express";
import authRoutes from "./public/auth/auth.routes.js";
import linkRoutes from "./private/link/link.routes.js";
import publicLinkRoutes from "./public/link/link.routes.js";
let router = express.Router();

router.use("/auth", authRoutes);
router.use("/link", linkRoutes);
router.use("/public/links",publicLinkRoutes)

export default router;
