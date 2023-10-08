import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import ApiClient from "../../api/api";
import { LocalStorageKey } from "../../enums/authEnum";
import { LoginRequestType, RegisterRequestType } from "../../types/authType";


export const loginAction = createAsyncThunk(
  'loginAction',
  async (authParam: LoginRequestType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/login`, authParam);
      if (response.status === 200) {
        localStorage.setItem(LocalStorageKey.token, response.data.data.token)
        localStorage.setItem(LocalStorageKey.userData, JSON.stringify(response.data.data.user))
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => window.location.reload(), 3000)
        return response.data;
      }
    } catch (error: any) {
      if (error.response.status !== 500) {
        toast.error(error.response?.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      let err = (error as AxiosError)
      return rejectWithValue(err.response?.data)
    }
  }
)

export const registerAction = createAsyncThunk(
  'registerAction',
  async (registerParams: RegisterRequestType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/register`, registerParams);
      console.log('response registerAction :', response)
      if (response.status === 201) {
        toast.success(response.data.message + ', login to see our destination :)', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return response.data;
      }
    } catch (error: any) {
      let err = (error as AxiosError)
      if (error.response.status !== 500) {
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
      }
      console.log('error on catch block:', err.response)
      return rejectWithValue(err.response?.data)
    }
  }
)
