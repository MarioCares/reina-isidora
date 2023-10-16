export interface IClient {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: object;
  headers: object;
}
