import { createSlice } from "@reduxjs/toolkit";
import { DestinationResponseType } from "../../types/destinationType";
import { DestinationResponseStatus } from "../../enums/destinationEnum";
import { getAllDestination } from "../action/destinationAction";


interface DestinationStateType {
  destinationResponseData: DestinationResponseType,
  destinationResponseStatus: string,
}

const initialState: DestinationStateType = {
  destinationResponseData: {} as DestinationResponseType,
  destinationResponseStatus: DestinationResponseStatus.idle
}
const DestinationSlice = createSlice({
  name: 'destination',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDestination.pending, (state, action) => {
      state.destinationResponseStatus = action.type;
    })
    builder.addCase(getAllDestination.fulfilled, (state, action) => {
      console.log('getAllDestination.fulfilled :', action.payload)
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
  },
})



export const destinationReducer = DestinationSlice.reducer