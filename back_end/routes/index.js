import express from "express";
import { getUser, getUserInfo, Login, Register } from "../controllers/User.js";
import { verifyToken } from "../middleware/Middleware.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
router.get("/users", verifyToken, getUser);
router.post("/register", Register);
router.post("/login", Login);
router.post("/token", refreshToken);
router.post("/getUserInfo", getUserInfo);
export default router;
