import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { LoginResponseStatus } from "../../enums/authEnum"
import { LoginResponseType } from "../../types/authType"
import { loginAction } from "../action/authAction"


interface AuthStateType {
  authResponseData: LoginResponseType
  authResponseStatus: string
  authorized: boolean
  authErrorMessage: string
}

const initialState: AuthStateType = {
  authResponseData: {} as LoginResponseType,
  authResponseStatus: LoginResponseStatus.idle,
  authorized: false,
  authErrorMessage: ''
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.authorized = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      return {
        ...state,
        authResponseStatus: action.type
      }
    })
    builder.addCase(loginAction.fulfilled, (state, action: PayloadAction<LoginResponseType>) => {
      console.log('loginAction.fulfilled :', action.payload)
      return {
        ...state,
        authResponseStatus: action.type,
        authResponseData: action.payload,
        authorized: action.payload.status,
      }
    })
    builder.addCase(loginAction.rejected, (state, action: PayloadAction<any>) => {
      console.log('loginAction.rejected :', action.payload)
      return {
        ...state,
        authResponseData: action.payload
      }
    })
  },
})

export const {
  setAuthorized
} = AuthSlice.actions

export const authReducer = AuthSlice.reducer
