import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import ApiClient from "../../api/api";
import { LocalStorageKey } from "../../enums/authEnum";
import { LoginRequestType, RegisterRequestType } from "../../types/authType";

export const loginAction = createAsyncThunk(
  'loginAction',
  async (authParam: LoginRequestType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/login`, authParam);
      console.log('response loginAction :', response)
      if (response.status === 200) {
        localStorage.setItem(LocalStorageKey.token, response.data.data.token)
        window.location.reload()
        return response.data;
      }

    } catch (error) {
      let err = (error as AxiosError)
      console.log('error on catch block:', err.response)
      rejectWithValue(err.response?.data)
      return err.response?.data
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
      rejectWithValue(err.response?.data)
      return err.response?.data
    }
  }
)
