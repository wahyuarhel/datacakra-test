import { createSlice } from "@reduxjs/toolkit"
import { LoginResponseStatus, RegisterResponseStatus } from "../../enums/authEnum"
import { LoginResponseType, RegisterResponseType } from "../../types/authType"
import { loginAction, registerAction } from "../action/authAction"


interface AuthStateType {
  authResponseData: LoginResponseType
  authResponseStatus: string
  authorized: boolean
  authErrorMessage: string,
  registerResponseData: RegisterResponseType
  registerResponseStatus: string,
}

const initialState: AuthStateType = {
  authResponseData: {} as LoginResponseType,
  authResponseStatus: LoginResponseStatus.idle,
  authorized: false,
  authErrorMessage: '',
  registerResponseData: {} as RegisterResponseType,
  registerResponseStatus: RegisterResponseStatus.idle,
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.authorized = action.payload
    },

  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state, action) => {
      return {
        ...state,
        authResponseStatus: action.type
      }
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      return {
        ...state,
        authResponseStatus: action.type,
        authResponseData: action.payload,
        authorized: action.payload.status,
      }
    })
    builder.addCase(loginAction.rejected, (state, action) => {
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
      return {
        ...state,
        registerResponseStatus: action.type,
        registerResponseData: action.payload,
      }
    })
    builder.addCase(registerAction.rejected, (state, action) => {
      return {
        ...state,
        registerResponseStatus: action.type,
      }
    })

  },
})

export const {
  setAuthorized,
} = AuthSlice.actions

export const authReducer = AuthSlice.reducer
