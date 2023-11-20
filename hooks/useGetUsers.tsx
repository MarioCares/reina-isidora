"use client";
import { Role, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { IUseGetUsers } from "@/interfaces/props/IUseGetUsers";

const useGetUsers = (role: Role): IUseGetUsers => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`//localhost:3000/api/users/${role}`);
        const jsonUsers = await response.json();
        setUsers(jsonUsers);
      } catch (error) {
        console.error("useGetUsers", error);
        setError("Error al obtener listado de Usuarios");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [role]);

  return { isLoading, users, error };
};

export default useGetUsers;
