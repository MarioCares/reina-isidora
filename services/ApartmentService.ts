import { Client } from "@/utils/Client";
import { IApartmentUpsert } from "@/interfaces/IApartmentUpsert";

const Upsert = (data: IApartmentUpsert) =>
  Client("/api/apartment/upsert", {
    method: "POST",
    body: data,
    headers: {},
  });

export const ApartmentService = {
  Upsert,
};
