import Axios from "axios";

const createApiClient = (baseURL: string) => {
  const api = Axios.create({ baseURL });

  api.interceptors.request.use(
    (config: any) => {
      if (!config.headers) {
        config.headers = {};
      }

      config.headers = { ...config.headers, "X-CMC_PRO_API_KEY": "c96492ff-d746-4915-9adb-ada2b78b136c" };

      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

export const apiClient = createApiClient("https://pro-api.coinmarketcap.com");
