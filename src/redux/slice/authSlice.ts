import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginResponseStatus } from "../../enums/authEnum"
import { LoginResponseType } from "../../types/authType"
import { loginAction } from "../action/authAction"


interface AuthState {
  authResponse: LoginResponseType
  authResponseStatus: string
  authorized: boolean
}

const initialState: AuthState = {
  authResponse: {} as LoginResponseType,
  authResponseStatus: LoginResponseStatus.idle,
  authorized: false
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      console.log('loginAction.pending:', action.type)
      return {
        ...state,
        authResponseStatus: action.type
      }
    })
    builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<LoginResponseType>) => {
      console.log('loginAction.fulfilled:', action.type)
      return {
        ...state,
        authResponseStatus: action.type,
        authResponse: action.payload,
        authorized: action.payload.status,
      }
    })
    builder.addCase(loginAction.rejected, (state, action: PayloadAction<any>) => {
      console.log('loginAction.rejected:', action.type)
      return {
        ...state,
        authResponseStatus: action.payload
      }
    })
  },
})

export const {
  //
} = AuthSlice.actions

export const authReducer = AuthSlice.reducer
