import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiClient from "../../api/api";

export const getAllDestination = createAsyncThunk(
  'getAllDestination',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/destination`, {
        params: {
          id: 1,
          limit: 1,
          page: 1
        }
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      }
      else {
        const elseError = rejectWithValue(error)
        console.log("error outside axiosError:", elseError)
        return elseError
      }
    }
  }
);