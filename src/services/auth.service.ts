import { AuthRepository } from "../repositories/auth.repository";
import { HttpError } from "../utils/http.error";

export class AuthService {
  protected repository: AuthRepository;
  constructor() {
    this.repository = new AuthRepository();
  }

  login = async (username: string, password: string) => {
    const result = await this.repository.login(username, password);

    if (!result) {
      throw new HttpError("Invalid credentials", 401);
    }

    return result;
  };
}
