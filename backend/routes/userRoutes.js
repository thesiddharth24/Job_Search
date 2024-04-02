import express from "express";
import { login, register, logout, getUser ,otpSend , verification } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import cors from 'cors';

const router = express.Router();

router.use(cors({
    origin: '*',
    // origin: "https://job-search-2eqm.onrender.com",
    methods: ['GET' , 'POST' , 'DELETE' , 'PUT'],
    allowedHeaders: [
        'Content-Type',
      ]
}));

router.post("/register", register);
router.post("/login", login);
router.post("/OTP-send",isAuthenticated,otpSend)
router.post("/verify-otp",isAuthenticated,verification)
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);

export default router;