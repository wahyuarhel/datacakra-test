import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import ApiClient from "../../api/api";

export type DestinationParamType = {
  limit?: number | null
  page?: number
}
const initialDestinationPageNumber: DestinationParamType = {
  page: 1,
  limit: null
}

export const getAllDestination = createAsyncThunk(
  'getAllDestination',
  async (destinationParams: DestinationParamType, { rejectWithValue }) => {
    try {
      const response = await ApiClient.get(`/destination`, {
        params: destinationParams || initialDestinationPageNumber
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