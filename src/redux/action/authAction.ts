import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiClient from "../../api/api";
import { LoginRequestType } from "../../types/authType";
import axios from "axios";
import { LocalStorageType } from "../../enums/authEnum";

export const loginAction = createAsyncThunk(
  'loginAction',
  async (authParam: LoginRequestType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.post(`/login`, authParam);
      if (response.status === 200) {
        localStorage.setItem(LocalStorageType.token, response.data.data.token)
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401)
          return rejectWithValue(error.response?.data)
        if (error.response?.status === 500) {
          return rejectWithValue('Internal Server Error')
        }
        else {
          return rejectWithValue(error.response)
        }
      }
      else {
        const elseError = rejectWithValue(error)
        console.log("error outside axiosError:", elseError)
        return elseError
      }
    }
  }
);
