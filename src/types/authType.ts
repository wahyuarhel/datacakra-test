
export type LoginResponseType = {
  data?: LoginDataType
  status: boolean,
  message: string,
  errors?: AuthErrorType
}
export type LoginRequestType = {
  email: string,
  password: string
}
export type RegisterRequestType = {
  name: string
  email: string,
  password: string
  password_confirmation: string
}

type LoginUserDetailType = {
  id: number,
  name: string,
  email: string,
  email_verified_at: Date | null,
  created_at: Date,
  updated_at: Date
}

type LoginDataType = {
  user: LoginUserDetailType
  token: string
}

type AuthErrorType = {
  email: string[]
  password: string[]
}

export type RegisterResponseType = {
  status: boolean;
  message: string;
  data: RegisterDataType;
}

export type RegisterDataType = {
  user: RegisterUserType;
  token: string;
}

export type RegisterUserType = {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
}
