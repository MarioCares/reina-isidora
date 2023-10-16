import { useState } from "react";
import { IRegister } from "@/interfaces/IRegister";
import { UserService } from "@/services/UsersService";
import { getErrorMessage } from "@/utils/Errors";

const useRegister = () => {
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [statusRegister, setStatusRegister] = useState<string | null>(null);

  const handleRegister = ({ name, email, password }: IRegister) => {
    setLoadingRegister(true);
    UserService.Register({ name, email, password })
      .then(() => {
        setStatusRegister("ok");
      })
      .catch((error) => {
        console.error("error", error);
        setStatusRegister(getErrorMessage(error));
      })
      .finally(() => setLoadingRegister(false));
  };

  return { loadingRegister, handleRegister, statusRegister };
};

export default useRegister;
