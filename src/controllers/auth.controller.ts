import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ApiResponse } from "../utils/api.response";

export class AuthController {
  protected service: AuthService;
  constructor() {
    this.service = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const data = await this.service.login(username, password);
    res.json(new ApiResponse(true, data));
  };
}
