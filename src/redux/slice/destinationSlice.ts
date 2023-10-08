import { createSlice } from "@reduxjs/toolkit";
import { DestinationDetailResponseType, DestinationResponseType } from "../../types/destinationType";
import { DestinationResponseStatus } from "../../enums/destinationEnum";
import { getAllDestination, getDestinationDetailById } from "../action/destinationAction";
import { ErrorType } from "../../types/types";


interface DestinationStateType {
  destinationResponseData: DestinationResponseType,
  destinationResponseStatus: string,
  errorResponse: ErrorType,
  destinationDetailResponseData: DestinationDetailResponseType,
  destinationDetailResponseStatus: string
}

const initialState: DestinationStateType = {
  destinationResponseData: {} as DestinationResponseType,
  destinationResponseStatus: DestinationResponseStatus.idle,
  errorResponse: {} as ErrorType,
  destinationDetailResponseData: {} as DestinationDetailResponseType,
  destinationDetailResponseStatus: DestinationResponseStatus.idle
}
const DestinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDestination.pending, (state, action) => {
      return {
        ...state,
        destinationResponseStatus: action.type
      }
    })
    builder.addCase(getAllDestination.fulfilled, (state, action) => {
      return {
        ...state,
        destinationResponseStatus: action.type,
        destinationResponseData: action.payload
      }
    })
    builder.addCase(getAllDestination.rejected, (state, action) => {
      return {
        ...state,
        destinationResponseStatus: action.type
      }
    })
    builder.addCase(getDestinationDetailById.pending, (state, action) => {
      return {
        ...state,
        destinationDetailResponseStatus: action.type
      }
    })
    builder.addCase(getDestinationDetailById.fulfilled, (state, action) => {
      return {
        ...state,
        destinationDetailResponseStatus: action.type,
        destinationDetailResponseData: action.payload
      }
    })
    builder.addCase(getDestinationDetailById.rejected, (state, action) => {
      return {
        ...state,
        destinationDetailResponseStatus: action.type
      }
    })
  },
})



export const destinationReducer = DestinationSlice.reducer