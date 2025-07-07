export type LoginRepo<T extends { password?: string }> = {
  token: string;
  user: Omit<T, "password">;
};
