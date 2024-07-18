import { CreateApiClient } from "./apiClient.js";
import { UserService } from "./user.service.js";
export const api = CreateApiClient(process.env.REACT_APP_API_URL);
export const userService = new UserService(api);
