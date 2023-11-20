import { useState } from "react";
import { IApartmentUpsert } from "@/interfaces/model/IApartmentUpsert";
import { ApartmentService } from "@/services/ApartmentService";
import { getErrorMessage } from "@/utils/Errors";

const useApartmentUpsert = () => {
  const [loadingApartmentUpsert, setLoadingApartmentUpsert] =
    useState<boolean>(false);
  const [statusApartmentUpsert, setStatusApartmentUpsert] = useState<
    string | null
  >(null);

  const handleUpsert = ({ id, number, prorating }: IApartmentUpsert) => {
    setLoadingApartmentUpsert(true);
    ApartmentService.Upsert({ id, number, prorating })
      .then(() => {
        setStatusApartmentUpsert("ok");
      })
      .catch((error) => {
        console.log("error en ApartmentUpsert", error);
        setStatusApartmentUpsert(getErrorMessage(error));
      })
      .finally(() => setLoadingApartmentUpsert(false));
  };

  return { loadingApartmentUpsert, statusApartmentUpsert, handleUpsert };
};

export default useApartmentUpsert;
