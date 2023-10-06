
export interface LoginResponseType {
  data?: LoginDataType
  status: boolean,
  message: string,
  errors?: AuthErrorType
}
export interface LoginRequestType {
  email: string,
  password: string
}

interface LoginUserDetailType {
  id: number,
  name: string,
  email: string,
  email_verified_at: Date | null,
  created_at: Date,
  updated_at: Date
}

interface LoginDataType {
  user: LoginUserDetailType
  token: string
}

interface AuthErrorType {
  email: string[]
  password: string[]
}