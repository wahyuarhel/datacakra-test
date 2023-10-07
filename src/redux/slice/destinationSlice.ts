import { createSlice } from "@reduxjs/toolkit";
import { DestinationResponseType } from "../../types/destinationType";
import { DestinationResponseStatus } from "../../enums/destinationEnum";
import { getAllDestination } from "../action/destinationAction";
import { ErrorType } from "../../types/types";


interface DestinationStateType {
  destinationResponseData: DestinationResponseType,
  destinationResponseStatus: string,
  errorResponse: ErrorType
}

const initialState: DestinationStateType = {
  destinationResponseData: {} as DestinationResponseType,
  destinationResponseStatus: DestinationResponseStatus.idle,
  errorResponse: {} as ErrorType
}
const DestinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDestination.pending, (state, action) => {
      console.log('getAllDestination.pending :', action)
      return {
        ...state,
        destinationResponseStatus: action.type
      }
    })
    builder.addCase(getAllDestination.fulfilled, (state, action) => {
      console.log('getAllDestination.fulfilled :', { action })
      return {
        ...state,
        destinationResponseStatus: action.type,
        destinationResponseData: action.payload
      }
    })
    builder.addCase(getAllDestination.rejected, (state, action) => {
      console.log('getAllDestination.rejected :', action)
      return {
        ...state,
        destinationResponseStatus: action.type
      }
    })
  },
})



export const destinationReducer = DestinationSlice.reducer