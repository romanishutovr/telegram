import Axios from "axios";

export function CreateApiClient(baseURL) {
  const api = Axios.create({ baseURL });
  return api;
}
