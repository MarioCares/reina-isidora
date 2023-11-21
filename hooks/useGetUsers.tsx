"use client";
import { Role, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { IUseGetUsers } from "@/interfaces/props/IUseGetUsers";
import { UserService } from "@/services/UsersService";

const useGetUsers = (role: Role): IUseGetUsers => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    UserService.GetByRole(role)
      .then((res: User[]) => {
        setUsers(res);
      })
      .catch((error) => {
        console.error("useGetUsers", error);
        setError("Error al obtener listado de Usuarios");
      })
      .finally(() => setIsLoading(false));
  }, [role]);

  return { isLoading, users, error };
};

export default useGetUsers;
