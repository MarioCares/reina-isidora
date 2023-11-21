import { IClient } from "@/interfaces/IClient";
import axios, { AxiosError } from "axios";

type Error = {
  message: string;
  statusCode: number;
};

export const Client = (url: string, params: IClient) =>
  axios({
    method: params.method,
    url,
    data: params.body,
    headers: {
      ...params.headers,
      "Content-Type": "application/json",
    },
  })
    .then(() => true)
    .catch((error: AxiosError<Error>) => {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
    });

export const ClientData = (url: string) =>
  axios({
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.data)
    .catch((error: AxiosError<Error>) => {
      if (error.response) {
        throw new Error(error.response.data.message);
      }
    });
