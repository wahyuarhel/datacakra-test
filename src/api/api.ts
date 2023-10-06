import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./endpoint";
import { LocalStorageKey } from "../enums/authEnum";

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

export default ApiClient;