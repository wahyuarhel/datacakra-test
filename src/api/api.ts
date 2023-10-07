import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./endpoint";
import { LocalStorageKey } from "../enums/authEnum";
import { toast } from "react-toastify";

const getToken = () => localStorage.getItem(LocalStorageKey.token);
export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const ApiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    "Content-Type": 'application/json',
    Authorization: getAuthorizationHeader()
  }
});


ApiClient.interceptors.request.use(function (request) {
  console.log('config interceptors :', request);
  return request;
}, function (error) {
  console.log('error in interceptors request:', error);
  return Promise.reject(error);
});

ApiClient.interceptors.response.use(function (response) {
  console.log('response interceptor :', response);
  return response;
}, function (error) {
  console.log('error in interceptors response:', error);
  toast.error(error.response.data.message, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  return Promise.reject(error);
});

export default ApiClient;