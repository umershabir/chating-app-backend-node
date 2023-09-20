import express from "express";
import { registerations, login } from "./controller.js";
// initializing routes
const router = express.Router();
// declaring the routes
router.post("/signup", registerations);
router.post("/login", login);
// exporting routes
export default router;
