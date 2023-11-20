import { User } from "@prisma/client";

export interface IUseGetUsers {
  isLoading: boolean;
  users: User[];
  error: string | null;
}
