import { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";

const authController = {
  registerUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const user = await registerUserService({ name, email, password, role });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  loginUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await loginUserService({ email, password });
      if (!result) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      res.json({ token: result.token, role: result.role });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
};
export default authController;
