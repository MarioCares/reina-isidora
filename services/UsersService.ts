import { Client, ClientData } from "@/utils/Client";
import { IRegister } from "@/interfaces/model/IRegister";

const Register = (data: IRegister) =>
  Client("/api/user/register", {
    method: "POST",
    body: data,
    headers: {},
  });

const GetByRole = (role: string) => ClientData(`/api/users/${role}`);

export const UserService = {
  Register,
  GetByRole,
};
