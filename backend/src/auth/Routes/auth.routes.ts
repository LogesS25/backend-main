// src/routes/authRoutes.ts
import { Router } from "express";

import {
  isValid,
  loginUserValidationRules,
  registerUserValidationRules,
} from "../utils/validation.utils";
import authController from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post(
  "/register",
  isValid(registerUserValidationRules),
  authController.registerUser
);
authRoutes.post(
  "/login",
  isValid(loginUserValidationRules),
  authController.loginUser
);

export default authRoutes;
