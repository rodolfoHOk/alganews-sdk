import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import handleAxiosResponseSuccess from "./utils/handleAxiosResponseSuccess";
import handleAxiosResponseError from "./utils/handleAxiosResponseError";

const Http = axios.create();

Http.defaults.baseURL = "http://localhost:8080";

Http.interceptors.response.use(
  handleAxiosResponseSuccess,
  handleAxiosResponseError
);

function getData<T>(res: AxiosResponse<T>) {
  return res.data;
}

class Service {
  protected static Http = Http;
  protected static getData = getData;

  public static setRequestInterceptors(
    onFulfilled: (
      request: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected: (error: any) => any
  ) {
    Http.interceptors.request.use(onFulfilled, onRejected);
  }
}

export default Service;
