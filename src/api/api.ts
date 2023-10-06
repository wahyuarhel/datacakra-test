import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./endpoint";
import { LocalStorageType } from "../enums/authEnum";

const getToken = () => localStorage.getItem(LocalStorageType.token);
export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const ApiClient: AxiosInstance = axios.create({
  baseURL: baseUrl
});

export default ApiClient;