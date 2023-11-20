import { Client } from "@/utils/Client";
import { IRegister } from "@/interfaces/model/IRegister";

const Register = (data: IRegister) =>
  Client("/api/user/register", {
    method: "POST",
    body: data,
    headers: {},
  });

export const UserService = {
  Register,
};
