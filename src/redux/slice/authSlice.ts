import { createSlice } from "@reduxjs/toolkit"
import { LoginResponseStatus, RegisterResponseStatus } from "../../enums/authEnum"
import { ErrorAuthType, LoginResponseType, RegisterResponseType } from "../../types/authType"
import { loginAction, registerAction } from "../action/authAction"


interface AuthStateType {
  authResponseData: LoginResponseType
  authResponseStatus: string
  authorized: boolean
  authErrorMessage: string,
  registerResponseData: RegisterResponseType
  registerResponseStatus: string
  errorAuthResponse: ErrorAuthType
}

const initialState: AuthStateType = {
  authResponseData: {} as LoginResponseType,
  authResponseStatus: LoginResponseStatus.idle,
  authorized: false,
  authErrorMessage: '',
  registerResponseData: {} as RegisterResponseType,
  registerResponseStatus: RegisterResponseStatus.idle,
  errorAuthResponse: {} as ErrorAuthType
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.authorized = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorAuthResponse = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      console.log('loginAction.pending :', action)
      return {
        ...state,
        authResponseStatus: action.type
      }
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      console.log('loginAction.fulfilled :', action.payload)
      return {
        ...state,
        authResponseStatus: action.type,
        authResponseData: action.payload,
        authorized: action.payload.status,
      }
    })
    builder.addCase(loginAction.rejected, (state, action) => {
      console.log('loginAction.rejected :', action.payload)
      const error = {
        statusError: action.type,
        message: action.payload
      }
      return {
        ...state,
        authResponseStatus: action.type,
        error
      }
    })


    builder.addCase(registerAction.pending, (state, action) => {
      return {
        ...state,
        registerResponseStatus: action.type
      }
    })
    builder.addCase(registerAction.fulfilled, (state, action) => {
      console.log('registerAction.fulfilled :', action.payload)
      return {
        ...state,
        registerResponseStatus: action.type,
        registerResponseData: action.payload,
      }
    })
    builder.addCase(registerAction.rejected, (state, action) => {
      console.log('registerAction.rejected :', action.payload)
      const error = {
        statusError: action.type,
        message: action.payload
      }
      return {
        ...state,
        registerResponseStatus: action.type,
        error
      }
    })

  },
})

export const {
  setAuthorized,
  setErrorMessage,
} = AuthSlice.actions

export const authReducer = AuthSlice.reducer
