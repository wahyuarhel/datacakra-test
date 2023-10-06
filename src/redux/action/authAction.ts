import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../api/api";
import { LoginRequestType } from "../../types/authType";
import axios, { AxiosError } from "axios";
import { LocalStorageKey } from "../../enums/authEnum";

export const loginAction = createAsyncThunk(
  'loginAction',
  async (authParam: LoginRequestType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/login`, authParam);
      console.log('response loginAction :', response)
      if (response.status === 200) {
        localStorage.setItem(LocalStorageKey.token, response.data.data.token)
        return response.data;
      }
    } catch (error) {
      let err = (error as AxiosError)
      rejectWithValue(err)
      return err.response?.data
    }
  }
);
