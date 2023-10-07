import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiClient from "../../api/api";
import { LocalStorageKey } from "../../enums/authEnum";
import { LoginRequestType, RegisterRequestType } from "../../types/authType";
import { toast } from "react-toastify";


export const loginAction = createAsyncThunk(
  'loginAction',
  async (authParam: LoginRequestType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/login`, authParam);
      if (response.status === 200) {
        localStorage.setItem(LocalStorageKey.token, response.data.data.token)
        console.log('error in loginAction :', response.data.message)
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
    } catch (error) {
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
        return response.data;
      }
    } catch (error) {
      let err = (error as AxiosError)
      console.log('error on catch block:', err.response)
      return rejectWithValue(err.response?.data)
    }
  }
)
